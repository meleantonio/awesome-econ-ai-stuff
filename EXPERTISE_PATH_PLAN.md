# Expertise Path Redesign — Plan

## Problem

The current homepage treats all visitors identically regardless of their familiarity with AI tools. A tenured professor who has never used an AI assistant and a PhD student who builds with Cursor daily face the same wall of skill cards, the same quick-start instructions, and the same jargon. The result: beginners bounce because nothing is explained, and power users ignore guidance aimed at novices.

## Proposed Solution

Replace the one-size-fits-all homepage with a **three-path experience**. Users self-select their AI expertise level at the start of their visit. The page immediately reorganises its content, language, and calls-to-action to match that level. The choice persists across visits via `localStorage` and can be changed at any time.

---

## Three Paths

### Path 1 — First Steps (Beginner)
> "I'm curious about AI tools for my research."

**Who this is for:**  
Economists who have heard about AI assistants (ChatGPT, Claude) but have never used one for structured research tasks. They don't know what an "AI skill" or "SKILL.md" is.

**What they need:**
- Plain-language explanation of what AI skills are and why they matter
- Proof that this works without requiring a technical setup
- A single recommended starting point (not a catalogue of 17 options)
- Link to the Learn guide

**Experience on the page:**
- Introductory explanation panel appears below the path selector
- Skill grid highlights only: Ideation, Literature, Writing, Communication skills
- Engineering, Data, Analysis, Theory skills are visible but subdued
- Quick Start shows a simplified "try it right now" flow using Claude.ai (no install)
- Nav gains a small green "First Steps" indicator

**Recommended first skill:** `research-ideation`

---

### Path 2 — Level Up (Intermediate)
> "I use ChatGPT or Claude for writing — I want more structure."

**Who this is for:**  
Researchers who regularly use AI chat tools but work ad-hoc (copy-pasting prompts manually). They want repeatable, structured workflows for Stata, R, LaTeX, and data work.

**What they need:**
- Workflow-stage navigation (idea → data → analysis → writing → presentation)
- Recommended tools: Claude Code or Cursor
- 3-5 high-value skills covering their typical research pipeline

**Experience on the page:**
- Workflow explanation panel appears
- Skill grid highlights: Ideation, Literature, Theory, Data, Analysis, Writing, Communication
- Engineering skills subdued (too technical for this path)
- Quick Start shows standard 3-step install + use flow
- Nav gains a blue "Level Up" indicator

**Recommended skills:** `r-econometrics`, `stata-data-cleaning`, `academic-paper-writer`, `lit-review-assistant`

---

### Path 3 — Power Mode (Advanced)
> "I build with AI agents, Cursor, or Claude Code."

**Who this is for:**  
Researchers and economist-developers who already use agentic AI tools (Cursor, Claude Code, Gemini CLI). They understand SKILL.md, AGENTS.md, and agentic workflows.

**What they need:**
- Full catalogue access with no filtering
- Engineering skills prominently featured
- Download-all-skills action front-and-center
- Link to contribute

**Experience on the page:**
- Power-user panel appears with download-all and contribute CTAs
- All 17 skills visible, Engineering skills highlighted with a "Power" badge
- Quick Start shows the SDD (Spec-Driven Development) workflow
- Nav gains a purple "Power Mode" indicator

**Recommended skills:** `sdd`, `techdebt`, `commit-push-pr`, `code-simplifier`, `python-panel-data`

---

## Information Architecture

```
Homepage (index.html)
│
├─ Hero  (unchanged)
│
├─ [NEW] Choose Your Path  ← self-selection widget
│   ├─ First Steps card
│   ├─ Level Up card (featured / "most popular")
│   └─ Power Mode card
│
├─ [NEW] Path Guidance Panel  ← toggles content per path
│   ├─ Beginner Panel: "What is an AI skill?" + first skill CTA
│   ├─ Intermediate Panel: Research workflow map + top 4 skills
│   └─ Advanced Panel: Download All + Contribute + SDD link
│
├─ Skills Catalog  (modified)
│   ├─ Filter tabs (existing)
│   └─ [NEW] "Recommended for you" filter tab (auto-activates on path select)
│       └─ Skill cards tagged with data-level (beginner/intermediate/advanced)
│
├─ Quick Start  (modified — shows path-specific steps)
│
├─ Compatible Tools  (unchanged)
│
└─ CTA Section  (modified — path-aware CTAs)
```

