// ==========================================================================
// AI Engineer Portfolio - Main Application Controller
// ==========================================================================

// --- Journey Git Tree Globals & Setup ---
const branchMeta = {
  'main': { index: 0, color: '#3b82f6', label: 'main' },
  'nlp-lab': { index: 1, color: '#06b6d4', label: 'research/nlp-lab' },
  'quaveo': { index: 2, color: '#ef4444', label: 'work/quaveo' }
};

let activeCommits = [];
let currentSelectedId = 'present';

// --- Journey Milestone Selector ---
function selectMilestone(id) {
  const commit = MILESTONES_DATA.find(c => c.id === id);
  if (!commit) return;

  currentSelectedId = id;

  // Update card content
  document.getElementById('journey-title').textContent = commit.title;
  document.getElementById('journey-duration').textContent = commit.duration;
  document.getElementById('journey-description').textContent = commit.description;
  
  // Update git-specific inspector fields
  document.getElementById('inspect-hash').textContent = `commit ${commit.hash}`;
  document.getElementById('inspect-author').textContent = commit.author;
  
  // Update branch tag
  const branchTag = document.getElementById('inspect-branch-tag');
  branchTag.textContent = branchMeta[commit.branch].label;
  
  // Tag styling based on branch color
  let colorClass = '';
  let borderClass = '';
  if (commit.branch === 'main') {
    colorClass = 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    borderClass = 'border-l-blue-500';
  } else if (commit.branch === 'nlp-lab') {
    colorClass = 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20';
    borderClass = 'border-l-cyan-500';
  } else if (commit.branch === 'quaveo') {
    colorClass = 'bg-red-500/10 text-red-500 border-red-500/20';
    borderClass = 'border-l-red-500';
  }
  branchTag.className = `px-2 py-0.5 rounded text-[10px] uppercase font-bold font-mono tracking-wider border ${colorClass}`;
  
  // Set card left border color dynamically
  const cardBorder = document.getElementById('journey-detail-card');
  cardBorder.className = `glass-card rounded-[20px] p-6 border-l-4 ${borderClass} transition-all duration-300 flex flex-col justify-between min-h-[220px]`;

  // Update changeset stats
  document.getElementById('inspect-changes-stat').textContent = commit.changes.stat;
  
  // Update files list
  const filesContainer = document.getElementById('inspect-files');
  filesContainer.innerHTML = '';
  commit.changes.files.forEach(file => {
    const li = document.createElement('li');
    li.className = 'flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 truncate hover:text-indigo-500 transition-colors cursor-default';
    li.innerHTML = `
      <iconify-icon icon="lucide:file-code" width="14" class="text-neutral-400"></iconify-icon>
      <span>${file}</span>
    `;
    filesContainer.appendChild(li);
  });

  // Highlight active row in UI
  document.querySelectorAll('.commit-row-item').forEach(row => {
    row.classList.remove('bg-indigo-50/50', 'dark:bg-[#2a2d2e]/80', 'border-l-2', 'border-l-indigo-500');
    if (row.getAttribute('data-id') === id) {
      row.classList.add('bg-indigo-50/50', 'dark:bg-[#2a2d2e]/80', 'border-l-2', 'border-l-indigo-500');
    }
  });

  // Redraw SVG connections since selection has changed
  drawGitGraph();
}

// --- Initialize Git Tree Log ---
function initGitTree() {
  activeCommits = [...MILESTONES_DATA];
  currentSelectedId = 'present';
  const filterSelect = document.getElementById('branch-filter');
  if (filterSelect) filterSelect.value = 'all';
  const commitCounter = document.getElementById('commit-counter');
  if (commitCounter) commitCounter.innerText = `Showing ${activeCommits.length} commits`;
  renderTableRows();
  selectMilestone(currentSelectedId);
}

// --- Filter Branch ---
function filterBranch() {
  const val = document.getElementById('branch-filter').value;
  if (val === 'all') {
    activeCommits = [...MILESTONES_DATA];
  } else {
    activeCommits = MILESTONES_DATA.filter(c => c.branch === 'main' || c.branch === val);
  }
  
  if (!activeCommits.find(c => c.id === currentSelectedId) && activeCommits.length > 0) {
    currentSelectedId = activeCommits[0].id;
  }

  const commitCounter = document.getElementById('commit-counter');
  if (commitCounter) commitCounter.innerText = `Showing ${activeCommits.length} commits`;
  renderTableRows();
  selectMilestone(currentSelectedId);
}

