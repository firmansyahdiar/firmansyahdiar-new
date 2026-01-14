// theme.js - Dark Mode Management
(function() {
    'use strict';
    
    const THEME_KEY = 'portfolio-theme';
    
    // Initialize theme on page load
    function initTheme() {
        // Check for saved theme preference or default to system preference
        const savedTheme = localStorage.getItem(THEME_KEY);
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        applyTheme(theme);
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(THEME_KEY)) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    // Apply theme to document
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
    
    // Toggle theme
    function toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        
        applyTheme(newTheme);
        localStorage.setItem(THEME_KEY, newTheme);
    }
    
    // Setup theme toggle buttons
    function setupThemeToggles() {
        const desktopToggle = document.getElementById('theme-toggle');
        const mobileToggle = document.getElementById('mobile-theme-toggle');
        
        if (desktopToggle) {
            desktopToggle.addEventListener('click', toggleTheme);
        }
        
        if (mobileToggle) {
            mobileToggle.addEventListener('click', toggleTheme);
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initTheme();
            setupThemeToggles();
        });
    } else {
        initTheme();
        setupThemeToggles();
    }
    
    // Export for use in other scripts if needed
    window.themeManager = {
        toggle: toggleTheme,
        apply: applyTheme,
        getCurrent: () => document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    };
})();
