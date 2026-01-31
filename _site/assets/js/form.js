/**
 * Skill Submission Form Handler
 */

document.addEventListener('DOMContentLoaded', () => {
    initForm();
    initLivePreview();
});

/**
 * Initialize form submission
 */
function initForm() {
    const form = document.getElementById('skill-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const skillData = buildSkillData(formData);

            // Submit to serverless function
            const response = await submitSkill(skillData);

            if (response.success) {
                showSuccess(response.prUrl);
            } else {
                showError(response.error || 'Submission failed');
            }
        } catch (error) {
            console.error('Submission error:', error);
            showError(error.message);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

/**
 * Build skill data from form
 */
function buildSkillData(formData) {
    const compatibility = formData.getAll('compatibility');
    const tags = formData.get('tags')
        ? formData.get('tags').split(',').map(t => t.trim()).filter(Boolean)
        : [];

    return {
        name: formData.get('name'),
        description: formData.get('description'),
        workflow_stage: formData.get('workflow_stage'),
        primary_tool: formData.get('primary_tool'),
        compatibility: compatibility,
        purpose: formData.get('purpose'),
        instructions: formData.get('instructions'),
        example: formData.get('example'),
        tags: tags,
        author: {
            name: formData.get('author_name'),
            email: formData.get('author_email'),
            github: formData.get('github_username')
        }
    };
}

/**
 * Submit skill to serverless function
 */
async function submitSkill(skillData) {
    // For now, fall back to GitHub Issues approach
    // When Netlify Functions are set up, this would POST to /.netlify/functions/submit-skill

    const issueBody = generateSkillMarkdown(skillData);
    const issueTitle = encodeURIComponent(`[Skill Proposal] ${skillData.name}`);
    const issueBodyEncoded = encodeURIComponent(issueBody);

    // Redirect to GitHub issue creation
    const issueUrl = `https://github.com/meleantonio/awesome-econ-ai-stuff/issues/new?title=${issueTitle}&body=${issueBodyEncoded}&labels=skill-proposal`;

    window.open(issueUrl, '_blank');

    return {
        success: true,
        prUrl: issueUrl
    };
}

/**
 * Generate SKILL.md content
 */
function generateSkillMarkdown(data) {
    const compatibilityYaml = data.compatibility.map(c => `  - ${c}`).join('\n');
    const tagsYaml = data.tags.length > 0
        ? data.tags.map(t => `  - ${t}`).join('\n')
        : '  - general';

    return `---
name: ${data.name}
description: ${data.description}
workflow_stage: ${data.workflow_stage}
compatibility:
${compatibilityYaml}
author: ${data.author.name} <${data.author.email}>
version: 1.0.0
tags:
${tagsYaml}
---

# ${toTitleCase(data.name.replace(/-/g, ' '))}

## Purpose

${data.purpose}

## Instructions

${data.instructions}

${data.example ? `## Example Output

\`\`\`
${data.example}
\`\`\`` : ''}

## Author

- **Name:** ${data.author.name}
- **Email:** ${data.author.email}
${data.author.github ? `- **GitHub:** [@${data.author.github}](https://github.com/${data.author.github})` : ''}
`;
}

/**
 * Initialize live preview
 */
function initLivePreview() {
    const form = document.getElementById('skill-form');
    if (!form) return;

    // Update preview on input
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', debounce(updatePreview, 300));
        input.addEventListener('change', updatePreview);
    });

    // Initial preview
    updatePreview();
}

/**
 * Update the preview pane
 */
function updatePreview() {
    const form = document.getElementById('skill-form');
    const preview = document.getElementById('skill-preview');
    if (!form || !preview) return;

    const formData = new FormData(form);
    const skillData = buildSkillData(formData);
    const markdown = generateSkillMarkdown(skillData);

    preview.querySelector('code').textContent = markdown;
}

/**
 * Show success message
 */
function showSuccess(prUrl) {
    const form = document.getElementById('skill-form');
    const successMsg = document.getElementById('success-message');
    const prLink = document.getElementById('pr-link');

    if (form) form.hidden = true;
    if (successMsg) successMsg.hidden = false;
    if (prLink) prLink.href = prUrl;
}

/**
 * Show error message
 */
function showError(message) {
    const errorMsg = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');

    if (errorMsg) errorMsg.hidden = false;
    if (errorText) errorText.textContent = message;
}

/**
 * Utility: Title case
 */
function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt =>
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
}

/**
 * Utility: Debounce
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Expose updatePreview globally for button click
window.updatePreview = updatePreview;
