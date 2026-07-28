// ==========================================================================
// AI Engineer Portfolio - Main Application Controller
// ==========================================================================

// --- Journey Git Tree Globals & Setup ---
const branchMeta = {
  'main': { index: 0, color: '#3b82f6', label: 'main' },
  'nlp-lab': { index: 1, color: '#10b981', label: 'research/nlp-lab' },
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
  let branchUrl = '';
  if (commit.branch === 'main') branchUrl = 'https://itclass.tdtu.edu.vn/khmt2021tc01/';
  else if (commit.branch === 'nlp-lab') branchUrl = 'https://it.tdtu.edu.vn/nlplab';
  else if (commit.branch === 'quaveo') branchUrl = 'https://quaveo.ai/';
  
  if (branchUrl) {
    branchTag.innerHTML = `
      <a href="${branchUrl}" target="_blank" class="flex items-center gap-1 hover:underline">
        <iconify-icon icon="lucide:external-link" width="10"></iconify-icon>
        ${branchMeta[commit.branch].label}
      </a>
    `;
  } else {
    branchTag.textContent = branchMeta[commit.branch].label;
  }
  
  // Tag styling based on branch color
  let colorClass = '';
  let borderClass = '';
  if (commit.branch === 'main') {
    colorClass = 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    borderClass = 'border-l-blue-500';
  } else if (commit.branch === 'nlp-lab') {
    colorClass = 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    borderClass = 'border-l-emerald-500';
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
        } else if (tag === 'NLP Lab' || tag === 'research/nlp-lab') {
          badgeStyle = 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-900/60';
        } else if (tag === 'QUAVEO' || tag === 'work/quaveo') {
          badgeStyle = 'bg-red-100 text-red-800 border border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-900/60';
        }

        let url = '';
        if (tag === 'TDTU') url = 'https://itclass.tdtu.edu.vn/khmt2021tc01/';
        else if (tag === 'NLP Lab' || tag === 'research/nlp-lab') url = 'https://it.tdtu.edu.vn/nlplab';
        else if (tag === 'QUAVEO' || tag === 'work/quaveo') url = 'https://quaveo.ai/';

        if (url) {
          tagsMarkup += `
            <a href="${url}" target="_blank" onclick="event.stopPropagation();" class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide ${badgeStyle} mr-1.5 hover:scale-105 hover:opacity-90 active:scale-95 transition-all">
              <iconify-icon icon="lucide:link" width="10" class="inline-block align-middle mr-0.5"></iconify-icon>
              ${tag}
            </a>
          `;
        } else {
          tagsMarkup += `
            <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide ${badgeStyle} mr-1.5">
              <iconify-icon icon="lucide:tag" width="10" class="inline-block align-middle mr-0.5"></iconify-icon>
              ${tag}
            </span>
          `;
        }
      });
    }

    tr.innerHTML = `
      <td class="px-4 py-2 graph-column" data-branch="${commit.branch}" style="width: 180px; min-width: 180px; max-width: 180px;">
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
      <td class="px-4 py-2 text-neutral-500 dark:text-neutral-400 text-xs" style="width: 120px; min-width: 120px; max-width: 120px;">
        ${commit.duration}
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

  // Dynamically size SVG height to match the actual height of the table sibling
  const table = canvas.nextElementSibling;
  if (table) {
    canvas.setAttribute('height', table.offsetHeight);
    canvas.style.height = table.offsetHeight + 'px';
  }

  const colWidth = 24;  // Width between branch tracks
  const startX = 66;    // Padding from left to center lines in 180px column

  // Define branch coordinates (startX is for main track)
  let branchDraws = {
    'main': { color: branchMeta['main'].color, x: startX, points: [] },
    'nlp-lab': { color: branchMeta['nlp-lab'].color, x: startX + colWidth, points: [] },
    'quaveo': { color: branchMeta['quaveo'].color, x: startX + colWidth * 2, points: [] }
  };

  // Loop 1: Find vertical y locations of each commit based on visual position of table rows in the DOM
  activeCommits.forEach((commit, i) => {
    const rowEl = rows[i];
    let y = 0;
    if (rowEl) {
      y = rowEl.offsetTop + (rowEl.offsetHeight / 2);
    } else {
      const rowHeight = 56;
      y = (i * rowHeight) + (rowHeight / 2);
    }
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
  // NLP LAB Branch Green (#10b981)
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

// --- Single-Page Navigation Switcher & Routing ---
function getSectionFromURL() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const path = window.location.pathname.replace(/\/$/, '').split('/').pop();
  const searchParams = new URLSearchParams(window.location.search);
  const projectId = searchParams.get('id') || searchParams.get('project');

  if (projectId && typeof PROJECTS_DATA !== 'undefined' && PROJECTS_DATA[projectId]) {
    return { section: 'proj-1', projectId: projectId };
  }

  if (hash) {
    if (typeof PROJECTS_DATA !== 'undefined' && PROJECTS_DATA[hash]) {
      return { section: 'proj-1', projectId: hash };
    }
    if (['home', 'projects', 'journey', 'skills'].includes(hash)) {
      return { section: hash };
    }
  }

  if (['projects', 'journey', 'skills', 'home'].includes(path)) {
    return { section: path };
  }

  return { section: 'home' };
}

function navigateTo(sectionId, pushState = true) {
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

  if (sectionId === 'journey') {
    setTimeout(drawGitGraph, 50);
  }

  if (pushState) {
    let routePath = '/';
    if (sectionId === 'projects') routePath = '/projects';
    else if (sectionId === 'journey') routePath = '/journey';
    else if (sectionId === 'skills') routePath = '/skills';
    else if (sectionId === 'home') routePath = '/';

    if (window.location.protocol === 'file:') {
      routePath = sectionId === 'home' ? '#' : `#${sectionId}`;
    }

    if (window.location.pathname !== routePath && window.location.hash !== routePath) {
      try {
        window.history.pushState({ section: sectionId }, '', routePath);
      } catch (e) {
        window.history.pushState({ section: sectionId }, '', sectionId === 'home' ? '#' : `#${sectionId}`);
      }
    }
  }
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Category Filtering for Projects ---
function filterProjects(category) {
  // Update button active state
  document.querySelectorAll('.project-filter-btn').forEach(btn => {
    btn.classList.remove('active', 'bg-neutral-900', 'text-white', 'shadow-sm');
    btn.classList.add('text-neutral-600', 'hover:text-neutral-900');
    if (btn.getAttribute('data-project-filter') === category) {
      btn.classList.add('active', 'bg-neutral-900', 'text-white', 'shadow-sm');
      btn.classList.remove('text-neutral-600', 'hover:text-neutral-900');
    }
  });

  // Filter cards
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = '';
      card.classList.remove('hidden');
    } else {
      card.style.display = 'none';
      card.classList.add('hidden');
    }
  });
}

