# Claude Code Marketplace Configuration

This directory contains the marketplace configuration for the Awesome Econ AI Skills collection.

## What This Does

The `marketplace.json` file enables this repository to work as a Claude Code marketplace, allowing users to:

1. Install all skills at once using `claude marketplace add`
2. Enable/disable individual skills in their settings
3. Use skills with the `/skill-name` command syntax

## Installation

Users can add this marketplace to their Claude Code setup:

```bash
# Add the marketplace
claude marketplace add https://github.com/meleantonio/awesome-econ-ai-stuff

# Skills will be available as:
# /research-ideation
# /lit-review-assistant
# /r-econometrics
# /latex-tables
# etc.
```

## Skills Included

### Research Workflow Stages

**Ideation:**
- `research-ideation` - Generate research questions from economic phenomena

**Literature Review:**
- `lit-review-assistant` - Search, summarize, and synthesize economics literature

**Theory & Modeling:**
- `latex-econ-model` - Write and typeset economic models in LaTeX

**Data Management:**
- `api-data-fetcher` - Fetch data from FRED, World Bank, and other APIs
- `stata-data-cleaning` - Clean and transform data in Stata

**Econometric Analysis:**
- `r-econometrics` - Run IV, DiD, and RDD analyses in R
- `python-panel-data` - Panel data analysis with Python
- `stata-regression` - Regression analysis in Stata

**Academic Writing:**
- `academic-paper-writer` - Draft papers with proper structure
- `latex-tables` - Generate publication-ready LaTeX tables

**Communication:**
- `beamer-presentation` - Create Beamer slides
- `econ-visualization` - Publication-quality charts

## File Structure

```
.claude-plugin/
├── marketplace.json    # Marketplace configuration
└── README.md          # This file

_skills/
├── ideation/
├── literature/
├── theory/
├── data/
├── analysis/
├── writing/
└── communication/
```

## Version

Current version: 1.0.0

## Compatibility

All skills are compatible with:
- Claude Code
- Cursor
- Codex
- Gemini CLI

## Contributing

To add new skills or update existing ones, see the main repository's CONTRIBUTING.md.
