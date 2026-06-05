// ==========================================================================
// AI Engineer Portfolio Core Scripts & Animations
// ==========================================================================

// --- Tailwind Configuration Extension ---
if (typeof tailwind !== 'undefined') {
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          mono: ['JetBrains Mono', 'monospace'],
        },
        colors: {
          dark: '#08090A',
          card: '#0F1112',
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        },
        animation: {
          'fade-in': 'fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          'shimmer': 'shimmer 8s linear infinite',
          'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          shimmer: {
            '0%': { backgroundPosition: '-1000px 0' },
            '100%': { backgroundPosition: '1000px 0' },
          }
        }
      }
    }
  };
}

// --- Projects Database ---
const PROJECTS_DATA = {
  'proj-1': {
    title: "Vietnamese Medical SLM",
    icon: "lucide:brain-circuit",
    techs: ["PyTorch", "Transformers", "Unsloth", "DeepSpeed", "Datatrove", "Marker"],
    description: "Small Language Models (1.7B to 4B parameters) fine-tuned for specialized medical queries and Vietnamese healthcare environments.",
    problem: "Traditional Large Language Models are computationally expensive to run on localized hospital edge systems, and frequently hallucinate or fail when queried with Vietnamese clinical documentation or terminology.",
    solution: "Digitized physical medical documents using Marker, cleaned data at scale with Datatrove, and optimized SLM training on consumer-grade GPU instances using Unsloth (LoRA/QLoRA) and DeepSpeed SFT pipelines.",
    metrics: {
      "Evaluation": "MedUC Benchmark",
      "Accuracy Improvement": "+4.5% vs Base",
      "Model Sizes": "1.7B - 4.0B params",
      "Inference Target": "Edge Deployment"
    },
    linkUrl: "https://huggingface.co/collections/myduy/vietnamese-medical-language-models-68f73b22ffa29c05d321bf23",
    linkLabel: "View Collection Hub"
  },
  'proj-2': {
    title: "Agentic RAG Chatbot",
    icon: "lucide:bot",
    techs: ["LangGraph", "LangChain", "ElasticSearch", "PostgreSQL", "Python", "vLLM"],
    description: "Enterprise agentic assistant utilizing graph-based multi-agent flows and hybrid search capabilities.",
    problem: "Standard Retrieval-Augmented Generation architectures fail when queries require multi-step reasoning, routing between vector semantic searches and relational SQL databases, or parallel sub-task execution.",
    solution: "Designed a multi-agent system using LangGraph for cyclic agent routing, integrated Elasticsearch for hybrid dense-sparse vector search, and enabled SQL agent toolkits to perform direct semantic analytics.",
    metrics: {
      "Response Latency": "Sub-1.2 seconds",
      "Agent Flow Success": "94.2% accuracy",
      "Search Support": "Vector & SQL",
      "Database": "Elasticsearch & Postgres"
    },
    linkUrl: "https://github.com/mainhatduy/deep-bot",
    linkLabel: "View Source Code"
  },
  'proj-3': {
    title: "Diffusion LM for Medical NER",
    icon: "lucide:scan-eye",
    techs: ["Diffusion LM", "SFT", "PyTorch", "Hugging Face", "DeBERTa"],
    description: "A specialized Discrete Diffusion Language Model for extracting nested medical entities in clinical Vietnamese texts.",
    problem: "Nested Named Entity Recognition is historically difficult for traditional sequence-labeling models because entities overlap (e.g. 'COVID-19 patient' contains both a disease and a person).",
    solution: "Fine-tuned a Dream 7B Diffusion Language Model using supervised sequence generation constraints on the Vietnamese COVID-19 Nested NER dataset to generate semantic spans iteratively.",
    metrics: {
      "Entity F1-Score": "79.04%",
      "Inference Steps": "50 (denoising)",
      "Dataset": "COVID-19 Nested NER",
      "Base Embeddings": "DeBERTa-v3"
    },
    linkUrl: "https://huggingface.co/myduy/diffusion-medical-ner",
    linkLabel: "Visit Model Page"
  },
  'proj-4': {
    title: "Discrete Diffusion Translation",
    icon: "lucide:languages",
    techs: ["PyTorch", "XLM-RoBERTa", "Discrete Diffusion", "NLP", "Machine Translation"],
    description: "Discrete Diffusion sequence model specialized in English-to-Vietnamese machine translation.",
    problem: "Autoregressive translation models can suffer from error propagation and high inference latency for long sentences, while non-autoregressive models struggle with grammatical coherence.",
    solution: "Trained a Reparameterized Discrete Diffusion Model starting from pretrained XLM-RoBERTa Large. The model generates translations by iteratively denoising discrete text tokens in parallel.",
    metrics: {
      "BLEU Score": "37.9 En-Vi",
      "Denoising Steps": "20 steps",
      "Base Model": "XLM-RoBERTa Large",
      "Vocabulary Size": "250,002 tokens"
    },
    linkUrl: "https://huggingface.co/myduy/dlm-vi2en",
    linkLabel: "Visit Model Page"
  }
};

