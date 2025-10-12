/**
 * BM25 Search Implementation
 * BM25 (Best Matching 25) là một thuật toán ranking function được sử dụng
 * để ước tính mức độ liên quan của tài liệu với truy vấn tìm kiếm
 */

class BM25Search {
  constructor(documents, options = {}) {
    this.documents = documents;
    this.k1 = options.k1 || 1.5; // term frequency saturation parameter
    this.b = options.b || 0.75; // length normalization parameter
    this.index = {};
    this.documentLengths = [];
    this.averageDocumentLength = 0;
    this.N = documents.length; // total number of documents
    
    this.buildIndex();
  }

  /**
   * Tokenize text thành các từ
   */
  tokenize(text) {
    if (!text) return [];
    
    // Chuyển về lowercase và loại bỏ dấu câu
    text = text.toLowerCase()
      .replace(/[^\w\sàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/g, ' ')
      .trim();
    
    // Split thành các từ
    const words = text.split(/\s+/).filter(word => word.length > 0);
    
    return words;
  }

  /**
   * Xây dựng inverted index
   */
  buildIndex() {
    let totalLength = 0;
    
    this.documents.forEach((doc, docIndex) => {
      // Kết hợp title, excerpt và tags để tìm kiếm
      const searchableText = [
        doc.title,
        doc.excerpt,
        (doc.tags || []).join(' '),
        (doc.categories || []).join(' ')
      ].join(' ');
      
      const terms = this.tokenize(searchableText);
      const termFrequency = {};
      
      // Đếm frequency của mỗi term trong document
      terms.forEach(term => {
        termFrequency[term] = (termFrequency[term] || 0) + 1;
      });
      
      // Lưu document length
      this.documentLengths[docIndex] = terms.length;
      totalLength += terms.length;
      
      // Thêm vào inverted index
      Object.keys(termFrequency).forEach(term => {
        if (!this.index[term]) {
          this.index[term] = [];
        }
        this.index[term].push({
          docIndex,
          frequency: termFrequency[term]
        });
      });
    });
    
    this.averageDocumentLength = totalLength / this.N;
  }

  /**
   * Tính IDF (Inverse Document Frequency) cho một term
   * IDF = log((N - df + 0.5) / (df + 0.5) + 1)
   */
  calculateIDF(term) {
    const df = (this.index[term] || []).length; // document frequency
    return Math.log((this.N - df + 0.5) / (df + 0.5) + 1);
  }

  /**
   * Tính BM25 score cho một document với một query
   */
  calculateBM25Score(docIndex, queryTerms) {
    let score = 0;
    const docLength = this.documentLengths[docIndex];
    
    queryTerms.forEach(term => {
      const idf = this.calculateIDF(term);
      const postings = this.index[term] || [];
      
      // Tìm term frequency trong document
      const posting = postings.find(p => p.docIndex === docIndex);
      if (!posting) return;
      
      const tf = posting.frequency;
      
      // BM25 formula
      const numerator = tf * (this.k1 + 1);
      const denominator = tf + this.k1 * (1 - this.b + this.b * (docLength / this.averageDocumentLength));
      
      score += idf * (numerator / denominator);
    });
    
    return score;
  }

  /**
   * Tìm kiếm documents với query
   */
  search(query, options = {}) {
    const limit = options.limit || 10;
    const tagFilter = options.tags || [];
    
    if (!query || query.trim().length === 0) {
      // Nếu không có query, trả về tất cả documents
      let results = this.documents.map((doc, index) => ({
        document: doc,
        score: 0,
        index
      }));
      
      // Apply tag filter
      if (tagFilter.length > 0) {
        results = results.filter(result => {
          const docTags = result.document.tags || [];
          return tagFilter.every(tag => docTags.includes(tag));
        });
      }
      
      // Sort by date (newest first)
      results.sort((a, b) => new Date(b.document.date) - new Date(a.document.date));
      
      return results.slice(0, limit);
    }
    
    const queryTerms = this.tokenize(query);
    const scores = new Map();
    
    // Tính BM25 score cho mỗi document chứa ít nhất một query term
    queryTerms.forEach(term => {
      const postings = this.index[term] || [];
      postings.forEach(posting => {
        if (!scores.has(posting.docIndex)) {
          scores.set(posting.docIndex, 0);
        }
      });
    });
    
    // Calculate scores
    const results = [];
    scores.forEach((_, docIndex) => {
      const doc = this.documents[docIndex];
      
      // Apply tag filter
      if (tagFilter.length > 0) {
        const docTags = doc.tags || [];
        const hasAllTags = tagFilter.every(tag => docTags.includes(tag));
        if (!hasAllTags) return;
      }
      
      const score = this.calculateBM25Score(docIndex, queryTerms);
      results.push({
        document: doc,
        score,
        index: docIndex
      });
    });
    
    // Sort by score (highest first)
    results.sort((a, b) => b.score - a.score);
    
    return results.slice(0, limit);
  }

  /**
   * Lấy tất cả tags từ documents
   */
  getAllTags() {
    const tagsSet = new Set();
    this.documents.forEach(doc => {
      if (doc.tags) {
        doc.tags.forEach(tag => tagsSet.add(tag));
      }
    });
    return Array.from(tagsSet).sort();
  }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BM25Search;
}

