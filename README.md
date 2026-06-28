# UX_Auditor
# ✨ AI UX Auditor — Multi-Agent Enterprise Core Engine

AI UX Auditor is an autonomous, event-driven optimization dashboard that simulates digital user paths, computes UX/WCAG violations, and writes automated code patches to fix real-time layout and interface bottlenecks.

Instead of running slow and costly human testing groups or analyzing static spreadsheets, this platform deploys a highly coordinated workforce of specialized **AI Sub-Agents** to test websites dynamically in minutes.

---

## 🛠️ Tech Stack & Systems Architecture

The project utilizes a decoupled, zero-build, ultra-lightweight single-page architecture designed for real-time telemetry streaming.

* **Frontend Environment:** Vanilla HTML5, CSS3 (Custom Utilities & Design Tokens), Asynchronous Event-Driven JavaScript (Fetch API, DOM Repainting Lifecycle).
* **Backend Runtime:** Python 3.12+, FastAPI (ASGI Framework Core), Uvicorn HTTP Server, Asyncio Event Loops.
* **Data Layout State Layer:** Global `IN_MEMORY_STORAGE` state store maps asynchronous worker process states directly to frontend polling channels.

---

## 🔄 The Multi-Agent Execution Lifecycle

When an operator inputs a target web property, the backend spawns multiple specialized agents running in parallel:

1.  **Orchestrator Control Tower Core (`task_router.py`):** Acts as the project manager. It registers the target domain, creates a thread tracking ID, and determines downstream operational priorities based on user goals.
2.  **Persona Manager Agent (`persona_manager_agent.py`):** Builds diverse, context-specific synthetic user archetypes (e.g., *Elderly User* checking accessibility metrics, or a *First-Time Mobile Buyer* testing screen sizing limits).
3.  **Browser Navigation & Click Engine (`browser_navigation_agent.py`):** Runs an automated viewport exploration simulator, executing cursor clicks and element interaction traces directly on the target's DOM layout structure.
4.  **UX Intelligence Core Matrix (`friction_detection_agent.py` / `accessibility_agent.py`):** Analyzes the resulting interaction tracking data. It flags micro-hesitations, computes text contrast ratios, and isolates code blocks violating Nielsen Heuristics or WCAG guidelines.
5.  **Fix Generation Patch Agent (`fix_generation_agent.py`):** Evaluates discovered technical bottlenecks and instantly drafts production-ready HTML/CSS styling modifications.
6.  **Validation & Self-Correction Agent (`retest_agent.py`):** Re-injects the code patch into a sandbox window, repeats the interaction journey simulation, and measures the user conversion path optimization lift.

---
