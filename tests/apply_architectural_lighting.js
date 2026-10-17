const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(filePath, 'utf-8');

console.log('[index.html] Original length:', html.length);

// 1. Remove the 3 sets of loc-w_clouds
const cloudsRegex = /<div class="loc-w_clouds">[\s\S]*?<\/div><\/div><\/div><\/div><\/div>/g;
const matchCount = (html.match(cloudsRegex) || []).length;
console.log('Found loc-w_clouds occurrences:', matchCount);

// New Architectural Lighting Component HTML
const lightingHtml = `
      <!-- Architectural Lighting FX: Warm Golden Sunlight Rays & Subtle Dust Motes -->
      <div class="architectural-lighting-fx" aria-hidden="true">
        <div class="sunlight-atrium-glow"></div>
        <div class="volumetric-shafts">
          <div class="light-shaft shaft-1"></div>
          <div class="light-shaft shaft-2"></div>
          <div class="light-shaft shaft-3"></div>
          <div class="light-shaft shaft-4"></div>
        </div>
        <div class="architectural-surface-sheen"></div>
        <canvas id="goldenMotesCanvas" class="golden-motes-canvas"></canvas>
      </div>`;

// Replace the cloud block
html = html.replace(
  /<div class="loc-w_clouds">[\s\S]*?<\/div><\/div><\/div><\/div><\/div>\s*<div class="loc-w_clouds">[\s\S]*?<\/div><\/div><\/div><\/div><\/div>\s*<div class="loc-w_clouds">[\s\S]*?<\/div><\/div><\/div><\/div><\/div>/,
  lightingHtml
);

// 2. Also update image alt text from Costa del Sol to Narayanam Hotel Reception
html = html.replace(
  'alt="Coastal residential complex with pools, beachfront, roads, and distant mountains under clear blue sky."',
  'alt="Narayanam Hotel Reception and Front Desk with hospitable team and gold emblem counter."'
);

// 3. Remove .loc-w_clouds .marquee_list_item style
html = html.replace(/\.loc-w_clouds \.marquee_list_item:nth-child\(even\) \{[^}]*\}/g, '');

// 4. Add the Architectural Lighting CSS in <style>
const lightingCss = `
  /* Premium Architectural Lighting Effect */
  .architectural-lighting-fx {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 3;
    overflow: hidden;
  }

  /* Soft warm golden sunlight entering from upper atrium */
  .sunlight-atrium-glow {
    position: absolute;
    top: -5%;
    left: 5%;
    width: 90%;
    height: 52%;
    background: radial-gradient(
      ellipse 85% 65% at 50% 0%,
      rgba(255, 240, 210, 0.26) 0%,
      rgba(242, 214, 162, 0.14) 35%,
      rgba(224, 185, 120, 0.05) 65%,
      transparent 100%
    );
    mix-blend-mode: screen;
    pointer-events: none;
    animation: sunlightBreath 16s ease-in-out infinite alternate;
  }

  /* Subtle volumetric light shafts */
  .volumetric-shafts {
    position: absolute;
    top: -15%;
    left: 0;
    width: 100%;
    height: 110%;
    pointer-events: none;
    mix-blend-mode: screen;
    opacity: 0.9;
  }

  .light-shaft {
    position: absolute;
    top: -20%;
    height: 125%;
    transform-origin: top center;
    transform: rotate(-18deg);
    filter: blur(24px);
    pointer-events: none;
    border-radius: 50% 50% 0 0;
  }

  .shaft-1 {
    left: 12%;
    width: 18%;
    background: linear-gradient(180deg, rgba(255, 246, 225, 0.30) 0%, rgba(246, 220, 170, 0.14) 35%, rgba(225, 185, 120, 0.03) 68%, transparent 100%);
    animation: shaftDrift1 18s ease-in-out infinite alternate;
  }

  .shaft-2 {
    left: 35%;
    width: 24%;
    background: linear-gradient(180deg, rgba(255, 248, 230, 0.38) 0%, rgba(248, 225, 178, 0.18) 40%, rgba(230, 190, 125, 0.04) 72%, transparent 100%);
    animation: shaftDrift2 22s ease-in-out infinite alternate;
    animation-delay: -5s;
  }

  .shaft-3 {
    left: 63%;
    width: 19%;
    background: linear-gradient(180deg, rgba(255, 244, 218, 0.28) 0%, rgba(244, 215, 160, 0.12) 35%, rgba(220, 180, 115, 0.03) 68%, transparent 100%);
    animation: shaftDrift3 20s ease-in-out infinite alternate;
    animation-delay: -9s;
  }

  .shaft-4 {
    left: 82%;
    width: 14%;
    background: linear-gradient(180deg, rgba(255, 245, 220, 0.20) 0%, rgba(240, 210, 150, 0.08) 30%, transparent 65%);
    animation: shaftDrift1 24s ease-in-out infinite alternate;
    animation-delay: -12s;
  }

  /* Architectural surface sheen on upper beams and marble wall */
  .architectural-surface-sheen {
    position: absolute;
    top: 14%;
    left: 0;
    width: 100%;
    height: 36%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 238, 205, 0.0) 25%,
      rgba(255, 238, 205, 0.12) 50%,
      rgba(255, 238, 205, 0.0) 75%,
      transparent 100%
    );
    mix-blend-mode: soft-light;
    pointer-events: none;
    animation: sheenSlide 20s ease-in-out infinite alternate;
  }

  /* Tiny golden dust motes canvas */
  .golden-motes-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    mix-blend-mode: screen;
  }

  @keyframes sunlightBreath {
    0% {
      opacity: 0.72;
      transform: translateY(0) scale(1);
    }
    50% {
      opacity: 0.95;
      transform: translateY(5px) scale(1.02);
    }
    100% {
      opacity: 0.72;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes shaftDrift1 {
    0% {
      opacity: 0.10;
      transform: rotate(-19deg) translateX(-8px);
    }
    100% {
      opacity: 0.18;
      transform: rotate(-17deg) translateX(8px);
    }
  }

  @keyframes shaftDrift2 {
    0% {
      opacity: 0.14;
      transform: rotate(-18deg) translateX(-5px);
    }
    100% {
      opacity: 0.22;
      transform: rotate(-16deg) translateX(7px);
    }
  }

  @keyframes shaftDrift3 {
    0% {
      opacity: 0.08;
      transform: rotate(-17deg) translateX(-6px);
    }
    100% {
      opacity: 0.16;
      transform: rotate(-19deg) translateX(6px);
    }
  }

  @keyframes sheenSlide {
    0% {
      transform: translateX(-10%);
      opacity: 0.10;
    }
    100% {
      transform: translateX(10%);
      opacity: 0.22;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sunlight-atrium-glow,
    .light-shaft,
    .architectural-surface-sheen {
      animation: none !important;
      opacity: 0.14 !important;
    }
  }
`;

