"""
Women's Wellness domain definitions — life stages, topics, and prompt templates.
"""

from __future__ import annotations

from dataclasses import dataclass


# ── Life stages ──────────────────────────────────────────────────────────────

@dataclass
class LifeStage:
    key: str
    label: str
    icon: str
    age_range: str
    description: str
    example_topics: list[str]


LIFE_STAGES: list[LifeStage] = [
    LifeStage(
        key="adolescent",
        label="Adolescence",
        icon="\U0001F338",  # cherry blossom
        age_range="12 – 18",
        description="Puberty, first periods, body image, emotional well-being, and building healthy habits early.",
        example_topics=[
            "Understanding my menstrual cycle",
            "Dealing with body image pressure on social media",
            "Nutrition for growing bodies",
            "Managing school stress and sleep",
            "Building healthy exercise habits",
        ],
    ),
    LifeStage(
        key="young_adult",
        label="Young Adult",
        icon="\U0001F33B",  # sunflower
        age_range="18 – 30",
        description="Reproductive health, fitness, mental health, career stress, and early preventive care.",
        example_topics=[
            "Balancing fitness with a busy schedule",
            "Reproductive health and contraception options",
            "Mental health strategies for career stress",
            "Nutrition for energy and focus",
            "Preventive screenings I should know about",
        ],
    ),
    LifeStage(
        key="motherhood",
        label="Motherhood & Fertility",
        icon="\U0001F33C",  # blossom
        age_range="25 – 45",
        description="Fertility, pregnancy, postpartum recovery, breastfeeding, and balancing self-care with caregiving.",
        example_topics=[
            "Preparing my body for pregnancy",
            "Managing anxiety during pregnancy",
            "Postpartum recovery and self-care",
            "Returning to exercise after birth",
            "Balancing work, motherhood, and personal health",
        ],
    ),
    LifeStage(
        key="midlife",
        label="Midlife & Perimenopause",
        icon="\U0001F341",  # maple leaf
        age_range="40 – 55",
        description="Hormonal changes, perimenopause symptoms, bone health, cardiovascular fitness, and emotional transitions.",
        example_topics=[
            "Understanding perimenopause symptoms",
            "Strength training for bone density",
            "Heart health awareness for women",
            "Sleep disruption and hormonal changes",
            "Navigating emotional shifts in midlife",
        ],
    ),
    LifeStage(
        key="menopause",
        label="Menopause & Beyond",
        icon="\U0001F343",  # leaf
        age_range="55+",
        description="Post-menopause wellness, healthy ageing, chronic disease prevention, vitality, and purpose.",
        example_topics=[
            "Staying active and strong after 55",
            "Nutrition for healthy ageing",
            "Managing menopause symptoms naturally",
            "Cognitive health and brain fitness",
            "Finding renewed purpose and community",
        ],
    ),
]


def get_stage(key: str) -> LifeStage | None:
    return next((s for s in LIFE_STAGES if s.key == key), None)


# ── Prompt templates ─────────────────────────────────────────────────────────

ORCHESTRATOR_PROMPT = """\
You are a compassionate women's wellness advisor. A woman in the \
**{life_stage}** stage of life ({age_range}) has asked:

\"\"\"{task}\"\"\"

Analyse this question and identify 2–4 distinct specialist perspectives \
that would be most valuable for her. Consider medical, psychological, \
nutritional, fitness, and lifestyle angles as appropriate.

Return your response in EXACTLY this format:

<analysis>
A warm, empathetic overview of the question. Explain which perspectives \
you chose and why they matter for someone at this life stage.
</analysis>

<tasks>
    <task>
    <type>specialist-type-here</type>
    <description>Clear instructions for the specialist on what to cover</description>
    </task>
</tasks>
"""

WORKER_PROMPT = """\
You are a **{task_type}** specialist providing wellness guidance \
for a woman in the **{life_stage}** stage of life ({age_range}).

She asked: \"\"\"{original_task}\"\"\"

Your brief: {task_description}

Provide thoughtful, evidence-informed guidance. Be warm, specific, and \
actionable. Where appropriate, note when professional consultation is \
recommended.

<response>
Your specialist guidance here.
</response>
"""
