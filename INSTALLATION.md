# Installation Guide

This guide explains how to install and use the Awesome Econ AI Skills collection with Claude Code.

## Quick Install

### Option 1: Install as Marketplace (Recommended)

```bash
claude marketplace add https://github.com/meleantonio/awesome-econ-ai-stuff
```

This will:
1. Clone the repository to `~/.claude/plugins/marketplaces/`
2. Make all skills available in Claude Code
3. Allow you to enable/disable individual skills

### Option 2: Manual Installation

```bash
# Clone the repository
cd ~/Workspace  # or your preferred location
git clone https://github.com/meleantonio/awesome-econ-ai-stuff.git

# Add as local marketplace
claude marketplace add ~/Workspace/awesome-econ-ai-stuff
```

## Configuration

After installation, enable the skills you want to use by editing `~/.claude/settings.json`:

```json
{
  "enabledPlugins": {
    "r-econometrics@awesome-econ-ai-stuff": true,
    "latex-tables@awesome-econ-ai-stuff": true,
    "api-data-fetcher@awesome-econ-ai-stuff": true
  }
}
```

Or enable all skills:

```json
{
  "enabledPlugins": {
    "research-ideation@awesome-econ-ai-stuff": true,
    "lit-review-assistant@awesome-econ-ai-stuff": true,
    "latex-econ-model@awesome-econ-ai-stuff": true,
    "api-data-fetcher@awesome-econ-ai-stuff": true,
    "stata-data-cleaning@awesome-econ-ai-stuff": true,
    "r-econometrics@awesome-econ-ai-stuff": true,
    "python-panel-data@awesome-econ-ai-stuff": true,
    "stata-regression@awesome-econ-ai-stuff": true,
    "academic-paper-writer@awesome-econ-ai-stuff": true,
    "latex-tables@awesome-econ-ai-stuff": true,
    "beamer-presentation@awesome-econ-ai-stuff": true,
    "econ-visualization@awesome-econ-ai-stuff": true
  }
}
```

## Using Skills

Once installed and enabled, invoke skills using the `/` command:

```bash
# In Claude Code
/r-econometrics
/latex-tables
/api-data-fetcher
```

## Available Skills

### By Research Stage

**Ideation:**
- `/research-ideation` - Generate research questions

**Literature:**
- `/lit-review-assistant` - Search and synthesize papers

**Theory:**
- `/latex-econ-model` - Write economic models in LaTeX

**Data:**
- `/api-data-fetcher` - Fetch economic data from APIs
- `/stata-data-cleaning` - Clean data in Stata

**Analysis:**
- `/r-econometrics` - IV, DiD, RDD in R
- `/python-panel-data` - Panel data with Python
- `/stata-regression` - Regression in Stata

**Writing:**
- `/academic-paper-writer` - Draft economics papers
- `/latex-tables` - Publication-ready tables

**Communication:**
- `/beamer-presentation` - Create slides
- `/econ-visualization` - Publication-quality charts

## Requirements

### Software

Different skills have different requirements:

**R skills** (`r-econometrics`):
- R 4.0+
- Packages: `fixest`, `modelsummary`, `tidyverse`

**Python skills** (`python-panel-data`):
- Python 3.8+
- Packages: `pandas`, `linearmodels`, `statsmodels`

**Stata skills** (`stata-regression`, `stata-data-cleaning`):
- Stata 15+ (any edition)

**LaTeX skills** (`latex-econ-model`, `latex-tables`, `beamer-presentation`):
- LaTeX distribution (TeX Live, MiKTeX, etc.)
- Recommended packages: `amsmath`, `booktabs`, `graphicx`

## Troubleshooting

### Skills Not Appearing

1. Check marketplace is installed:
   ```bash
   claude marketplace list
   ```

2. Verify skills are enabled in `~/.claude/settings.json`

3. Restart Claude Code

### Skill Not Working

1. Check software requirements are met
2. Read the skill's documentation in `_skills/<category>/<skill-name>/SKILL.md`
3. Verify you have necessary packages installed

## Updates

To update skills to the latest version:

```bash
claude marketplace update awesome-econ-ai-stuff
```

Or if installed manually:

```bash
cd ~/Workspace/awesome-econ-ai-stuff
git pull origin main
```

## Getting Help

- **Documentation**: See individual skill files in `_skills/`
- **Issues**: https://github.com/meleantonio/awesome-econ-ai-stuff/issues
- **Contributions**: See CONTRIBUTING.md

## Compatibility

These skills work with:
- Claude Code (CLI)
- Cursor
- GitHub Codex
- Gemini CLI

All skills follow the open SKILL.md standard.
