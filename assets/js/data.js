// ==========================================================================
// AI Engineer Portfolio - Projects and Journey Milestones Data
// ==========================================================================

// --- Projects Database ---
const PROJECTS_DATA = {
  'proj-1': {
    title: "Enhancing AMR Parsing in LLMs",
    tagline: "2-stage framework combining CoT synthesis, SFT, and RLVR (GRPO & DAPO) achieving SOTA 82.88% Smatch F1",
    category: "llm",
    categoryLabel: "Reasoning / RLVR",
    badgeColor: "bg-neutral-100 text-neutral-700 border border-neutral-200",
    icon: "lucide:git-graph",
    techs: ["PyTorch", "CoT", "SFT", "GRPO", "DAPO", "RLVR", "Unsloth"],
    description: "A 2-stage reasoning & Reinforcement Learning with Verifiable Rewards (RLVR) framework for Abstract Meaning Representation (AMR) graph parsing in Large Language Models.",
    problem: "Abstract Meaning Representation (AMR) parsing requires LLMs to output intricate graph structures. Standard SFT models struggle with semantic graph alignment and structural validity without specialized verifiable feedback.",
    solution: "Synthesized Chain-of-Thought (CoT) reasoning paths, performed Supervised Fine-Tuning (SFT), and applied Reinforcement Learning with Verifiable Rewards (RLVR) using GRPO and DAPO with custom dual reward functions (Format & Accuracy).",
    metrics: {
      "SOTA Smatch F1": "82.88% F1",
      "Benchmark": "AMR 3.0",
      "Baseline": "Outperformed SPRING",
      "RL Optimization": "GRPO & DAPO"
    },
    highlightMetric: "SOTA 82.88% Smatch F1",
    linkUrl: "https://huggingface.co/viamr-project",
    linkLabel: "View HF Model Collection",
    pdfUrl: "/KLTN.pdf",
    pdfLabel: "Read Thesis (KLTN.pdf)"
  },
  'proj-2': {
    title: "Vietnamese Medical SLM",
    tagline: "Fine-tuned 1.7B–4B Small Language Models for healthcare edge systems",
    category: "llm",
    categoryLabel: "NLP / LLM",
    badgeColor: "bg-neutral-100 text-neutral-700 border border-neutral-200",
    icon: "lucide:brain-circuit",
    techs: ["PyTorch", "Transformers", "Unsloth", "DeepSpeed", "Datatrove", "Marker"],
    description: "Small Language Models (1.7B to 4B parameters) fine-tuned for specialized medical queries and Vietnamese healthcare environments.",
    problem: "Traditional Large Language Models are computationally expensive to run on localized hospital edge systems, and frequently hallucinate or fail when queried with Vietnamese clinical documentation or terminology.",
    solution: "Digitized physical medical documents using Marker, cleaned data at scale with Datatrove, and optimized SLM training on consumer-grade GPU instances using Unsloth (Continual Pre-training & SFT pipelines).",
    metrics: {
      "Evaluation Benchmark": "MedUC Benchmark",
      "Accuracy vs Base": "+4.5% Improvement",
      "Model Size": "1.7B - 4.0B Parameters",
      "Training Method": "CPT & SFT"
    },
    highlightMetric: "+4.5% Accuracy vs Base",
    linkUrl: "https://huggingface.co/collections/myduy/vietnamese-medical-language-models-68f73b22ffa29c05d321bf23",
    linkLabel: "View HF Collection Hub"
  },
  'proj-3': {
    title: "deep-bot: Agentic RAG",
    tagline: "LangGraph-routed multi-agent hybrid vector & SQL analytics chatbot",
    category: "agents",
    categoryLabel: "Agents / RAG",
    badgeColor: "bg-neutral-100 text-neutral-700 border border-neutral-200",
    icon: "lucide:bot",
    techs: ["LangGraph", "LangChain", "ElasticSearch", "PostgreSQL", "Python", "ADK"],
    description: "Enterprise agentic assistant utilizing graph-based multi-agent flows and hybrid search capabilities.",
    problem: "Standard Retrieval-Augmented Generation architectures fail when queries require multi-step reasoning, routing between vector semantic searches and relational SQL databases, or parallel sub-task execution.",
    solution: "Designed a multi-agent system using LangGraph for cyclic agent routing, integrated Elasticsearch for hybrid dense-sparse vector search, and enabled SQL agent toolkits to perform direct semantic analytics.",
    metrics: {
      "Response Latency": "< 1.2 Seconds",
      "Agent Flow Accuracy": "94.2% Success Rate",
      "Query Architecture": "Hybrid Vector & SQL",
      "Search Backend": "Elasticsearch & Postgres"
    },
    highlightMetric: "LangGraph Multi-Agent RAG",
    linkUrl: "https://github.com/mainhatduy/deep-bot",
    linkLabel: "View GitHub Source Code"
  },
  'proj-4': {
    title: "Diffusion LM for Medical NER",
    tagline: "Supervised discrete diffusion for nested entity extraction in clinical text",
    category: "diffusion",
    categoryLabel: "Diffusion / NER",
    badgeColor: "bg-neutral-100 text-neutral-700 border border-neutral-200",
    icon: "lucide:scan-eye",
    techs: ["Diffusion LM", "Dream 7B", "SFT", "PyTorch", "Hugging Face"],
    description: "A specialized Discrete Diffusion Language Model for extracting nested medical entities in clinical Vietnamese texts.",
    problem: "Nested Named Entity Recognition is historically difficult for traditional sequence-labeling models because entities overlap (e.g. 'COVID-19 patient' contains both a disease and a person).",
    solution: "Fine-tuned a Dream 7B Diffusion Language Model using supervised sequence generation constraints on the Vietnamese COVID-19 Nested NER dataset to generate semantic spans iteratively.",
    metrics: {
      "Entity F1-Score": "79.04% F1",
      "Denoising Steps": "50 Iterative Steps",
      "Target Dataset": "COVID-19 Nested NER",
      "Base Model": "Dream 7B Diffusion LM"
    },
    highlightMetric: "F1-Score of 79.04%",
    linkUrl: "https://huggingface.co/myduy/diffusion-medical-ner",
    linkLabel: "Visit Model Page"
  },
  'proj-5': {
    title: "Diffusion Speech Recognition",
    tagline: "Non-autoregressive speech transcription leveraging Discrete Diffusion LMs",
    category: "diffusion",
    categoryLabel: "Diffusion / ASR",
    badgeColor: "bg-neutral-100 text-neutral-700 border border-neutral-200",
    icon: "lucide:mic",
    techs: ["Diffusion LM", "ASR", "PyTorch", "Speech Processing", "Python"],
    description: "Applied Discrete Diffusion Language Models (Diffusion LM) to Automatic Speech Recognition (ASR) tasks.",
    problem: "Autoregressive speech recognition models face sequential generation bottlenecks and error propagation during long audio transcriptions.",
    solution: "Explored non-autoregressive text generation for audio transcription and speech processing using iterative discrete diffusion token generation.",
    metrics: {
      "Generation Mode": "Non-Autoregressive",
      "Target Task": "Automatic Speech Rec. (ASR)",
      "Model Family": "Discrete Diffusion LM",
      "Framework": "PyTorch & Transformers"
    },
    highlightMetric: "Diffusion ASR Pipeline",
    linkUrl: "https://github.com/mainhatduy/diffusion-speech-recognition",
    linkLabel: "View GitHub Project"
  }
};

