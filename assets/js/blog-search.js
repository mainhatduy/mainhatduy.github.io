/**
 * Blog Search UI and Integration
 */

class BlogSearch {
  constructor() {
    this.searchEngine = null;
    this.allPosts = [];
    this.selectedTags = new Set();
    this.currentQuery = '';
    
    this.init();
  }

  async init() {
    try {
      // Load search index
      const response = await fetch('/search.json');
      this.allPosts = await response.json();
      
      // Initialize BM25 search engine
      this.searchEngine = new BM25Search(this.allPosts);
      
      // Setup UI
      this.setupSearchUI();
      this.renderTagFilters();
      
      // Check for URL parameters
      this.handleURLParams();
      
      // Perform initial search/display
      this.performSearch();
    } catch (error) {
      console.error('Failed to initialize search:', error);
    }
  }

  setupSearchUI() {
    const searchContainer = document.getElementById('blog-search-container');
    if (!searchContainer) return;

    // Create search input
    const searchHTML = `
      <div class="search-box">
        <input 
          type="text" 
          id="search-input" 
          class="search-input" 
          placeholder="Tìm kiếm bài viết..."
          aria-label="Tìm kiếm bài viết"
        >
        <button id="clear-search" class="clear-search-btn" aria-label="Xóa tìm kiếm" style="display: none;">
          ✕
        </button>
      </div>
      <div id="tag-filters" class="tag-filters"></div>
      <div id="search-results" class="search-results"></div>
    `;
    
    searchContainer.innerHTML = searchHTML;

    // Add event listeners
    const searchInput = document.getElementById('search-input');
    const clearBtn = document.getElementById('clear-search');
    
    searchInput.addEventListener('input', (e) => {
      this.currentQuery = e.target.value;
      this.performSearch();
      clearBtn.style.display = this.currentQuery ? 'block' : 'none';
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      this.currentQuery = '';
      this.performSearch();
      clearBtn.style.display = 'none';
      searchInput.focus();
    });
  }

  renderTagFilters() {
    const tagFiltersContainer = document.getElementById('tag-filters');
    if (!tagFiltersContainer || !this.searchEngine) return;

    const allTags = this.searchEngine.getAllTags();
    
    if (allTags.length === 0) {
      tagFiltersContainer.style.display = 'none';
      return;
    }

    const tagsHTML = `
      <div class="tag-filter-header">
        <span class="tag-filter-label">Lọc theo tags:</span>
        <button id="clear-tags" class="clear-tags-btn" style="display: ${this.selectedTags.size > 0 ? 'inline-block' : 'none'}">
          Xóa bộ lọc
        </button>
      </div>
      <div class="tag-filter-list">
        ${allTags.map(tag => `
          <button 
            class="tag-filter ${this.selectedTags.has(tag) ? 'active' : ''}" 
            data-tag="${tag}"
            aria-pressed="${this.selectedTags.has(tag)}"
          >
            ${tag}
          </button>
        `).join('')}
      </div>
    `;
    
    tagFiltersContainer.innerHTML = tagsHTML;

    // Add event listeners to tag filters
    const tagButtons = tagFiltersContainer.querySelectorAll('.tag-filter');
    tagButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tag = btn.dataset.tag;
        this.toggleTagFilter(tag);
      });
    });

    // Clear all tags button
    const clearTagsBtn = document.getElementById('clear-tags');
    if (clearTagsBtn) {
      clearTagsBtn.addEventListener('click', () => {
        this.selectedTags.clear();
        this.renderTagFilters();
        this.performSearch();
        this.updateURL();
      });
    }
  }

  toggleTagFilter(tag) {
    if (this.selectedTags.has(tag)) {
      this.selectedTags.delete(tag);
    } else {
      this.selectedTags.add(tag);
    }
    
    this.renderTagFilters();
    this.performSearch();
    this.updateURL();
  }

  performSearch() {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer || !this.searchEngine) return;

    const results = this.searchEngine.search(this.currentQuery, {
      tags: Array.from(this.selectedTags),
      limit: 50
    });

    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-empty">
          <p>Không tìm thấy bài viết nào${this.currentQuery ? ` cho từ khóa "<strong>${this.escapeHtml(this.currentQuery)}</strong>"` : ''}${this.selectedTags.size > 0 ? ' với các tags đã chọn' : ''}.</p>
        </div>
      `;
      return;
    }

    const resultsHTML = `
      <div class="search-results-header">
        <p>Tìm thấy <strong>${results.length}</strong> bài viết${this.currentQuery ? ` cho "<strong>${this.escapeHtml(this.currentQuery)}</strong>"` : ''}</p>
      </div>
      <div class="blog-list">
        ${results.map(result => this.renderPostCard(result.document)).join('')}
      </div>
    `;
    
    resultsContainer.innerHTML = resultsHTML;
  }

  renderPostCard(post) {
    const excerpt = this.highlightSearchTerms(post.excerpt, this.currentQuery);
    const title = this.highlightSearchTerms(post.title, this.currentQuery);
    
    return `
      <article class="blog-post-card">
        <div class="blog-post-header">
          <h2 class="blog-post-title">
            <a href="${post.url}">${title}</a>
          </h2>
          <time class="blog-post-date" datetime="${post.date}">
            ${this.formatDate(post.date)}
          </time>
        </div>
        
        ${post.tags && post.tags.length > 0 ? `
          <div class="blog-post-tags">
            ${post.tags.map(tag => `
              <span class="tag ${this.selectedTags.has(tag) ? 'active' : ''}">${tag}</span>
            `).join('')}
          </div>
        ` : ''}
        
        <div class="blog-post-excerpt">
          ${excerpt}
        </div>
        
        <a href="${post.url}" class="blog-post-link">
          Đọc thêm →
        </a>
      </article>
    `;
  }

  highlightSearchTerms(text, query) {
    if (!query || !text) return this.escapeHtml(text);
    
    const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 0);
    let highlightedText = this.escapeHtml(text);
    
    terms.forEach(term => {
      const regex = new RegExp(`(${this.escapeRegex(term)})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
    });
    
    return highlightedText;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  handleURLParams() {
    const params = new URLSearchParams(window.location.search);
    
    // Handle tag parameter
    const tag = params.get('tag');
    if (tag) {
      this.selectedTags.add(tag);
      this.renderTagFilters();
    }
    
    // Handle search query parameter
    const query = params.get('q');
    if (query) {
      this.currentQuery = query;
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        searchInput.value = query;
        document.getElementById('clear-search').style.display = 'block';
      }
    }
  }

  updateURL() {
    const params = new URLSearchParams();
    
    if (this.currentQuery) {
      params.set('q', this.currentQuery);
    }
    
    if (this.selectedTags.size > 0) {
      // Add first tag to URL for simplicity
      params.set('tag', Array.from(this.selectedTags)[0]);
    }
    
    const newURL = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    
    window.history.replaceState({}, '', newURL);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new BlogSearch();
  });
} else {
  new BlogSearch();
}

