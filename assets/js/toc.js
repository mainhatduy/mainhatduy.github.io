/**
 * Table of Contents (TOC) Generator
 * Automatically generates an outline from post headings
 */

(function() {
  'use strict';

  function initTOC() {
    const postContent = document.querySelector('.post-content');
    const tocContainer = document.querySelector('.toc-container');
    
    if (!postContent || !tocContainer) return;

    // Get all headings (h2, h3, h4)
    const headings = postContent.querySelectorAll('h2, h3, h4');
    
    if (headings.length === 0) {
      // Hide TOC if no headings
      tocContainer.style.display = 'none';
      return;
    }

    // Generate unique IDs for headings if they don't have one
    headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }
    });

    // Build TOC HTML
    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';

    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.substring(1)); // h2 -> 2, h3 -> 3
      const listItem = document.createElement('li');
      listItem.className = `toc-item toc-level-${level}`;
      
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.className = 'toc-link';
      
      // Smooth scroll on click
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const navHeight = document.querySelector('.main-nav')?.offsetHeight || 64;
          const targetPosition = targetElement.offsetTop - navHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Update active state
          updateActiveLink(link);
        }
      });
      
      listItem.appendChild(link);
      tocList.appendChild(listItem);
    });

    // Insert TOC into container
    const tocContent = tocContainer.querySelector('.toc-content');
    if (tocContent) {
      tocContent.appendChild(tocList);
    }

    // Initialize scroll spy
    initScrollSpy(headings);
    
    // Toggle functionality for mobile
    initTOCToggle();
  }

  function initScrollSpy(headings) {
    const navHeight = document.querySelector('.main-nav')?.offsetHeight || 64;
    let isScrolling;

    function updateActiveHeading() {
      const scrollPos = window.scrollY + navHeight + 100;
      
      let currentHeading = null;
      headings.forEach((heading) => {
        if (heading.offsetTop <= scrollPos) {
          currentHeading = heading;
        }
      });

      // Update active states
      document.querySelectorAll('.toc-link').forEach((link) => {
        link.classList.remove('active');
      });

      if (currentHeading) {
        const activeLink = document.querySelector(`.toc-link[href="#${currentHeading.id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    }

    // Throttle scroll events
    window.addEventListener('scroll', () => {
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(updateActiveHeading, 50);
    });

    // Initial check
    updateActiveHeading();
  }

  function updateActiveLink(clickedLink) {
    document.querySelectorAll('.toc-link').forEach((link) => {
      link.classList.remove('active');
    });
    clickedLink.classList.add('active');
  }

  function initTOCToggle() {
    const tocToggle = document.querySelector('.toc-toggle');
    const tocContent = document.querySelector('.toc-content');
    
    if (!tocToggle || !tocContent) return;

    tocToggle.addEventListener('click', () => {
      const isExpanded = tocContent.classList.toggle('expanded');
      tocToggle.setAttribute('aria-expanded', isExpanded);
      
      // Update icon or text
      const icon = tocToggle.querySelector('.toc-toggle-icon');
      if (icon) {
        icon.textContent = isExpanded ? '−' : '+';
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTOC);
  } else {
    initTOC();
  }
})();

