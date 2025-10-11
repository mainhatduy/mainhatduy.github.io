/**
 * Code Copy Functionality
 * Adds copy buttons to all code blocks
 */

document.addEventListener('DOMContentLoaded', function() {
  // Find all pre elements (code blocks)
  const codeBlocks = document.querySelectorAll('pre');
  
  codeBlocks.forEach(function(codeBlock) {
    // Determine the container element (either .highlight wrapper or pre itself)
    const container = codeBlock.parentElement && codeBlock.parentElement.classList.contains('highlight') 
      ? codeBlock.parentElement 
      : codeBlock;
    
    // Skip if button already exists (prevents duplicates)
    if (container.querySelector('.code-copy-btn')) {
      return;
    }
    
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'code-copy-btn';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    copyButton.setAttribute('title', 'Copy code');
    
    // Add click event listener
    copyButton.addEventListener('click', function() {
      // Get the code content
      const codeElement = codeBlock.querySelector('code');
      const code = codeElement ? codeElement.textContent : codeBlock.textContent;
      
      // Copy to clipboard
      navigator.clipboard.writeText(code).then(function() {
        // Success feedback
        copyButton.classList.add('copied');
        copyButton.setAttribute('title', 'Copied!');
        
        // Reset button after 2 seconds
        setTimeout(function() {
          copyButton.classList.remove('copied');
          copyButton.setAttribute('title', 'Copy code');
        }, 2000);
      }).catch(function(err) {
        // Fallback for older browsers
        console.error('Failed to copy code:', err);
        
        // Try alternative method for older browsers
        try {
          const textArea = document.createElement('textarea');
          textArea.value = code;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          
          copyButton.classList.add('copied');
          copyButton.setAttribute('title', 'Copied!');
          
          setTimeout(function() {
            copyButton.classList.remove('copied');
            copyButton.setAttribute('title', 'Copy code');
          }, 2000);
        } catch (e) {
          console.error('Copy failed:', e);
        }
      });
    });
    
    // Insert button into the appropriate container
    container.insertBefore(copyButton, container.firstChild);
  });
});