// --- Journey Milestones Database ---
const MILESTONES_DATA = {
  'root': {
    title: "Start of Journey",
    subtitle: "Enrolled at TDTU",
    duration: "Oct 2022",
    description: "Commenced Computer Science undergraduate studies at Ton Duc Thang University (TDTU). Focused on building a strong foundation in algorithms, programming, and mathematics.",
    icon: "lucide:flag",
    color: "blue"
  },
  'lab': {
    title: "TDTU NLP-KD Lab",
    subtitle: "Research Assistant",
    duration: "Jan 2025",
    description: "Joined the TDTU NLP-KD Lab. Conducted research on Deep Learning, Language Diffusion Models, and hardware acceleration optimization.",
    icon: "lucide:graduation-cap",
    color: "cyan"
  },
  'olympiad': {
    title: "Southern Region Student AI Olympiad 2025",
    subtitle: "Consolation Prize",
    duration: "May 2025",
    description: "Awarded the Consolation Prize in the Southern Region Student AI Olympiad 2025, demonstrating machine learning problem-solving under tight time constraints.",
    icon: "lucide:trophy",
    color: "cyan"
  },
  'lab_present': {
    title: "TDTU NLP-KD Lab",
    subtitle: "Research Assistant (Present)",
    duration: "Jan 2025 — Present",
    description: "Continuing research on Deep Learning, Language Diffusion Models, and hardware acceleration optimization at the TDTU NLP-KD Lab.",
    icon: "lucide:graduation-cap",
    color: "cyan"
  },
  'tdtu_present': {
    title: "Ton Duc Thang University",
    subtitle: "Final-Year Student",
    duration: "Oct 2022 — Present",
    description: "Completing undergraduate coursework in Computer Science at TDTU. Researching Large Language Model (LLM) optimization and text generation techniques.",
    icon: "lucide:graduation-cap",
    color: "blue"
  },
  'quaveo_start': {
    title: "Start of Internship at QUAVEO",
    subtitle: "AI Engineer Intern",
    duration: "Feb 2026",
    description: "Joined QUAVEO as an AI Engineer Intern, gaining hands-on experience in enterprise AI product development.",
    icon: "lucide:briefcase",
    color: "red"
  },
  'quaveo_present': {
    title: "AI Engineer Intern at QUAVEO",
    subtitle: "Present",
    duration: "Feb 2026 — Present",
    description: "Researching and developing advanced AI solutions, optimizing Natural Language Processing (NLP) applications, building Multi-Agent systems, and deploying LLMs at QUAVEO.",
    icon: "lucide:briefcase",
    color: "red"
  }
};

