# Contributing to Awesome Econ AI Stuff

Thank you for your interest in contributing! This guide explains how to submit new skills and improve existing ones.

## 📋 Table of Contents

- [Submitting a New Skill](#submitting-a-new-skill)
- [Skill Requirements](#skill-requirements)
- [SKILL.md Format](#skillmd-format)
- [Testing Your Skill](#testing-your-skill)
- [Code of Conduct](#code-of-conduct)

---

## Submitting a New Skill

### Option 1: Web Form (Easiest)

Use our **[Skill Submission Form](https://meleantonio.github.io/awesome-econ-ai-stuff/submit)** which automatically creates a pull request.

### Option 2: GitHub Issue

Open a [Skill Proposal Issue](https://github.com/meleantonio/awesome-econ-ai-stuff/issues/new?template=skill-proposal.md) with your skill details.

### Option 3: Direct Pull Request

1. Fork this repository
2. Create a new branch: `git checkout -b skill/your-skill-name`
3. Add your skill in `skills/<workflow-stage>/your-skill-name/SKILL.md`
4. Update `README.md` to include your skill in the catalog
5. Submit a pull request

---

## Skill Requirements

Your skill should:

- ✅ **Solve a real problem** economists face in their workflow
- ✅ **Be specific and focused** (one skill = one task)
- ✅ **Work with at least 2 AI tools** (Claude Code, Cursor, Codex, Gemini CLI)
- ✅ **Include clear instructions** the AI can follow
- ✅ **Have reproducible examples** when applicable

Skills should NOT:

- ❌ Duplicate existing skills without significant improvement
- ❌ Require proprietary/paid APIs without alternatives
- ❌ Include sensitive or personal data

---

## SKILL.md Format

Every skill must include a `SKILL.md` file with YAML frontmatter:

```yaml
---
name: your-skill-name
description: A one-line description (shown during skill discovery)
workflow_stage: analysis  # One of: ideation, literature, theory, data, analysis, writing, communication
compatibility:
  - claude-code
  - cursor
  - codex
  - gemini-cli
author: Your Name <your.email@example.com>
version: 1.0.0
tags:
  - econometrics
  - stata
  - regression
---

# Your Skill Name

## Purpose

Explain what this skill does and when to use it.

## Instructions

Step-by-step instructions for the AI agent:

1. First, do this...
2. Then, do that...
3. Finally, verify by...

## Examples

### Example 1: Basic Usage

```stata
// Example Stata code the skill might generate
regress y x1 x2 x3, robust
```

## Requirements

- Software: Stata 17+ / R 4.0+ / Python 3.10+
- Packages: list required packages

## References

- Link to relevant documentation
- Academic papers if applicable
```

---

## Skill Directory Structure

```
skills/
└── analysis/
    └── your-skill-name/
        ├── SKILL.md           # Required: Main skill file
        ├── examples/          # Optional: Example files
        │   └── sample_data.csv
        └── scripts/           # Optional: Helper scripts
            └── helper.py
```

---

## Testing Your Skill

Before submitting, test your skill with at least two AI tools:

### Claude Code
```bash
# Copy to skills directory
cp -r your-skill ~/.claude/skills/

# Start Claude Code and test
claude
> /your-skill-name [test prompt]
```

### Cursor
```bash
# Copy to skills directory
cp -r your-skill ~/.cursor/skills/

# Open Cursor and test via Composer
```

---

## Workflow Stages

Choose the most appropriate stage for your skill:

| Stage | Description | Examples |
|-------|-------------|----------|
| `ideation` | Research question development | Brainstorming, hypothesis generation |
| `literature` | Finding and synthesizing papers | Literature search, citation management |
| `theory` | Mathematical/economic modeling | LaTeX models, proofs, game theory |
| `data` | Data collection and cleaning | API fetching, data transformation |
| `analysis` | Econometric analysis | Regression, IV, panel data |
| `writing` | Academic paper writing | Drafting, tables, referee responses |
| `communication` | Presentations and visualization | Beamer, charts, websites |

---

## Code of Conduct

- Be respectful and constructive
- Focus on improving the economics/AI community
- Give credit where due
- Follow academic integrity standards

---

## Questions?

Open a [Discussion](https://github.com/meleantonio/awesome-econ-ai-stuff/discussions) or reach out to the maintainers.
