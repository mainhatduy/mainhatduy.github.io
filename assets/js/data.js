// ==========================================================================
// AI Engineer Portfolio - Projects and Journey Milestones Data
// ==========================================================================

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
const MILESTONES_DATA = [
  {
    id: 'present',
    branch: 'main',
    title: 'Present Roles & Ongoing Activities',
    subtitle: 'Active Roles Across Academics, Research, and Industry',
    duration: 'Present',
    description: 'Balancing multi-disciplinary roles: completing undergraduate studies in Computer Science at Ton Duc Thang University, conducting Deep Learning and language diffusion research at the TDTU NLP-KD Lab, and building enterprise agentic workflows as an AI Engineer Intern at QUAVEO.',
    author: 'Mai Nhat Duy <maiduy07102003@gmail.com>',
    hash: '9a2b5c7d',
    isHead: true,
    tags: ['TDTU', 'NLP Lab', 'QUAVEO'],
    changes: {
      stat: '+865 -157 lines',
      files: [
        'academic/transcript.csv',
        'nlp/models/distilled_llama.py',
        'src/agent/pipeline.py',
        'configs/model.json'
      ]
    },
    icon: 'lucide:briefcase',
    color: 'blue'
  },
  {
    id: 'quaveo_start',
    branch: 'quaveo',
    title: 'Started Internship at QUAVEO',
    subtitle: 'AI Engineer Intern',
    duration: 'Feb 2026',
    description: 'Joined QUAVEO as an AI Engineer Intern, gaining hands-on experience in enterprise AI product development.',
    author: 'Mai Nhat Duy <maiduy07102003@gmail.com>',
    hash: '3691754b',
    tags: ['work/quaveo'],
    changes: { stat: '+115 -10 lines', files: ['README.md', 'scripts/onboard.sh', '.env.example'] },
    icon: 'lucide:briefcase',
    color: 'red'
  },
  {
    id: 'olympiad',
    branch: 'main',
    title: 'Southern Region Student AI Olympiad 2025',
    subtitle: 'Consolation Prize',
    duration: 'May 2025',
    description: 'Awarded the Consolation Prize in the Southern Region Student AI Olympiad 2025, demonstrating machine learning problem-solving under tight time constraints.',
    author: 'Mai Nhat Duy <maiduy07102003@gmail.com>',
    hash: '06ba6e56',
    isForkPoint: 'quaveo',
    tags: ['milestone/olympiad-2025'],
    changes: { stat: '+1,290 -310 lines', files: ['competition/solution.ipynb', 'models/backbone.py', 'assets/certificate.png'] },
    icon: 'lucide:trophy',
    color: 'cyan'
  },
  {
    id: 'lab',
    branch: 'nlp-lab',
    title: 'TDTU NLP-KD Lab',
    subtitle: 'Research Assistant',
    duration: 'Jan 2025',
    description: 'Joined the TDTU NLP-KD Lab. Conducted research on Deep Learning, Language Diffusion Models, and hardware acceleration optimization.',
    author: 'Mai Nhat Duy <maiduy07102003@gmail.com>',
    hash: '7fbe3c8f',
    tags: ['research/nlp-lab'],
    changes: { stat: '+210 -40 lines', files: ['nlp/classification_baseline.py', 'nlp/dataset/loader.py'] },
    icon: 'lucide:graduation-cap',
    color: 'cyan'
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