function selectMilestone(id) {
  const data = MILESTONES_DATA[id];
  if (!data) return;

  // Update card content
  document.getElementById('journey-title').textContent = data.title;
  document.getElementById('journey-subtitle').textContent = data.subtitle;
  document.getElementById('journey-duration').textContent = data.duration;
  document.getElementById('journey-description').textContent = data.description;
  
  const iconEl = document.getElementById('journey-icon');
  iconEl.setAttribute('icon', data.icon);
  
  // Set border color and background dynamically
  const cardBorder = document.getElementById('journey-detail-card');
  const iconContainer = iconEl.parentElement;
  
  let themeColorClass = '';
  let iconColorClass = '';
  
  if (data.color === 'neutral') {
    themeColorClass = 'border-l-neutral-400 dark:border-l-neutral-600';
    iconColorClass = 'bg-neutral-500/10 text-neutral-500';
  } else if (data.color === 'cyan') {
    themeColorClass = 'border-l-cyan-500';
    iconColorClass = 'bg-cyan-500/10 text-cyan-500';
  } else if (data.color === 'blue') {
    themeColorClass = 'border-l-blue-500';
    iconColorClass = 'bg-blue-500/10 text-blue-500';
  } else if (data.color === 'red') {
    themeColorClass = 'border-l-red-500';
    iconColorClass = 'bg-red-500/10 text-red-500';
  }
  
  cardBorder.className = `glass-card rounded-[20px] p-8 border-l-4 ${themeColorClass} transition-all duration-300 flex flex-col justify-between min-h-[220px]`;
  iconContainer.className = `w-8 h-8 rounded-lg ${iconColorClass} flex items-center justify-center`;

  // Trace path and nodes from root up to current node
  const pathTrace = {
    'root': {
      paths: ['path-root'],
      nodes: ['node-root']
    },
    'lab': {
      paths: ['path-root', 'path-lab-branch'],
      nodes: ['node-root', 'node-lab']
    },
    'olympiad': {
      paths: ['path-root', 'path-lab-branch', 'path-lab'],
      nodes: ['node-root', 'node-lab', 'node-olympiad']
    },
    'lab_present': {
      paths: ['path-root', 'path-lab-branch', 'path-lab', 'path-lab-present'],
      nodes: ['node-root', 'node-lab', 'node-olympiad', 'node-lab_present']
    },
    'tdtu_present': {
      paths: ['path-root', 'path-trunk-middle', 'path-tdtu_present'],
      nodes: ['node-root', 'node-tdtu_present']
    },
    'quaveo_start': {
      paths: ['path-root', 'path-trunk-middle', 'path-quaveo-branch'],
      nodes: ['node-root', 'node-quaveo_start']
    },
    'quaveo_present': {
      paths: ['path-root', 'path-trunk-middle', 'path-quaveo-branch', 'path-quaveo_present'],
      nodes: ['node-root', 'node-quaveo_start', 'node-quaveo_present']
    }
  };

  // Reset all paths and nodes
  document.querySelectorAll('.journey-path').forEach(p => {
    p.classList.remove('active');
  });
  document.querySelectorAll('.journey-node').forEach(n => {
    n.classList.remove('active');
    n.style.color = '';
  });

  // Activate the trace paths and nodes
  const trace = pathTrace[id] || { paths: [], nodes: [] };
  
  trace.paths.forEach(pId => {
    const pEl = document.getElementById(pId);
    if (pEl) pEl.classList.add('active');
  });
  
  trace.nodes.forEach(nId => {
    const nEl = document.getElementById(nId);
    if (nEl) {
      nEl.classList.add('active');
      const nodeKey = nId.replace('node-', '');
      const milestone = MILESTONES_DATA[nodeKey];
      if (milestone) {
        if (milestone.color === 'neutral') nEl.style.color = '#9ca3af';
        else if (milestone.color === 'cyan') nEl.style.color = '#22d3ee';
        else if (milestone.color === 'blue') nEl.style.color = '#3b82f6';
        else if (milestone.color === 'red') nEl.style.color = '#ef4444';
      }
    }
  });
}

// --- Single-Page Navigation Switcher ---
function navigateTo(sectionId) {
  // Hide all sections
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.add('hidden');
    section.classList.remove('animate-slide-up');
  });

  // Show target
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.remove('hidden');
    // Trigger reflow to restart animation
    void target.offsetWidth;
    target.classList.add('animate-slide-up');
  }
  
  // Update Navigation Active styles
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-target') === sectionId) {
      link.classList.add('active');
    }
  });
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Dynamic Project Modal Renderer ---
function openProject(projectId) {
  navigateTo('proj-1'); // Uses #proj-1 as the reusable details section container
  
  const data = PROJECTS_DATA[projectId];
  if (!data) return;
  
  // Update Details Content
  document.getElementById('detail-title').textContent = data.title;
  document.getElementById('detail-icon').setAttribute('icon', data.icon);
  document.getElementById('detail-desc').textContent = data.description;
  document.getElementById('detail-problem').textContent = data.problem;
  document.getElementById('detail-solution').textContent = data.solution;
  
  // Render Tech Tags
  const techEl = document.getElementById('detail-tech');
  techEl.innerHTML = '';
  data.techs.forEach(tech => {
    const span = document.createElement('span');
    span.className = "px-3 py-1 text-[11px] font-medium border border-white/10 rounded-full text-neutral-300 bg-white/5";
    span.textContent = tech;
    techEl.appendChild(span);
  });
  
  // Render Metrics
  const metricsEl = document.getElementById('detail-metrics');
  metricsEl.innerHTML = '';
  Object.entries(data.metrics).forEach(([key, val]) => {
    const div = document.createElement('div');
    div.className = "flex items-end justify-between border-b border-white/5 pb-2";
    div.innerHTML = `
      <span class="text-sm text-neutral-500">${key}</span>
      <span class="font-mono text-sm text-white">${val}</span>
    `;
    metricsEl.appendChild(div);
  });
  
  // Update Action Button Link
  const linkEl = document.getElementById('detail-link');
  linkEl.setAttribute('href', data.linkUrl);
  linkEl.innerHTML = `
    <iconify-icon icon="lucide:external-link" width="14"></iconify-icon> ${data.linkLabel}
  `;
}

