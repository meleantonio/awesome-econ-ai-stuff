/**
 * Download functionality for Awesome Econ AI Stuff
 */

/**
 * GitHub repository information for fallback fetching
 */
const GITHUB_REPO = 'meleantonio/awesome-econ-ai-stuff';
const GITHUB_BRANCH = 'main'; // or 'master', adjust as needed

/**
 * List of all skills with their paths
 * This should match the actual structure in the skills directory
 */
const SKILLS_LIST = [
    { path: '_skills/analysis/r-econometrics/SKILL.md', name: 'r-econometrics' },
    { path: '_skills/analysis/stata-regression/SKILL.md', name: 'stata-regression' },
    { path: '_skills/analysis/python-panel-data/SKILL.md', name: 'python-panel-data' },
    { path: '_skills/data/stata-data-cleaning/SKILL.md', name: 'stata-data-cleaning' },
    { path: '_skills/data/api-data-fetcher/SKILL.md', name: 'api-data-fetcher' },
    { path: '_skills/theory/latex-econ-model/SKILL.md', name: 'latex-econ-model' },
    { path: '_skills/writing/academic-paper-writer/SKILL.md', name: 'academic-paper-writer' },
    { path: '_skills/writing/latex-tables/SKILL.md', name: 'latex-tables' },
    { path: '_skills/communication/beamer-presentation/SKILL.md', name: 'beamer-presentation' },
    { path: '_skills/communication/econ-visualization/SKILL.md', name: 'econ-visualization' },
    { path: '_skills/ideation/research-ideation/SKILL.md', name: 'research-ideation' },
    { path: '_skills/literature/lit-review-assistant/SKILL.md', name: 'lit-review-assistant' }
];

/**
 * Fetch file content with fallback to GitHub raw URL
 */
async function fetchFileContent(path) {
    const baseUrl = getBaseUrl();
    
    // Try direct path first
    try {
        const url = `${baseUrl}/${path}`;
        const response = await fetch(url);
        if (response.ok) {
            const content = await response.text();
            // Check if we got HTML instead of markdown (Jekyll might have processed it)
            if (content.trim().startsWith('<!DOCTYPE') || content.trim().startsWith('<html')) {
                throw new Error('Got HTML instead of markdown');
            }
            return content;
        }
    } catch (error) {
        console.warn(`Failed to fetch ${path} directly, trying GitHub raw URL:`, error);
    }
    
    // Fallback to GitHub raw URL
    const githubUrl = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${path}`;
    const response = await fetch(githubUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${path} from GitHub: ${response.statusText}`);
    }
    return await response.text();
}

/**
 * Get base URL for fetching files
 */
function getBaseUrl() {
    // Check if we're in a Jekyll environment (set by script tag)
    if (typeof window.siteBaseurl !== 'undefined') {
        return window.siteBaseurl;
    }
    // Try to get from meta tag or default to empty string
    const baseTag = document.querySelector('base');
    if (baseTag && baseTag.href) {
        return new URL(baseTag.href).pathname.replace(/\/$/, '');
    }
    // For local development, try to detect from current path
    const path = window.location.pathname;
    if (path.includes('/awesome-econ-ai-stuff')) {
        return '/awesome-econ-ai-stuff';
    }
    return '';
}

/**
 * Download all skills as a zip file
 */
async function downloadAllSkills() {
    const button = document.getElementById('download-all-btn');
    if (button) {
        button.disabled = true;
        button.textContent = 'Downloading...';
    }

    try {
        const baseUrl = getBaseUrl();
        const JSZip = window.JSZip;
        
        if (!JSZip) {
            throw new Error('JSZip library not loaded');
        }

        const zip = new JSZip();
        const skillsFolder = zip.folder('skills');

        // Fetch all skills
        const fetchPromises = SKILLS_LIST.map(async (skill) => {
            try {
                const content = await fetchFileContent(skill.path);
                
                // Preserve directory structure in zip
                const pathParts = skill.path.split('/');
                const category = pathParts[1]; // e.g., 'analysis'
                const skillName = pathParts[2]; // e.g., 'r-econometrics'
                
                const categoryFolder = skillsFolder.folder(category);
                const skillFolder = categoryFolder.folder(skillName);
                skillFolder.file('SKILL.md', content);
            } catch (error) {
                console.error(`Error fetching ${skill.path}:`, error);
                // Continue with other files even if one fails
            }
        });

        await Promise.all(fetchPromises);

        // Generate zip file
        const blob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'awesome-econ-ai-skills.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        if (button) {
            button.disabled = false;
            button.textContent = 'Download All Skills';
        }
    } catch (error) {
        console.error('Error creating zip file:', error);
        alert('Failed to download skills. Please try again.');
        if (button) {
            button.disabled = false;
            button.textContent = 'Download All Skills';
        }
    }
}

/**
 * Download individual SKILL.md file
 */
async function downloadSkillFile() {
    const button = document.getElementById('download-skill-btn');
    if (button) {
        button.disabled = true;
        button.textContent = 'Downloading...';
    }

    try {
        // Get current page path to determine skill path
        const currentPath = window.location.pathname;
        const baseUrl = getBaseUrl();
        
        // Extract skill path from current URL
        // e.g., /awesome-econ-ai-stuff/skills/analysis/r-econometrics/
        let skillPath = currentPath;
        if (baseUrl && currentPath.startsWith(baseUrl)) {
            skillPath = currentPath.substring(baseUrl.length);
        }
        
        // Remove trailing slash and add SKILL.md
        skillPath = skillPath.replace(/\/$/, '') + '/SKILL.md';
        
        // Fetch the SKILL.md file (with fallback to GitHub raw URL)
        const content = await fetchFileContent(skillPath);
        
        // Extract skill name from path for filename
        const pathParts = skillPath.split('/');
        const skillName = pathParts[pathParts.length - 2] || 'skill';
        
        // Create download
        const blob = new Blob([content], { type: 'text/markdown' });
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `${skillName}-SKILL.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);

        if (button) {
            button.disabled = false;
            button.textContent = 'Download SKILL.md';
        }
    } catch (error) {
        console.error('Error downloading skill file:', error);
        alert('Failed to download SKILL.md file. Please try again.');
        if (button) {
            button.disabled = false;
            button.textContent = 'Download SKILL.md';
        }
    }
}

// Initialize download buttons when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize download all button
    const downloadAllBtn = document.getElementById('download-all-btn');
    if (downloadAllBtn) {
        downloadAllBtn.addEventListener('click', downloadAllSkills);
    }

    // Initialize download skill button
    const downloadSkillBtn = document.getElementById('download-skill-btn');
    if (downloadSkillBtn) {
        downloadSkillBtn.addEventListener('click', downloadSkillFile);
    }
});
