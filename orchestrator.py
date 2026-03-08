"""
Orchestrator-Workers engine with interchangeable model support.

The orchestrator analyzes a wellness query, determines the best specialist
perspectives to consult, then delegates to worker LLMs. Each phase can use
a different provider/model — e.g. Claude as orchestrator, Grok as workers.
"""

from __future__ import annotations

from util import Provider, extract_xml, llm_call


def parse_tasks(tasks_xml: str) -> list[dict]:
    """Parse XML tasks into a list of task dictionaries."""
    tasks = []
    current_task: dict = {}

    for line in tasks_xml.split("\n"):
        line = line.strip()
        if not line:
            continue
        if line.startswith("<task>"):
            current_task = {}
        elif line.startswith("<type>"):
            current_task["type"] = extract_xml(line, "type") or line[6:-7].strip()
        elif line.startswith("<description>"):
            current_task["description"] = extract_xml(line, "description") or line[13:-14].strip()
        elif line.startswith("</task>"):
            if "description" in current_task:
                current_task.setdefault("type", "general")
                tasks.append(current_task)

    return tasks


class WellnessOrchestrator:
    """
    Orchestrator-Workers engine specialised for women's wellness.

    Supports mixing providers — e.g. use Claude for orchestration and
    a local model for the worker tasks, or any other combination.
    """

    def __init__(
        self,
        orchestrator_prompt: str,
        worker_prompt: str,
        orchestrator_provider: Provider = Provider.ANTHROPIC,
        worker_provider: Provider = Provider.ANTHROPIC,
        orchestrator_model: str | None = None,
        worker_model: str | None = None,
    ):
        self.orchestrator_prompt = orchestrator_prompt
        self.worker_prompt = worker_prompt
        self.orchestrator_provider = orchestrator_provider
        self.worker_provider = worker_provider
        self.orchestrator_model = orchestrator_model
        self.worker_model = worker_model

    def _fmt(self, template: str, **kwargs) -> str:
        try:
            return template.format(**kwargs)
        except KeyError as e:
            raise ValueError(f"Missing prompt variable: {e}") from e

    def process(
        self,
        task: str,
        context: dict | None = None,
        on_status: callable | None = None,
    ) -> dict:
        """
        Run the full orchestrator → workers pipeline.

        Args:
            task: The wellness question / topic.
            context: Extra variables merged into prompts.
            on_status: Optional callback ``fn(message)`` for live progress.

        Returns:
            dict with ``analysis``, ``worker_results``.
        """
        context = context or {}
        _log = on_status or (lambda msg: None)

        # --- Phase 1: Orchestrator ---
        _log("Analysing your question and planning specialist consultations...")
        orchestrator_input = self._fmt(self.orchestrator_prompt, task=task, **context)
        orchestrator_response = llm_call(
            orchestrator_input,
            provider=self.orchestrator_provider,
            model=self.orchestrator_model,
        )

        analysis = extract_xml(orchestrator_response, "analysis")
        tasks_xml = extract_xml(orchestrator_response, "tasks")
        tasks = parse_tasks(tasks_xml)

        if not tasks:
            _log("The orchestrator did not identify sub-tasks. Returning raw analysis.")
            return {"analysis": analysis or orchestrator_response, "worker_results": []}

        _log(f"Identified {len(tasks)} specialist perspectives. Generating insights...")

        # --- Phase 2: Workers ---
        worker_results = []
        for i, task_info in enumerate(tasks, 1):
            _log(f"[{i}/{len(tasks)}] Consulting: {task_info['type']}...")

            worker_input = self._fmt(
                self.worker_prompt,
                original_task=task,
                task_type=task_info["type"],
                task_description=task_info["description"],
                **context,
            )

            worker_response = llm_call(
                worker_input,
                provider=self.worker_provider,
                model=self.worker_model,
            )
            content = extract_xml(worker_response, "response")

            if not content or not content.strip():
                content = f"[Worker '{task_info['type']}' did not return content]"

            worker_results.append(
                {
                    "type": task_info["type"],
                    "description": task_info["description"],
                    "result": content,
                }
            )

        _log("All perspectives gathered. Preparing your wellness insights.")

        return {
            "analysis": analysis,
            "worker_results": worker_results,
        }
