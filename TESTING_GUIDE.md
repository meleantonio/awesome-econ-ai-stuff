# Testing Guide - Awesome Econ AI Skills

## Quick Start

The marketplace is now installed locally and ready to test.

### Skills Currently Enabled

You have 3 skills enabled as a test:

1. **`/r-econometrics`** - Run IV, DiD, and RDD analyses in R
2. **`/latex-tables`** - Generate publication-ready regression tables
3. **`/api-data-fetcher`** - Fetch data from FRED, World Bank, etc.

## How to Test

### Step 1: Open a New Claude Code Session

```bash
# In a new terminal (not this one)
cd ~/Workspace/your-economics-project
claude
```

### Step 2: Invoke a Skill

Type one of these commands:

```
/r-econometrics
```

This should load the skill and provide guidance on running econometric analyses.

### Step 3: Test with Real Task

Try asking Claude to do something the skill is designed for:

**Example for r-econometrics:**
```
/r-econometrics

I need to run a difference-in-differences analysis.
- Treatment: States that adopted policy in 2015
- Outcome: Unemployment rate
- Panel: State-year level
- Need to cluster at state level
```

**Example for latex-tables:**
```
/latex-tables

Convert this regression output to a publication-ready LaTeX table with:
- Three model specifications
- Robust standard errors in parentheses
- Stars for significance levels
```

**Example for api-data-fetcher:**
```
/api-data-fetcher

Fetch US GDP and unemployment rate from FRED for 2010-2023
```

## Enabling More Skills

To enable additional skills, edit `~/.claude/settings.json`:

```json
"enabledPlugins": {
  // ... existing skills ...

  // Add economics skills:
  "research-ideation@awesome-econ-ai-stuff": true,
  "lit-review-assistant@awesome-econ-ai-stuff": true,
  "latex-econ-model@awesome-econ-ai-stuff": true,
  "python-panel-data@awesome-econ-ai-stuff": true,
  "stata-regression@awesome-econ-ai-stuff": true,
  "stata-data-cleaning@awesome-econ-ai-stuff": true,
  "academic-paper-writer@awesome-econ-ai-stuff": true,
  "beamer-presentation@awesome-econ-ai-stuff": true,
  "econ-visualization@awesome-econ-ai-stuff": true
}
```

Save and restart Claude Code.

## All Available Skills

### Ideation
- `/research-ideation` - Generate research questions from economic phenomena

### Literature
- `/lit-review-assistant` - Search, summarize, and synthesize papers

### Theory
- `/latex-econ-model` - Write economic models in LaTeX

### Data
- `/api-data-fetcher` - Fetch economic data from APIs ✅ *enabled*
- `/stata-data-cleaning` - Clean data in Stata

### Analysis
- `/r-econometrics` - IV, DiD, RDD in R ✅ *enabled*
- `/python-panel-data` - Panel data with Python
- `/stata-regression` - Regression in Stata

### Writing
- `/academic-paper-writer` - Draft economics papers
- `/latex-tables` - Publication-ready tables ✅ *enabled*

### Communication
- `/beamer-presentation` - Create academic slides
- `/econ-visualization` - Publication-quality charts

## Troubleshooting

### Skill doesn't load
1. Check it's enabled in `~/.claude/settings.json`
2. Verify marketplace is in `~/.claude/plugins/marketplaces/awesome-econ-ai-stuff/`
3. Restart Claude Code

### Syntax error
- Skills use `/skill-name` format (with leading slash)
- Skill names are lowercase with hyphens

### Wrong behavior
- Read the full skill documentation:
  ```bash
  cat ~/.claude/plugins/marketplaces/awesome-econ-ai-stuff/_skills/analysis/r-econometrics/SKILL.md
  ```

## What to Look For When Testing

1. **Does the skill load?** - You should see Claude acknowledge the skill
2. **Does it understand the domain?** - Economics-specific terminology and methods
3. **Code quality** - Generated R/Python/Stata code should be production-ready
4. **Best practices** - Skills should enforce proper econometric methods

## Feedback

As you test, note:
- Which skills work well
- What could be improved
- Any errors or unexpected behavior
- Ideas for new skills

This feedback can be contributed back to:
https://github.com/meleantonio/awesome-econ-ai-stuff/issues

## Files Created

For your reference, these files were created during setup:

```
awesome-econ-ai-stuff/
├── .claude-plugin/
│   ├── marketplace.json          # Marketplace configuration
│   ├── README.md                 # Marketplace documentation
│   └── CREATED_BY_CLAUDE.md      # Creation notes
├── INSTALLATION.md               # Installation guide
├── TESTING_GUIDE.md             # This file
└── TEST_RESULTS.md              # Validation results
```

## Happy Testing!

Open a new Claude session and try `/r-econometrics` to get started.