---

## Skill Level Taxonomy

Skills are tagged by the minimum AI familiarity required to use them:

| Level        | Categories                                      | Rationale                                                        |
|:-------------|:------------------------------------------------|:-----------------------------------------------------------------|
| `beginner`   | ideation, literature, writing, communication    | Conceptual tasks, natural-language output, no code required      |
| `intermediate` | theory, data, analysis                        | Requires Stata / R / Python knowledge, but not agent tooling     |
| `advanced`   | engineering                                     | Requires understanding of agentic workflows, git, CLI tools      |

Path visibility rules:
- **First Steps** → highlights `beginner` skills; `intermediate`/`advanced` remain accessible but subdued
- **Level Up** → highlights `beginner` + `intermediate` skills; `advanced` subdued
- **Power Mode** → all skills at full visibility; `advanced` given a "Power" badge

---

## Technical Implementation

### Files Changed

| File | Change |
|:-----|:-------|
| `index.html` | Add path selector section, guidance panels, `data-level` on skill cards, path-specific quick start blocks |
| `assets/css/style.css` | Add path card styles, recommendation badge, dimmed/highlighted skill states, guidance panel transitions |
| `assets/js/main.js` | Add path selection logic, `localStorage` persistence, skill filtering, nav indicator |

### No New Files Required

All changes are additive within the existing three files. The Jekyll build pipeline, `_config.yml`, and skill frontmatter are untouched.

### State Management

```javascript
// localStorage key
const PATH_KEY = 'econ_ai_expertise_path';  // values: 'beginner' | 'intermediate' | 'advanced'

// On page load: read stored path, apply immediately (no flash)
// On path card click: store + apply
// "Reset" link in nav restores default (no path stored)
```

### Skill Filtering

Skill cards already carry `data-category` attributes. We layer in `data-level` via Liquid:

```liquid
{% case category %}
  {% when 'ideation', 'literature', 'writing', 'communication' %}
    {% assign skill_level = "beginner" %}
  {% when 'theory', 'data', 'analysis' %}
    {% assign skill_level = "intermediate" %}
  {% when 'engineering' %}
    {% assign skill_level = "advanced" %}
{% endcase %}
<article class="skill-card" data-category="{{ category }}" data-level="{{ skill_level }}">
```

JavaScript then applies `.skill-recommended`, `.skill-available`, or `.skill-advanced` CSS classes when a path is active.

---

## Visual Design

### Path Cards
Three horizontally-arranged cards with a soft glow accent matching the path level:

| Path         | Accent colour | Icon |
|:-------------|:-------------|:-----|
| First Steps  | `#22c55e` (green) | 🌱 |
| Level Up     | `#3b82f6` (blue) | 🚀 |
| Power Mode   | `#7c3aed` (purple, matches existing brand) | ⚡ |

The active card gets a coloured border, subtle glow, and a checkmark badge.

### Skill Card States
- **Recommended** (`.skill-recommended`): full opacity, coloured left border, small "✓ Recommended" badge
- **Available** (`.skill-available`): full opacity (no change — discoverable but not pushed)
- **Dimmed** (`.skill-dimmed`): `opacity: 0.55`, no hover effects — still readable, just de-emphasised

### Nav Indicator
A small pill badge beside the logo: `● First Steps`, `● Level Up`, or `● Power Mode` with the path's accent colour. Clicking it scrolls to the path selector.

---

## Success Criteria

1. A first-time visitor can self-select their path in under 5 seconds.
2. After path selection, the skills visible in the "Recommended" filter are all appropriate for that level.
3. Path preference persists across page reloads.
4. Switching paths is one click from anywhere on the homepage.
5. All 17 skills remain reachable regardless of chosen path (no content hidden permanently).
6. No changes to Jekyll build pipeline, skill frontmatter, or existing URLs.
