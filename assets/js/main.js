/**
 * Awesome Econ AI Stuff - Main JavaScript
 */

const PATH_STORAGE_KEY = 'econ_ai_expertise_path';

const PATH_CONFIG = {
    beginner: {
        label: 'First Steps',
        icon: '🌱',
        indicatorClass: 'path-ind-beginner',
        recommendedLevels: ['beginner'],
        dimmedLevels: ['advanced'],
        contextText: 'Showing skills for: First Steps',
    },
    intermediate: {
        label: 'Level Up',
        icon: '🚀',
        indicatorClass: 'path-ind-intermediate',
        recommendedLevels: ['beginner', 'intermediate'],
        dimmedLevels: ['advanced'],
        contextText: 'Showing skills for: Level Up',
    },
    advanced: {
        label: 'Power Mode',
        icon: '⚡',
        indicatorClass: 'path-ind-advanced',
        recommendedLevels: ['beginner', 'intermediate', 'advanced'],
        dimmedLevels: [],
        contextText: 'Showing skills for: Power Mode',
    },
};

document.addEventListener('DOMContentLoaded', () => {
    initFilterTabs();
    initSmoothScroll();
    initNavScroll();
    initPathSelector();
    wirePanelDownloadButtons();

    const stored = localStorage.getItem(PATH_STORAGE_KEY);
    if (stored && PATH_CONFIG[stored]) {
        applyPath(stored, false);
    }
});

/**
 * Filter tabs for skills catalog — extended to support "recommended" filter.
 */
function initFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const skillCards = document.querySelectorAll('.skill-card');

    if (!filterTabs.length) return;

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.dataset.filter;
            const activePath = localStorage.getItem(PATH_STORAGE_KEY);

            skillCards.forEach(card => {
                const category = card.dataset.category;
                const level = card.dataset.level;
                let shouldShow = false;

                if (filter === 'all') {
                    shouldShow = true;
                } else if (filter === 'recommended' && activePath) {
                    shouldShow = PATH_CONFIG[activePath].recommendedLevels.includes(level);
                } else {
                    shouldShow = category === filter;
                }

                if (shouldShow) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.3s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Path selector cards — click to choose a path.
 */
function initPathSelector() {
    const pathCards = document.querySelectorAll('.path-card');
    const contextChangeBtn = document.getElementById('path-context-change');

    pathCards.forEach(card => {
        card.addEventListener('click', () => {
            const path = card.dataset.path;
            if (path) {
                applyPath(path, true);
            }
        });
    });

    if (contextChangeBtn) {
        contextChangeBtn.addEventListener('click', () => {
            const pathSection = document.getElementById('choose-path');
            if (pathSection) {
                pathSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
}

/**
 * Apply a chosen path: update all UI state, persist to localStorage.
 *
 * @param {string} path - 'beginner' | 'intermediate' | 'advanced'
 * @param {boolean} scroll - whether to scroll to path guidance panel
 */
function applyPath(path, scroll) {
    const config = PATH_CONFIG[path];
    if (!config) return;

    localStorage.setItem(PATH_STORAGE_KEY, path);

    updatePathCards(path);
    updateGuidancePanels(path, scroll);
    updateQuickStart(path);
    updateCTASection(path);
    updateSkillCards(path, config);
    updateNavIndicator(path, config);
    updateContextBanner(path, config);
    showRecommendedTab();
    activateRecommendedTab();
}

/**
 * Mark the selected path card as active, clear others.
 */
function updatePathCards(path) {
    document.querySelectorAll('.path-card').forEach(card => {
        const isActive = card.dataset.path === path;
        card.classList.toggle('active', isActive);

        const existing = card.querySelector('.path-active-check');
        if (existing) existing.remove();

        if (isActive) {
            const check = document.createElement('div');
            check.className = 'path-active-check';
            check.textContent = '✓';
            card.appendChild(check);
        }
    });
}

/**
 * Show the matching guidance panel; hide the others.
 */
function updateGuidancePanels(path, scroll) {
    const panelIds = ['panel-beginner', 'panel-intermediate', 'panel-advanced'];
    panelIds.forEach(id => {
        const panel = document.getElementById(id);
        if (!panel) return;
        const isTarget = id === `panel-${path}`;
        panel.hidden = !isTarget;
    });

    if (scroll) {
        const target = document.getElementById(`panel-${path}`);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
        }
    }
}

/**
 * Show the correct Quick Start variant.
 */
function updateQuickStart(path) {
    const variants = {
        beginner: document.getElementById('qs-beginner'),
        intermediate: document.getElementById('qs-default'),
        advanced: document.getElementById('qs-advanced'),
    };

    Object.entries(variants).forEach(([key, el]) => {
        if (!el) return;
        el.hidden = key !== path;
    });
}

/**
 * Show the correct CTA variant.
 */
function updateCTASection(path) {
    const variants = {
        beginner: document.getElementById('cta-beginner'),
        intermediate: document.getElementById('cta-intermediate'),
        advanced: document.getElementById('cta-advanced'),
    };
    const defaultCTA = document.getElementById('cta-default');
    if (defaultCTA) defaultCTA.hidden = true;

    Object.entries(variants).forEach(([key, el]) => {
        if (!el) return;
        el.hidden = key !== path;
    });
}

/**
 * Apply recommendation / dimmed classes to skill cards.
 */
function updateSkillCards(path, config) {
    document.querySelectorAll('.skill-card').forEach(card => {
        const level = card.dataset.level;

        card.classList.remove('skill-recommended', 'skill-dimmed');

        const badgeEl = card.querySelector('.skill-rec-badge');
        if (badgeEl) badgeEl.remove();

        if (config.recommendedLevels.includes(level)) {
            card.classList.add('skill-recommended');

            const badge = document.createElement('span');
            badge.className = `skill-rec-badge skill-rec-badge-${level}`;
            badge.textContent = '✓ For you';
            const header = card.querySelector('.skill-header');
            if (header) header.appendChild(badge);
        } else if (config.dimmedLevels.includes(level)) {
            card.classList.add('skill-dimmed');
        }
    });
}

/**
 * Update the nav path indicator pill.
 */
function updateNavIndicator(path, config) {
    const indicator = document.getElementById('nav-path-indicator');
    if (!indicator) return;

    indicator.hidden = false;
    indicator.className = `nav-path-indicator ${config.indicatorClass}`;
    indicator.textContent = `${config.icon} ${config.label}`;
}

/**
 * Update the context banner above the skills grid.
 */
function updateContextBanner(path, config) {
    const banner = document.getElementById('path-context-banner');
    const iconEl = document.getElementById('path-context-icon');
    const textEl = document.getElementById('path-context-text');
    if (!banner || !iconEl || !textEl) return;

    banner.hidden = false;
    iconEl.textContent = config.icon;
    textEl.textContent = config.contextText;
}

/**
 * Reveal the "Recommended" filter tab.
 */
function showRecommendedTab() {
    const tab = document.getElementById('tab-recommended');
    if (tab) tab.hidden = false;
}

/**
 * Activate the "Recommended" filter tab and trigger filtering.
 */
function activateRecommendedTab() {
    const tab = document.getElementById('tab-recommended');
    if (!tab) return;
    tab.click();
}

/**
 * Wire the extra download-all buttons in the guidance panels and CTA section
 * to the same handler used by the main download button.
 */
function wirePanelDownloadButtons() {
    ['download-all-btn-panel', 'download-all-btn-qs', 'download-all-btn-cta'].forEach(id => {
        const btn = document.getElementById(id);
        if (!btn) return;
        btn.addEventListener('click', () => {
            const mainBtn = document.getElementById('download-all-btn');
            if (mainBtn) {
                mainBtn.click();
            }
        });
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/**
 * Navigation background on scroll
 */
function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        nav.style.backgroundColor = window.scrollY > 50
            ? 'rgba(10, 10, 15, 0.95)'
            : 'rgba(10, 10, 15, 0.8)';
    });
}

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
