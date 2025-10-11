/**
 * Theme Toggle Functionality
 * Handles dark/light theme switching with localStorage persistence
 */

(function() {
  'use strict';

  // Theme constants
  const THEME_KEY = 'blog-theme';
  const THEME_DARK = 'dark';
  const THEME_LIGHT = 'light';
  
  // Get saved theme from localStorage or default to light
  function getSavedTheme() {
    return localStorage.getItem(THEME_KEY) || THEME_LIGHT;
  }
  
  // Save theme to localStorage
  function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
  }
  
  // Apply theme to document
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === THEME_DARK ? '#0f0f0f' : '#0a0a0a');
    }
    
    // Dispatch custom event for other scripts that might need to react
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }
  
  // Toggle between themes
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    
    applyTheme(newTheme);
    saveTheme(newTheme);
  }
  
  // Initialize theme on page load
  function initTheme() {
    const savedTheme = getSavedTheme();
    applyTheme(savedTheme);
  }
  
  // Set up event listeners
  function setupEventListeners() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', toggleTheme);
      
      // Add keyboard support
      themeToggleBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTheme();
        }
      });
    }
  }
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initTheme();
      setupEventListeners();
    });
  } else {
    initTheme();
    setupEventListeners();
  }
  
  // Handle system theme preference changes (optional)
  if (window.matchMedia) {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Only apply system preference if no saved preference exists
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(darkModeQuery.matches ? THEME_DARK : THEME_LIGHT);
    }
    
    // Listen for system theme changes
    darkModeQuery.addEventListener('change', function(e) {
      // Only auto-switch if user hasn't set a preference
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
      }
    });
  }
  
})();

