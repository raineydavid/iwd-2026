"""
SupportHers — FastAPI backend.
Women's Wellness AI using the Orchestrator-Workers pattern.
"""

from __future__ import annotations

import os
from dataclasses import asdict
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from orchestrator import WellnessOrchestrator
from util import DEFAULT_MODELS, PROVIDER_DISPLAY, Provider, get_available_providers
from wellness import LIFE_STAGES, ORCHESTRATOR_PROMPT, WORKER_PROMPT, get_stage

load_dotenv()

app = FastAPI(title="SupportHers", description="Women's Wellness AI Advisor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

STATIC_DIR = Path(__file__).parent / "static"
if STATIC_DIR.exists():
    app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")


# ── Models ───────────────────────────────────────────────────────────────────


class WellnessRequest(BaseModel):
    question: str
    life_stage: str
    orchestrator_provider: str = "anthropic"
    worker_provider: str = "anthropic"
    orchestrator_model: str | None = None
    worker_model: str | None = None


class ProviderInfo(BaseModel):
    key: str
    label: str
    default_model: str


# ── Routes ───────────────────────────────────────────────────────────────────


@app.get("/", response_class=HTMLResponse)
async def index():
    html_path = Path(__file__).parent / "static" / "index.html"
    return HTMLResponse(content=html_path.read_text())


@app.get("/api/life-stages")
async def life_stages():
    return [asdict(s) for s in LIFE_STAGES]


@app.get("/api/providers")
async def providers():
    available = get_available_providers()
    return [
        ProviderInfo(
            key=p.value,
            label=PROVIDER_DISPLAY[p],
            default_model=DEFAULT_MODELS[p],
        ).model_dump()
        for p in available
    ]


@app.post("/api/consult")
async def consult(req: WellnessRequest):
    stage = get_stage(req.life_stage)
    if not stage:
        return {"error": f"Unknown life stage: {req.life_stage}"}

    orch_provider = Provider(req.orchestrator_provider)
    work_provider = Provider(req.worker_provider)

    orchestrator = WellnessOrchestrator(
        orchestrator_prompt=ORCHESTRATOR_PROMPT,
        worker_prompt=WORKER_PROMPT,
        orchestrator_provider=orch_provider,
        worker_provider=work_provider,
        orchestrator_model=req.orchestrator_model or None,
        worker_model=req.worker_model or None,
    )

    results = orchestrator.process(
        task=req.question,
        context={
            "life_stage": stage.label,
            "age_range": stage.age_range,
        },
    )

    return {
        "analysis": results["analysis"],
        "worker_results": results["worker_results"],
        "life_stage": stage.label,
    }