// --- Render Table Rows dynamically ---
function renderTableRows() {
  const tbody = document.getElementById('git-commits-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  activeCommits.forEach((commit) => {
    const tr = document.createElement('tr');
    tr.className = `cursor-pointer transition-colors border-b border-neutral-100 dark:border-neutral-800/50 hover:bg-neutral-50 dark:hover:bg-[#2a2d2e]/80 h-[56px] commit-row-item ${commit.id === currentSelectedId ? 'bg-indigo-50/50 dark:bg-[#2a2d2e]/80 border-l-2 border-l-indigo-500' : ''}`;
    tr.setAttribute('onclick', `selectMilestone('${commit.id}')`);
    tr.setAttribute('data-id', commit.id);

    let tagsMarkup = '';
    if (commit.tags && commit.tags.length > 0) {
      commit.tags.forEach(tag => {
        let badgeStyle = 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300';
        if (tag.includes('HEAD')) {
          badgeStyle = 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-900/60';
        } else if (tag.includes('upstream') || tag === 'TDTU') {
          badgeStyle = 'bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-900/60';
        } else if (tag.includes('milestone')) {
          badgeStyle = 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-900/60';
        } else if (tag === 'NLP Lab') {
          badgeStyle = 'bg-cyan-100 text-cyan-800 border border-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-400 dark:border-cyan-900/60';
        } else if (tag === 'QUAVEO') {
          badgeStyle = 'bg-red-100 text-red-800 border border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-900/60';
        }
        tagsMarkup += `
          <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide ${badgeStyle} mr-1.5">
            <iconify-icon icon="lucide:tag" width="10" class="inline-block align-middle mr-0.5"></iconify-icon>
            ${tag}
          </span>
        `;
      });
    }

    tr.innerHTML = `
      <td class="px-4 py-2 graph-column" data-branch="${commit.branch}">
        <!-- Placeholder spacer for the absolute SVG canvas -->
      </td>
      <td class="px-4 py-2 text-neutral-900 dark:text-neutral-100 font-medium">
        <div class="flex flex-col">
          <span class="truncate max-w-[320px] md:max-w-md block font-semibold">${commit.title}</span>
          <div class="flex items-center gap-1 mt-0.5">
            ${tagsMarkup}
            <span class="text-[10px] text-neutral-400 dark:text-neutral-500 truncate">${commit.subtitle || commit.description}</span>
          </div>
        </div>
      </td>
      <td class="px-4 py-2 text-neutral-500 dark:text-neutral-400 text-xs">
        ${commit.duration}
      </td>
      <td class="px-4 py-2 text-neutral-500 dark:text-neutral-400 text-xs truncate max-w-[120px]">
        ${commit.author.split(' <')[0]}
      </td>
      <td class="px-4 py-2 text-right text-xs font-mono text-neutral-400 dark:text-neutral-500">
        ${commit.hash}
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Draw SVG connections after elements are painted to layout
  setTimeout(drawGitGraph, 50);
}

// --- Draw Git Graph Connections ---
function drawGitGraph() {
  const canvas = document.getElementById('git-svg-canvas');
  if (!canvas) return;
  canvas.innerHTML = ''; // Clean previous drawings

  const rows = document.querySelectorAll('.commit-row-item');
  if (rows.length === 0) return;

  const rowHeight = 56; // Matching h-[56px] set in rows
  const colWidth = 24;  // Width between branch tracks
  const startX = 30;    // Padding from left

  // Define branch coordinates (startX is for main track)
  let branchDraws = {
    'main': { color: branchMeta['main'].color, x: startX, points: [] },
    'nlp-lab': { color: branchMeta['nlp-lab'].color, x: startX + colWidth, points: [] },
    'quaveo': { color: branchMeta['quaveo'].color, x: startX + colWidth * 2, points: [] }
  };

  // Loop 1: Find vertical y locations of each commit based on visual position
  activeCommits.forEach((commit, i) => {
    const y = (i * rowHeight) + (rowHeight / 2);
    commit.yCoord = y;
    commit.xCoord = branchDraws[commit.branch].x;
  });

  const totalRows = activeCommits.length;

  // Main vertical track (always exists from top visible commit down to bottom visible commit)
  const mainLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const mainYStart = activeCommits[0].yCoord;
  const mainYEnd = activeCommits[totalRows - 1].yCoord;
  mainLine.setAttribute('d', `M ${startX} ${mainYStart} L ${startX} ${mainYEnd}`);
  mainLine.setAttribute('stroke', branchMeta['main'].color);
  mainLine.setAttribute('stroke-width', '2.5');
  mainLine.setAttribute('fill', 'none');
  canvas.appendChild(mainLine);

  // Calculate other branch lines
  // NLP LAB Branch Cyan (#06b6d4)
  const nlpCommits = activeCommits.filter(c => c.branch === 'nlp-lab');
  if (nlpCommits.length > 0) {
    const nlpYEnd = nlpCommits[nlpCommits.length - 1].yCoord;
    let nlpYStart = nlpCommits[0].yCoord;

    // If there is a present commit at index 0, non-main branches run parallel up to Row 1
    if (activeCommits[0].id === 'present') {
      nlpYStart = activeCommits[0].yCoord;
    }

    // Vertical line
    const nlpLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    nlpLine.setAttribute('d', `M ${startX + colWidth} ${nlpYStart} L ${startX + colWidth} ${nlpYEnd}`);
    nlpLine.setAttribute('stroke', branchMeta['nlp-lab'].color);
    nlpLine.setAttribute('stroke-width', '2.5');
    nlpLine.setAttribute('fill', 'none');
    canvas.appendChild(nlpLine);

    // Draw curve split down to main
    const forkFromMain = activeCommits.find(c => c.isForkPoint === 'nlp-lab');
    if (forkFromMain) {
      const curve = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const xStart = startX;
      const yStart = forkFromMain.yCoord;
      const xEnd = startX + colWidth;
      const yEnd = nlpYEnd; // connects bottom of research branch to fork main row
      
      const d = `M ${xStart} ${yStart} C ${xStart} ${(yStart + yEnd)/2}, ${xEnd} ${(yStart + yEnd)/2}, ${xEnd} ${yEnd}`;
      curve.setAttribute('d', d);
      curve.setAttribute('stroke', branchMeta['nlp-lab'].color);
      curve.setAttribute('stroke-width', '2.5');
      curve.setAttribute('fill', 'none');
      canvas.appendChild(curve);
    }
  }

  // QUAVEO Branch Red (#ef4444)
  const quaveoCommits = activeCommits.filter(c => c.branch === 'quaveo');
  if (quaveoCommits.length > 0) {
    const qYEnd = quaveoCommits[quaveoCommits.length - 1].yCoord;
    let qYStart = quaveoCommits[0].yCoord;

    // If there is a present commit at index 0, non-main branches run parallel up to Row 1
    if (activeCommits[0].id === 'present') {
      qYStart = activeCommits[0].yCoord;
    }

    // Vertical line
    const qLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    qLine.setAttribute('d', `M ${startX + colWidth * 2} ${qYStart} L ${startX + colWidth * 2} ${qYEnd}`);
    qLine.setAttribute('stroke', branchMeta['quaveo'].color);
    qLine.setAttribute('stroke-width', '2.5');
    qLine.setAttribute('fill', 'none');
    canvas.appendChild(qLine);

    // Draw curve split down to main
    const forkFromMain = activeCommits.find(c => c.isForkPoint === 'quaveo');
    if (forkFromMain) {
      const curve = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const xStart = startX;
      const yStart = forkFromMain.yCoord;
      const xEnd = startX + colWidth * 2;
      const yEnd = qYEnd; // connects bottom of work branch to fork main row
      
      const d = `M ${xStart} ${yStart} C ${xStart} ${(yStart + yEnd)/2}, ${xEnd} ${(yStart + yEnd)/2}, ${xEnd} ${yEnd}`;
      curve.setAttribute('d', d);
      curve.setAttribute('stroke', branchMeta['quaveo'].color);
      curve.setAttribute('stroke-width', '2.5');
      curve.setAttribute('fill', 'none');
      canvas.appendChild(curve);
    }
  }

  // Loop 3: Draw Circles at individual node positions
  activeCommits.forEach((commit) => {
    if (commit.id === 'present') {
      const branchesToDraw = ['main'];
      if (activeCommits.some(c => c.branch === 'nlp-lab')) branchesToDraw.push('nlp-lab');
      if (activeCommits.some(c => c.branch === 'quaveo')) branchesToDraw.push('quaveo');

      branchesToDraw.forEach(br => {
        let cxVal = startX;
        if (br === 'nlp-lab') cxVal = startX + colWidth;
        else if (br === 'quaveo') cxVal = startX + colWidth * 2;

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', cxVal);
        circle.setAttribute('cy', commit.yCoord);
        circle.setAttribute('r', commit.id === currentSelectedId ? '6.5' : '5');
        circle.setAttribute('fill', commit.id === currentSelectedId ? '#ffffff' : branchMeta[br].color);
        circle.setAttribute('stroke', commit.id === currentSelectedId ? branchMeta[br].color : '#ffffff');
        circle.setAttribute('stroke-width', '2.5');
        circle.setAttribute('class', 'transition-all duration-300');
        canvas.appendChild(circle);

        if (commit.id === currentSelectedId) {
          const outerRing = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          outerRing.setAttribute('cx', cxVal);
          outerRing.setAttribute('cy', commit.yCoord);
          outerRing.setAttribute('r', '11');
          outerRing.setAttribute('fill', 'none');
          outerRing.setAttribute('stroke', branchMeta[br].color);
          outerRing.setAttribute('stroke-width', '1.5');
          outerRing.setAttribute('stroke-opacity', '0.4');
          canvas.appendChild(outerRing);
        }
      });
    } else {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', commit.xCoord);
      circle.setAttribute('cy', commit.yCoord);
      circle.setAttribute('r', commit.id === currentSelectedId ? '6.5' : '5');
      circle.setAttribute('fill', commit.id === currentSelectedId ? '#ffffff' : branchMeta[commit.branch].color);
      circle.setAttribute('stroke', commit.id === currentSelectedId ? branchMeta[commit.branch].color : '#ffffff');
      circle.setAttribute('stroke-width', '2.5');
      circle.setAttribute('class', 'transition-all duration-300');
      canvas.appendChild(circle);

      // Selected outer glowing ring
      if (commit.id === currentSelectedId) {
        const outerRing = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        outerRing.setAttribute('cx', commit.xCoord);
        outerRing.setAttribute('cy', commit.yCoord);
        outerRing.setAttribute('r', '11');
        outerRing.setAttribute('fill', 'none');
        outerRing.setAttribute('stroke', branchMeta[commit.branch].color);
        outerRing.setAttribute('stroke-width', '1.5');
        outerRing.setAttribute('stroke-opacity', '0.4');
        canvas.appendChild(outerRing);
      }
    }
  });
}

// --- Create New Commit ---
function createNewCommit(e) {
  e.preventDefault();

  const branch = document.getElementById('form-branch').value;
  const title = document.getElementById('form-title').value;
  const date = document.getElementById('form-date').value;
  const desc = document.getElementById('form-desc').value;

  // Generate mock metadata hashes
  const randomHash = Math.random().toString(36).substring(2, 10);
  const id = 'custom_' + Date.now();

  const newCommitObj = {
    id: id,
    branch: branch,
    title: title,
    subtitle: 'Local Milestone',
    description: desc,
    duration: date,
    author: 'Mai Nhat Duy <maiduy07102003@gmail.com>',
    hash: randomHash,
    tags: [`local/${branch}-patch`],
    changes: {
      stat: `+${Math.floor(Math.random() * 150) + 10} -${Math.floor(Math.random() * 40)} lines`,
      files: ['src/main.py', 'docs/milestone.md']
    }
  };

  // Uncheck old master heads of this specific branch
  MILESTONES_DATA.forEach(c => {
    if (c.branch === branch && c.isHead) {
      c.isHead = false;
      c.tags = c.tags.filter(t => !t.includes('HEAD'));
    }
  });

  // Insert new commit on TOP
  MILESTONES_DATA.unshift(newCommitObj);

  // Reset inputs
  document.getElementById('form-title').value = '';
  document.getElementById('form-date').value = '';
  document.getElementById('form-desc').value = '';

  // Update filters and reload Graph view
  currentSelectedId = id;
  filterBranch();
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
  initGitTree();
  
  // Call particles animation resize and animate
  if (typeof resizeParticles === 'function') {
    resizeParticles();
  }
  if (typeof animateParticles === 'function') {
    animateParticles();
  }

  // Handle Responsive Resize Redraws for Git Tree Graph
  window.addEventListener('resize', () => {
    drawGitGraph();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadComponents();
});
