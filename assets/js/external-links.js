/**
 * External Links Handler
 * Automatically adds target="_blank" and rel="noopener noreferrer" to all external links
 */

(function() {
  'use strict';

  /**
   * Check if a link is external
   * @param {HTMLAnchorElement} link - The link element to check
   * @returns {boolean} True if the link is external
   */
  function isExternalLink(link) {
    // Skip if it's a mailto: or tel: link
    if (link.href.startsWith('mailto:') || link.href.startsWith('tel:')) {
      return false;
    }

    // Skip if it's an anchor link (starts with #)
    if (link.getAttribute('href')?.startsWith('#')) {
      return false;
    }

    // Check if the link is external
    const currentHost = window.location.hostname;
    const linkHost = link.hostname;

    // If linkHost is empty, it's a relative link
    if (!linkHost) {
      return false;
    }

    // Check if the link is external
    return linkHost !== currentHost;
  }

  /**
   * Add target="_blank" to external links
   */
  function handleExternalLinks() {
    // Get all links in the document
    const links = document.querySelectorAll('a[href]');

    links.forEach(function(link) {
      if (isExternalLink(link)) {
        // Add target="_blank" if not already set
        if (!link.hasAttribute('target')) {
          link.setAttribute('target', '_blank');
        }

        // Add rel="noopener noreferrer" for security
        const currentRel = link.getAttribute('rel') || '';
        const relValues = currentRel.split(' ').filter(Boolean);

        if (!relValues.includes('noopener')) {
          relValues.push('noopener');
        }
        if (!relValues.includes('noreferrer')) {
          relValues.push('noreferrer');
        }

        link.setAttribute('rel', relValues.join(' '));
      }
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleExternalLinks);
  } else {
    handleExternalLinks();
  }

  // Also run when new content is dynamically added (for SPAs or dynamic content)
  // Using MutationObserver to watch for new links
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(function(mutations) {
      let shouldUpdate = false;

      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) { // Element node
              if (node.tagName === 'A' || node.querySelector('a')) {
                shouldUpdate = true;
              }
            }
          });
        }
      });

      if (shouldUpdate) {
        handleExternalLinks();
      }
    });

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
})();