// Insert the CSS before </head>
html = html.replace('</head>', `<style>${lightingCss}</style></head>`);

// 5. Add the Golden Motes Particle JavaScript right before </body>
const motesScript = `
<script>
(function() {
  function initGoldenMotes() {
    const canvas = document.getElementById('goldenMotesCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles = [];
    let animationFrameId = null;
    let isVisible = true;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const PARTICLE_COUNT = 32;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    }

    class Mote {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        // Concentrate in upper 65% of the reception scene where light streams in
        this.y = init ? Math.random() * height * 0.75 : height * 0.75 + Math.random() * 20;
        this.size = Math.random() * 1.5 + 0.7; // 0.7px to 2.2px
        this.baseAlpha = Math.random() * 0.45 + 0.15;
        this.alpha = 0;
        this.fadeSpeed = Math.random() * 0.01 + 0.005;
        this.fadingIn = true;
        this.speedY = -(Math.random() * 0.22 + 0.08); // slow upward drift
        this.driftX = (Math.random() - 0.5) * 0.15;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = Math.random() * 0.018 + 0.006;
      }

      update() {
        if (prefersReducedMotion) return;

        this.y += this.speedY;
        this.angle += this.angleSpeed;
        this.x += this.driftX + Math.sin(this.angle) * 0.12;

        if (this.fadingIn) {
          this.alpha += this.fadeSpeed;
          if (this.alpha >= this.baseAlpha) {
            this.alpha = this.baseAlpha;
            this.fadingIn = false;
          }
        } else if (this.y < height * 0.08) {
          this.alpha -= this.fadeSpeed * 1.5;
          if (this.alpha <= 0) {
            this.reset(false);
          }
        }

        if (this.y < 0 || this.x < -10 || this.x > width + 10) {
          this.reset(false);
        }
      }

      draw() {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Soft warm champagne-gold color
        ctx.fillStyle = 'rgba(250, 228, 175, ' + this.alpha + ')';
        ctx.shadowColor = 'rgba(255, 235, 180, ' + (this.alpha * 0.6) + ')';
        ctx.shadowBlur = this.size * 3;
        ctx.fill();
        ctx.restore();
      }
    }

    function init() {
      resize();
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Mote());
      }
      window.addEventListener('resize', resize, { passive: true });
    }

    function loop() {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
        }
      }
      animationFrameId = requestAnimationFrame(loop);
    }

    // Only render when section is in or near viewport
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          isVisible = entry.isIntersecting;
        });
      }, { rootMargin: '100px' });
      observer.observe(canvas);
    }

    init();
    loop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGoldenMotes);
  } else {
    initGoldenMotes();
  }
})();
</script>
`;

html = html.replace('</body>', `${motesScript}</body>`);

fs.writeFileSync(filePath, html, 'utf-8');
console.log('[index.html] Successfully replaced clouds with Architectural Lighting FX! New length:', html.length);