// --- Journey Milestones Database ---
const MILESTONES_DATA = [
  {
    id: 'present',
    branch: 'main',
    title: 'Present Roles & Ongoing Activities',
    subtitle: 'Active Roles',
    duration: 'Present',
    description: 'Balancing multi-disciplinary roles: completing undergraduate studies in Computer Science at Ton Duc Thang University, conducting Deep Learning and AMR graph reasoning research at the TDTU NLP-KD Lab, and building AI applications as an AI Engineer at QUAVEO.',
    author: 'Mai Nhat Duy <maiduy07102003@gmail.com>',
    hash: '9a2b5c7d',
    isHead: true,
    tags: ['TDTU', 'NLP Lab', 'QUAVEO'],
    changes: {
      stat: '+920 -140 lines',
      files: [
        'academic/thesis_amr.py',
        'nlp/models/rlvr_grpo.py',
        'src/agent/adk_pipeline.py',
        'configs/gcp_deploy.json'
      ]
    },
    icon: 'lucide:briefcase',
    color: 'blue'
  },
  {
    id: 'quaveo_start',
    branch: 'quaveo',
    title: 'AI Engineer at QUAVEO',
    subtitle: 'AI Engineer',
    duration: 'Feb 2026 — Present',
    description: 'Working as an AI Engineer at QUAVEO, designing and implementing GCP and Agent Development Kit (ADK) enterprise AI workflows.',
    author: 'Mai Nhat Duy <maiduy07102003@gmail.com>',
    hash: '3691754b',
    tags: ['work/quaveo'],
    changes: { stat: '+340 -45 lines', files: ['adk_agent/core.py', 'scripts/gcp_deploy.sh', '.env.example'] },
    icon: 'lucide:briefcase',
    color: 'red'
  },
  {
    id: 'olympiad',
    branch: 'main',
    title: 'Southern Region Student AI Olympiad 2025',
    subtitle: 'Encouragement Award',
    duration: 'May 2025',
    description: 'Awarded the Encouragement Award in the Southern Vietnam Student Artificial Intelligence Olympiad 2025.',
    author: 'Mai Nhat Duy <maiduy07102003@gmail.com>',
    hash: '06ba6e56',
    isForkPoint: 'quaveo',
    tags: ['milestone/olympiad-2025'],
    changes: { stat: '+1,290 -310 lines', files: ['competition/solution.ipynb', 'models/backbone.py', 'assets/certificate.png'] },
    icon: 'lucide:trophy',
    color: 'green'
  },
  {
    id: 'lab',
    branch: 'nlp-lab',
    title: 'TDTU NLP-KD Lab',
    subtitle: 'Research Assistant',
    duration: 'Jan 2025',
    description: 'Joined the TDTU NLP-KD Lab. Conducted research on Deep Learning, AMR parsing via RLVR (GRPO/DAPO), and Discrete Diffusion Language Models.',
    author: 'Mai Nhat Duy <maiduy07102003@gmail.com>',
    hash: '7fbe3c8f',
    tags: ['research/nlp-lab'],
    changes: { stat: '+510 -90 lines', files: ['nlp/amr_parsing_cot.py', 'nlp/rlvr/reward_fn.py'] },
    icon: 'lucide:graduation-cap',
    color: 'green'
  },
  {
    id: 'root',
    branch: 'main',
    title: 'Start of Journey',
    subtitle: 'Enrolled at TDTU',
    duration: 'Oct 2022',
    description: 'Commenced Computer Science undergraduate studies at Ton Duc Thang University (TDTU). Focused on building a strong foundation in algorithms, programming, and mathematics.',
    author: 'Mai Nhat Duy <maiduy07102003@gmail.com>',
    hash: '57688c47',
    isForkPoint: 'nlp-lab',
    tags: ['root'],
    changes: { stat: '+25 -0 lines', files: ['.gitignore', 'LICENSE', 'README.md'] },
    icon: 'lucide:flag',
    color: 'blue'
  }
];

