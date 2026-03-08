"""
Multi-provider LLM utility module.
Supports Anthropic, OpenAI, xAI (Grok), and local models (Ollama/LM Studio).
"""

import os
import re
from enum import Enum

from dotenv import load_dotenv

load_dotenv()


class Provider(str, Enum):
    ANTHROPIC = "anthropic"
    OPENAI = "openai"
    XAI = "xai"
    LOCAL = "local"


# Default models per provider
DEFAULT_MODELS = {
    Provider.ANTHROPIC: "claude-sonnet-4-6",
    Provider.OPENAI: "gpt-4o",
    Provider.XAI: "grok-3",
    Provider.LOCAL: os.getenv("LOCAL_MODEL_NAME", "llama3"),
}

# Display-friendly names
PROVIDER_DISPLAY = {
    Provider.ANTHROPIC: "Anthropic (Claude)",
    Provider.OPENAI: "OpenAI (GPT)",
    Provider.XAI: "xAI (Grok)",
    Provider.LOCAL: "Local Model",
}


def get_available_providers() -> list[Provider]:
    """Return providers that have valid API keys or endpoints configured."""
    available = []
    if os.getenv("ANTHROPIC_API_KEY"):
        available.append(Provider.ANTHROPIC)
    if os.getenv("OPENAI_API_KEY"):
        available.append(Provider.OPENAI)
    if os.getenv("XAI_API_KEY"):
        available.append(Provider.XAI)
    if os.getenv("LOCAL_MODEL_BASE_URL"):
        available.append(Provider.LOCAL)
    return available


def llm_call(
    prompt: str,
    system_prompt: str = "",
    provider: Provider = Provider.ANTHROPIC,
    model: str | None = None,
) -> str:
    """
    Send a prompt to the selected LLM provider and return the text response.

    Args:
        prompt: The user message / prompt.
        system_prompt: Optional system-level instructions.
        provider: Which LLM provider to use.
        model: Override the default model for the provider.

    Returns:
        The model's text response.
    """
    model = model or DEFAULT_MODELS[provider]

    if provider == Provider.ANTHROPIC:
        return _call_anthropic(prompt, system_prompt, model)
    elif provider == Provider.OPENAI:
        return _call_openai(prompt, system_prompt, model)
    elif provider == Provider.XAI:
        return _call_xai(prompt, system_prompt, model)
    elif provider == Provider.LOCAL:
        return _call_local(prompt, system_prompt, model)
    else:
        raise ValueError(f"Unknown provider: {provider}")


def _call_anthropic(prompt: str, system_prompt: str, model: str) -> str:
    import anthropic

    client = anthropic.Anthropic()
    kwargs: dict = {
        "model": model,
        "max_tokens": 4096,
        "messages": [{"role": "user", "content": prompt}],
    }
    if system_prompt:
        kwargs["system"] = system_prompt
    message = client.messages.create(**kwargs)
    return message.content[0].text


def _call_openai(prompt: str, system_prompt: str, model: str) -> str:
    from openai import OpenAI

    client = OpenAI()
    messages = []
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})
    messages.append({"role": "user", "content": prompt})
    response = client.chat.completions.create(model=model, messages=messages, max_tokens=4096)
    return response.choices[0].message.content


def _call_xai(prompt: str, system_prompt: str, model: str) -> str:
    from openai import OpenAI

    client = OpenAI(api_key=os.getenv("XAI_API_KEY"), base_url="https://api.x.ai/v1")
    messages = []
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})
    messages.append({"role": "user", "content": prompt})
    response = client.chat.completions.create(model=model, messages=messages, max_tokens=4096)
    return response.choices[0].message.content


def _call_local(prompt: str, system_prompt: str, model: str) -> str:
    from openai import OpenAI

    base_url = os.getenv("LOCAL_MODEL_BASE_URL", "http://localhost:11434/v1")
    client = OpenAI(api_key="not-needed", base_url=base_url)
    messages = []
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})
    messages.append({"role": "user", "content": prompt})
    response = client.chat.completions.create(model=model, messages=messages, max_tokens=4096)
    return response.choices[0].message.content


def extract_xml(text: str, tag: str) -> str:
    """Extract content between XML tags."""
    match = re.search(rf"<{tag}>(.*?)</{tag}>", text, re.DOTALL)
    return match.group(1).strip() if match else ""
