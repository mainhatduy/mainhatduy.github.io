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

// --- Initialize Event Listeners ---
window.addEventListener('resize', resize);

document.addEventListener('DOMContentLoaded', () => {
  // Show default section
  navigateTo('home');
  resize();
  animate();
});
