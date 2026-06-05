// ==========================================================================
// AI Engineer Portfolio - Main Application Controller
// ==========================================================================

// --- Journey Milestone Selector ---
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

  // Highlight active commit row
  document.querySelectorAll('.commit-row').forEach(row => {
    row.classList.remove('active-row');
  });
  const activeRows = document.querySelectorAll(`.commit-row[data-milestone="${id}"]`);
  activeRows.forEach(row => {
    row.classList.add('active-row');
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

// --- Component Loader ---
async function loadComponents() {
  const components = [
    { id: 'header-container', file: 'components/header.html' },
    { id: 'home-container', file: 'components/home.html' },
    { id: 'projects-container', file: 'components/projects.html' },
    { id: 'journey-container', file: 'components/journey.html' },
    { id: 'skills-container', file: 'components/skills.html' },
    { id: 'project-detail-container', file: 'components/project_detail.html' },
    { id: 'footer-container', file: 'components/footer.html' }
  ];

  try {
    const fetchPromises = components.map(async (comp) => {
      const response = await fetch(comp.file);
      if (!response.ok) throw new Error(`Failed to load ${comp.file}`);
      const text = await response.text();
      document.getElementById(comp.id).innerHTML = text;
    });

    await Promise.all(fetchPromises);
    
    // Initialize app after DOM is populated
    initializeApp();
  } catch (error) {
    console.error("Error loading components:", error);
  }
}

// --- Initialize App ---
function initializeApp() {
  navigateTo('home');
  selectMilestone('quaveo_present');
  
  // Call particles animation resize and animate
  if (typeof resizeParticles === 'function') {
    resizeParticles();
  }
  if (typeof animateParticles === 'function') {
    animateParticles();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadComponents();
});
