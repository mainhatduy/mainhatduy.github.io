// ==========================================================================
// AI Engineer Portfolio - <block-enterprise> Custom Web Component
// ==========================================================================

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
