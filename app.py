"""
SupportHers — Women's Wellness AI Advisor
A beautiful Streamlit app using the Orchestrator-Workers pattern
with interchangeable LLM providers.
"""

import streamlit as st

from orchestrator import WellnessOrchestrator
from util import (
    DEFAULT_MODELS,
    PROVIDER_DISPLAY,
    Provider,
    get_available_providers,
)
from wellness import LIFE_STAGES, ORCHESTRATOR_PROMPT, WORKER_PROMPT, get_stage

# ── Page config ──────────────────────────────────────────────────────────────

st.set_page_config(
    page_title="SupportHers \u2014 Women\u2019s Wellness AI",
    page_icon="\U0001F338",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ── Custom CSS ───────────────────────────────────────────────────────────────

st.markdown(
    """
<style>
    /* Global font & background */
    .stApp {
        background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 30%, #f5f3ff 70%, #ede9fe 100%);
    }

    /* Header */
    .hero-title {
        font-size: 2.6rem;
        font-weight: 800;
        background: linear-gradient(135deg, #ec4899, #8b5cf6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
        margin-bottom: 0;
    }
    .hero-subtitle {
        text-align: center;
        color: #6b7280;
        font-size: 1.1rem;
        margin-top: 0;
        margin-bottom: 1.5rem;
    }

    /* Life-stage cards */
    .stage-card {
        background: white;
        border-radius: 16px;
        padding: 1.2rem;
        box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        border: 2px solid transparent;
        transition: all 0.2s;
        cursor: pointer;
        height: 100%;
    }
    .stage-card:hover {
        border-color: #ec4899;
        box-shadow: 0 4px 20px rgba(236,72,153,0.15);
        transform: translateY(-2px);
    }
    .stage-card .icon { font-size: 2rem; }
    .stage-card .label {
        font-weight: 700;
        font-size: 1.05rem;
        color: #1f2937;
        margin: 0.4rem 0 0.2rem;
    }
    .stage-card .age {
        font-size: 0.85rem;
        color: #9ca3af;
    }
    .stage-card .desc {
        font-size: 0.88rem;
        color: #6b7280;
        margin-top: 0.4rem;
        line-height: 1.5;
    }

    /* Result cards */
    .specialist-card {
        background: white;
        border-radius: 16px;
        padding: 1.5rem;
        margin-bottom: 1rem;
        box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        border-left: 4px solid #ec4899;
    }
    .specialist-card h4 {
        color: #7c3aed;
        margin: 0 0 0.8rem;
    }

    /* Analysis card */
    .analysis-card {
        background: linear-gradient(135deg, #fdf4ff, #f5f3ff);
        border-radius: 16px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        border: 1px solid #e9d5ff;
    }
    .analysis-card h3 {
        color: #7c3aed;
        margin-top: 0;
    }

    /* Sidebar */
    section[data-testid="stSidebar"] {
        background: linear-gradient(180deg, #fdf2f8 0%, #f5f3ff 100%);
    }

    /* Buttons */
    .stButton > button {
        background: linear-gradient(135deg, #ec4899, #8b5cf6);
        color: white;
        border: none;
        border-radius: 12px;
        padding: 0.6rem 2rem;
        font-weight: 600;
        font-size: 1rem;
    }
    .stButton > button:hover {
        background: linear-gradient(135deg, #db2777, #7c3aed);
        color: white;
    }
</style>
""",
    unsafe_allow_html=True,
)

# ── Header ───────────────────────────────────────────────────────────────────

st.markdown('<p class="hero-title">\U0001F338 SupportHers</p>', unsafe_allow_html=True)
st.markdown(
    '<p class="hero-subtitle">AI-powered wellness guidance for every stage of a woman\'s life</p>',
    unsafe_allow_html=True,
)

# ── Sidebar — model configuration ───────────────────────────────────────────

with st.sidebar:
    st.markdown("### \u2699\ufe0f Model Configuration")
    available = get_available_providers()

    if not available:
        st.error(
            "No API keys found. Copy `.env.example` to `.env` and add at least one key."
        )
        st.stop()

    provider_labels = {PROVIDER_DISPLAY[p]: p for p in available}

    st.markdown("**Orchestrator** (analyses your question)")
    orch_label = st.selectbox(
        "Orchestrator provider",
        options=list(provider_labels.keys()),
        index=0,
        label_visibility="collapsed",
    )
    orch_provider = provider_labels[orch_label]
    orch_model = st.text_input(
        "Orchestrator model",
        value=DEFAULT_MODELS[orch_provider],
        help="Override the default model name if desired.",
    )

    st.markdown("**Workers** (specialist perspectives)")
    worker_label = st.selectbox(
        "Worker provider",
        options=list(provider_labels.keys()),
        index=0,
        label_visibility="collapsed",
    )
    worker_provider = provider_labels[worker_label]
    worker_model = st.text_input(
        "Worker model",
        value=DEFAULT_MODELS[worker_provider],
        help="Override the default model name if desired.",
    )

    st.divider()
    st.markdown(
        "**Tip:** You can mix providers — e.g. use Claude as the "
        "orchestrator and a local model for workers to save cost."
    )

# ── Life-stage selector ─────────────────────────────────────────────────────

st.markdown("### Choose your life stage")

cols = st.columns(len(LIFE_STAGES))
for col, stage in zip(cols, LIFE_STAGES):
    with col:
        selected = st.button(
            f"{stage.icon}\n**{stage.label}**\n_{stage.age_range}_",
            key=f"stage_{stage.key}",
            use_container_width=True,
        )
        if selected:
            st.session_state["selected_stage"] = stage.key

# Show details of selected stage
selected_key = st.session_state.get("selected_stage")
if selected_key:
    stage = get_stage(selected_key)
    if stage:
        st.markdown(
            f"""<div class="stage-card" style="max-width:700px;margin:1rem auto;">
            <span class="icon">{stage.icon}</span>
            <span class="label">{stage.label}</span>
            <span class="age">({stage.age_range})</span>
            <p class="desc">{stage.description}</p>
            </div>""",
            unsafe_allow_html=True,
        )

        # Example topics
        st.markdown("**Example topics to explore:**")
        topic_cols = st.columns(min(len(stage.example_topics), 3))
        for i, topic in enumerate(stage.example_topics):
            with topic_cols[i % len(topic_cols)]:
                if st.button(topic, key=f"topic_{stage.key}_{i}", use_container_width=True):
                    st.session_state["user_question"] = topic

# ── Question input ───────────────────────────────────────────────────────────

st.markdown("---")

question = st.text_area(
    "Ask your wellness question",
    value=st.session_state.get("user_question", ""),
    placeholder="e.g. How can I manage stress while balancing work and family?",
    height=100,
)

run_disabled = not selected_key or not question.strip()
run = st.button(
    "\U0001F52E  Get Wellness Insights",
    disabled=run_disabled,
    use_container_width=True,
)

if run_disabled and not selected_key:
    st.info("Select a life stage above to get started.")

# ── Run orchestrator ─────────────────────────────────────────────────────────

if run and not run_disabled:
    stage = get_stage(selected_key)
    status_box = st.status("Consulting wellness specialists...", expanded=True)

    def update_status(msg: str):
        status_box.update(label=msg)
        st.write(msg)

    orchestrator = WellnessOrchestrator(
        orchestrator_prompt=ORCHESTRATOR_PROMPT,
        worker_prompt=WORKER_PROMPT,
        orchestrator_provider=orch_provider,
        worker_provider=worker_provider,
        orchestrator_model=orch_model or None,
        worker_model=worker_model or None,
    )

    results = orchestrator.process(
        task=question.strip(),
        context={
            "life_stage": stage.label,
            "age_range": stage.age_range,
        },
        on_status=update_status,
    )

    status_box.update(label="Done!", state="complete")

    # ── Display results ──────────────────────────────────────────────────

    if results.get("analysis"):
        st.markdown(
            f"""<div class="analysis-card">
            <h3>\U0001F9E0 Overview</h3>
            <p>{results['analysis']}</p>
            </div>""",
            unsafe_allow_html=True,
        )

    for i, wr in enumerate(results.get("worker_results", []), 1):
        st.markdown(
            f"""<div class="specialist-card">
            <h4>{i}. {wr['type'].replace('-', ' ').title()}</h4>
            {wr['result']}
            </div>""",
            unsafe_allow_html=True,
        )

    st.markdown("---")
    st.caption(
        "This is AI-generated wellness information, not medical advice. "
        "Always consult a qualified healthcare professional for personal health decisions."
    )

# ── Footer ───────────────────────────────────────────────────────────────────

st.markdown("---")
st.markdown(
    '<p style="text-align:center;color:#9ca3af;font-size:0.9rem;">'
    "Made with \u2764\ufe0f for International Women\u2019s Day 2026 "
    "\u2014 SupportHers: because every woman deserves personalised wellness guidance."
    "</p>",
    unsafe_allow_html=True,
)
