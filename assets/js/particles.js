// ==========================================================================
// AI Engineer Portfolio - Particle Background Network Animation
// ==========================================================================

const canvas = document.getElementById('network-canvas');
let width, height;
let particles = [];

// Configuration
const CONFIG = {
  particleCount: 60,
  connectionDist: 180,
  speed: 0.3
};

function resizeParticles() {
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

function animateParticles() {
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
  requestAnimationFrame(animateParticles);
}

// Bind resize listener
window.addEventListener('resize', resizeParticles);