// --- Dynamic Project Modal Renderer ---
function openProject(projectId, pushState = true) {
  // Hide all sections
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.add('hidden');
    section.classList.remove('animate-slide-up');
  });

  const target = document.getElementById('proj-1'); // Uses #proj-1 as the reusable details section container
  if (target) {
    target.classList.remove('hidden');
    void target.offsetWidth;
    target.classList.add('animate-slide-up');
  }

  const data = PROJECTS_DATA[projectId];
  if (data) {
    // Update Details Content
    document.getElementById('detail-title').textContent = data.title;
    document.getElementById('detail-icon').setAttribute('icon', data.icon);
    document.getElementById('detail-desc').textContent = data.description;
    document.getElementById('detail-problem').textContent = data.problem;
    document.getElementById('detail-solution').textContent = data.solution;
    
    const taglineEl = document.getElementById('detail-tagline');
    if (taglineEl && data.tagline) {
      taglineEl.textContent = data.tagline;
    }

    // Render Tech Tags
    const techEl = document.getElementById('detail-tech');
    techEl.innerHTML = '';
    data.techs.forEach(tech => {
      const span = document.createElement('span');
      span.className = "px-3 py-1 text-xs font-mono font-medium rounded-lg text-neutral-800 bg-neutral-100 border border-neutral-200/80";
      span.textContent = tech;
      techEl.appendChild(span);
    });
    
    // Render Metrics
    const metricsEl = document.getElementById('detail-metrics');
    metricsEl.innerHTML = '';
    Object.entries(data.metrics).forEach(([key, val]) => {
      const div = document.createElement('div');
      div.className = "flex items-center justify-between border-b border-neutral-100 pb-2.5 pt-1 text-xs";
      div.innerHTML = `
        <span class="text-neutral-500 font-medium">${key}</span>
        <span class="font-mono font-semibold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded">${val}</span>
      `;
      metricsEl.appendChild(div);
    });
    
    // Update Action Button Link
    const linkEl = document.getElementById('detail-link');
    linkEl.setAttribute('href', data.linkUrl);
    linkEl.innerHTML = `
      <iconify-icon icon="lucide:external-link" width="14"></iconify-icon> ${data.linkLabel}
    `;

    // Render optional Thesis / Document PDF Link
    let pdfBtnEl = document.getElementById('detail-pdf-link');
    if (data.pdfUrl) {
      if (!pdfBtnEl) {
        pdfBtnEl = document.createElement('a');
        pdfBtnEl.id = 'detail-pdf-link';
        pdfBtnEl.target = '_blank';
        pdfBtnEl.className = "w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300/80 rounded-xl transition-all shadow-sm mt-2.5";
        linkEl.parentNode.appendChild(pdfBtnEl);
      }
      pdfBtnEl.style.display = 'inline-flex';
      pdfBtnEl.setAttribute('href', data.pdfUrl);
      pdfBtnEl.innerHTML = `<iconify-icon icon="lucide:file-text" width="14"></iconify-icon> ${data.pdfLabel || 'Read Thesis (PDF)'}`;
    } else if (pdfBtnEl) {
      pdfBtnEl.style.display = 'none';
    }
  }

  // Update navbar state to 'projects' for project detail
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-target') === 'projects') {
      link.classList.add('active');
    }
  });

  if (pushState) {
    let routePath = `/projects?id=${projectId}`;
    if (window.location.protocol === 'file:') {
      routePath = `#${projectId}`;
    }
    try {
      window.history.pushState({ section: 'proj-1', projectId: projectId }, '', routePath);
    } catch (e) {
      window.history.pushState({ section: 'proj-1', projectId: projectId }, '', `#${projectId}`);
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Listen for browser Back/Forward navigation buttons
window.addEventListener('popstate', (event) => {
  if (event.state && event.state.section) {
    if (event.state.section === 'proj-1' && event.state.projectId) {
      openProject(event.state.projectId, false);
    } else {
      navigateTo(event.state.section, false);
    }
  } else {
    const route = getSectionFromURL();
    if (route.section === 'proj-1' && route.projectId) {
      openProject(route.projectId, false);
    } else {
      navigateTo(route.section, false);
    }
  }
});

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
  const route = getSectionFromURL();
  if (route.section === 'proj-1' && route.projectId) {
    openProject(route.projectId, false);
  } else {
    navigateTo(route.section, false);
  }

  try {
    let initialPath = '/';
    if (route.section === 'projects') initialPath = '/projects';
    else if (route.section === 'journey') initialPath = '/journey';
    else if (route.section === 'skills') initialPath = '/skills';
    else if (route.section === 'proj-1') initialPath = `/projects?id=${route.projectId}`;

    if (window.location.protocol === 'file:') {
      initialPath = route.section === 'home' ? '#' : `#${route.section === 'proj-1' ? route.projectId : route.section}`;
    }

    window.history.replaceState({ section: route.section, projectId: route.projectId || null }, '', initialPath);
  } catch (e) {
    // Ignore on local restricted origin
  }

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