// --- Particle Background Network Animation ---
const canvas = document.getElementById('network-canvas');
let width, height;
let particles = [];

// Configuration
const CONFIG = {
  particleCount: 60,
  connectionDist: 180,
  speed: 0.3
};

function resize() {
  if (!canvas) return;
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  initParticles();
}

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * CONFIG.speed;
    this.vy = (Math.random() - 0.5) * CONFIG.speed;
    this.size = Math.random() * 1.5 + 0.5;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    
    // Bounce off walls
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }
  draw(ctx) {
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < CONFIG.particleCount; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, width, height);
  
  particles.forEach((p, index) => {
    p.update();
    p.draw(ctx);
    
    // Connections between particles
    for (let j = index + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const dx = p.x - p2.x;
      const dy = p.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < CONFIG.connectionDist) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${0.15 - (dist / CONFIG.connectionDist) * 0.15})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(animate);
}

// --- Custom Element Implementation for block-enterprise ---
class BlockEnterprise extends HTMLElement {
  constructor() {
    super();
    this.time = 0;
    this.siteSettingsMotionChange = this.siteSettingsMotionChange.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.stopped = false;
  }

  connectedCallback() {
    document.addEventListener('site_settings_motion', this.siteSettingsMotionChange, false);
    window.addEventListener('resize', this.handleResize, { passive: true });
    window.addEventListener('orientationchange', this.handleResize);

    this.style.position = 'relative';

    this.$slides = this.querySelectorAll('[data-slide]');
    this.$slides.forEach(e => {
      e.style.position = 'absolute';
      e.style.top = '0';
      e.style.left = '0';
      e.style.transformOrigin = '50% 50%';
    });

    // Initialize SVG elements for lines & masking
    this.$svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.$svg.style.position = 'absolute';
    this.$svg.style.top = '0';
    this.$svg.style.left = '0';
    this.$svg.style.width = '100%';
    this.$svg.style.height = '100%';
    this.$svg.style.pointerEvents = 'none';
    this.$svg.style.zIndex = '0';
    this.$svg.style.overflow = 'visible';

    this.$lines = [];
    this.$maskRects = [];
    this.$defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    this.$mask = document.createElementNS('http://www.w3.org/2000/svg', 'mask');

    const maskId = `block-enterprise-mask-${Math.round(Math.random() * 1e6)}`;
    this.$mask.setAttribute('id', maskId);
    this.$mask.setAttribute('maskUnits', 'userSpaceOnUse');
    this.$mask.setAttribute('x', '0');
    this.$mask.setAttribute('y', '0');
    this.$mask.setAttribute('width', '100%');
    this.$mask.setAttribute('height', '100%');

    this.$maskBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    this.$maskBg.setAttribute('x', '0');
    this.$maskBg.setAttribute('y', '0');
    this.$maskBg.setAttribute('width', '100%');
    this.$maskBg.setAttribute('height', '100%');
    this.$maskBg.setAttribute('fill', 'white');

    this.$mask.appendChild(this.$maskBg);
    this.$defs.appendChild(this.$mask);
    this.$svg.appendChild(this.$defs);

    this.$linesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.$linesGroup.setAttribute('mask', `url(#${maskId})`);
    this.$svg.appendChild(this.$linesGroup);

    this.$slides.forEach(() => {
      let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('stroke', 'currentColor');
      line.setAttribute('stroke-width', '1');
      line.setAttribute('stroke-linecap', 'round');
      line.setAttribute('vector-effect', 'non-scaling-stroke');

      let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('fill', 'black');
      rect.setAttribute('rx', '6');
      rect.setAttribute('ry', '6');

      this.$linesGroup.appendChild(line);
      this.$mask.appendChild(rect);
      this.$lines.push(line);
      this.$maskRects.push(rect);
    });

    this.prepend(this.$svg);
    this.resize();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        this.resize();
        requestAnimationFrame(() => this.resize());
      });
    }

    this._isConnected = true;
    this.startUpdateLoop();
  }

  disconnectedCallback() {
    this._isConnected = false;
    document.removeEventListener('site_settings_motion', this.siteSettingsMotionChange);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('orientationchange', this.handleResize);
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
    }
  }

  siteSettingsMotionChange(e) {
    this.stopped = e.detail === 'off';
  }

  handleResize() {
    this.resize();
  }

  resize() {
    this._width = this.clientWidth || 1;
    this._height = this.clientHeight || 1;
    if (this.$svg) {
      this.$svg.setAttribute('width', this._width);
      this.$svg.setAttribute('height', this._height);
      this.$svg.setAttribute('viewBox', `0 0 ${this._width} ${this._height}`);
    }
    if (this.$mask) {
      this.$mask.setAttribute('width', this._width);
      this.$mask.setAttribute('height', this._height);
    }
    if (this.$maskBg) {
      this.$maskBg.setAttribute('width', this._width);
      this.$maskBg.setAttribute('height', this._height);
    }
    this.$slides.forEach(e => {
      e._width = e.clientWidth;
      e._height = e.clientHeight;
    });
  }

  startUpdateLoop() {
    const tick = () => {
      if (!this._isConnected) return;
      this.update();
      this._rafId = requestAnimationFrame(tick);
    };
    this._rafId = requestAnimationFrame(tick);
  }

  update() {
    if (!this.stopped) {
      this.time += 0.007; // Control speed
    }
    let step = (Math.PI * 2) / this.$slides.length;
    let t = 0, n = 0;
    this.$slides.forEach(e => {
      t = Math.max(e._width || 0, t);
      n = Math.max(e._height || 0, n);
    });
    
    let r = Math.min(this._width / 2 - t / 2, this._height / 2 - n / 2);
    let i = r;
    let a = this._width / 2;
    let o = this._height / 2;
    let s = Math.sin(this.time * 0.7) * 0.9;
    let c = Math.cos(this.time * 0.5) * 0.9;
    let l = this.time * 0.8;

    this.$slides.forEach((slide, idx) => {
      let u = idx * step;
      let d = Math.cos(u) * i;
      let f = Math.sin(u) * r;
      let p = Math.cos(l);
      let m = Math.sin(l);
      let h = d * p - f * m;
      let g = d * m + f * p;
      let cosS = Math.cos(s);
      let sinS = Math.sin(s);
      let y = h;
      let b = g * cosS;
      let x = g * sinS;
      let cosC = Math.cos(c);
      let sinC = Math.sin(c);
      let w = y * cosC + x * sinC;
      let T = b;
      let E = ((-y * sinC + x * cosC) / r + 1) / 2;
      let D = w * (1.15 + E * 0.45);
      let O = 0.7 + E * 0.55;
      let opacityValue = 0.6 + E * 0.4;
      let A = a + D;
      let j = o + T;
      let M = A - (slide._width || 0) / 2;
      let ee = j - (slide._height || 0) / 2;

      slide.style.transform = `translate(${M}px, ${ee}px) scale(${O}) translateZ(0)`;
      slide.style.opacity = opacityValue;
      slide.style.zIndex = Math.round(E * 1e3) + 2;

      let te = this.$lines[idx];
      let ne = this.$maskRects[idx];
      if (te && ne) {
        let offsetLimit = window.innerWidth < 600 ? 45 : 65; // inner core offset
        let paddingX = window.innerWidth < 600 ? 4 : 10;
        let paddingY = window.innerWidth < 600 ? 4 : 6;
        let diffX = A - a;
        let diffY = j - o;
        let dist = Math.sqrt(diffX * diffX + diffY * diffY) || 1;
        let dirX = diffX / dist;
        let dirY = diffY / dist;
        let x1 = a + dirX * offsetLimit;
        let y1 = o + dirY * offsetLimit;

        te.setAttribute('x1', x1);
        te.setAttribute('y1', y1);
        te.setAttribute('x2', A);
        te.setAttribute('y2', j);
        te.setAttribute('opacity', 0.15 + E * 0.45);

        let widthVal = (slide._width || 0) * O + paddingX * 2;
        let heightVal = (slide._height || 0) * O + paddingY * 2;
        ne.setAttribute('x', A - widthVal / 2);
        ne.setAttribute('y', j - heightVal / 2);
        ne.setAttribute('width', widthVal);
        ne.setAttribute('height', heightVal);
        ne.setAttribute('opacity', '1');
      }
    });
  }
}

customElements.define('block-enterprise', BlockEnterprise);

// --- Initialize Event Listeners ---
window.addEventListener('resize', resize);

document.addEventListener('DOMContentLoaded', () => {
  // Show default section
  navigateTo('home');
  // Initialize default milestone in Journey
  selectMilestone('quaveo_present');
  resize();
  animate();
});
