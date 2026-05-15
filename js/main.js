// ===== Mushroom Harvesting Robot — Main App =====

document.addEventListener('DOMContentLoaded', () => {

  // ===== 1. Language Toggle (multi-page navigation) =====
  const langToggle = document.getElementById('langToggle');

  // Detect current language from <html data-lang="zh|en">
  const currentLang = document.documentElement.getAttribute('data-lang') || 'zh';

  // Set toggle button text
  if (langToggle) {
    langToggle.textContent = currentLang === 'zh' ? 'EN' : '中文';
  }

  // Apply translations from JS for data-i18n elements
  function applyLanguage(lang) {
    if (!window.translations || !window.translations[lang]) return;
    const t = window.translations[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = t[key];
      if (value !== undefined && value !== null) {
        const i18nAttr = el.getAttribute('data-i18n-attr');
        if (i18nAttr) {
          el.setAttribute(i18nAttr, value);
          return;
        }
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = value;
        } else if (el.tagName === 'IMG') {
          el.alt = value;
        } else {
          el.textContent = value;
        }
      }
    });

    // Update document title
    const titleKey = document.querySelector('title')?.getAttribute('data-i18n');
    if (titleKey) {
      const value = t[titleKey];
      if (value) document.title = value;
    }

    document.documentElement.lang = lang;
  }

  // Apply initial translations
  applyLanguage(currentLang);

  // Toggle: navigate between / (zh) and /en/ (en) versions
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const path = window.location.pathname;
      if (currentLang === 'en') {
        // Switch to Chinese: strip /en/ prefix
        const zhPath = path.replace(/^\/en(\/|$)/, '/');
        window.location.href = zhPath || '/';
      } else {
        // Switch to English: add /en/ prefix (handle root)
        const enPath = path === '/' ? '/en/' : '/en' + path;
        window.location.href = enPath;
      }
    });
  }

  // ===== 2. Mobile Hamburger Menu =====
  const hamburger = document.getElementById('hamburgerBtn');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ===== 3. Nav Scroll Effect =====
  const nav = document.querySelector('.primary-nav');

  function handleNavScroll() {
    if (!nav) return;
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  // Initial check
  handleNavScroll();

  // ===== 4. Active Nav Link Highlight =====
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section[id]');
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);

      if (link) {
        if (scrollY >= top && scrollY < bottom) {
          link.style.color = 'var(--color-primary)';
        } else {
          link.style.color = '';
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // ===== 5. Scroll Animation (Intersection Observer) =====
  const animatedElements = document.querySelectorAll(
    '.about-card, .workflow-step, .tech-card, .timeline-item, .demo-video, .join-card, .contact-card'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Once animated, no need to observe
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all elements immediately
    animatedElements.forEach(el => el.classList.add('animate-in'));
  }

  // ===== 6. Smooth Button Scroll =====
  document.querySelectorAll('.btn[href^="#"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('href');
      if (!targetId) return;
      const target = document.querySelector(targetId);
      if (target) {
        const offset = 80; // nav height + padding
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== 7. 3D Particle / Geometric Background =====
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && typeof THREE !== 'undefined') {
    initParticleBackground(heroBg);
  }

  /**
   * Initialize a subtle 3D particle system in the hero background
   * @param {HTMLElement} container
   */
  function initParticleBackground(container) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create particles — small floating dots
    const particleCount = 120;
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30; // z
      sizes[i] = Math.random() * 3 + 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Use a simple circle texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,0.8)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.3)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      map: texture,
      color: 0xffffff,
      size: 0.6,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Animation
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / width - 0.5) * 2;
      mouseY = (e.clientY / height - 0.5) * 2;
    });

    function animate() {
      requestAnimationFrame(animate);

      // Gentle rotation based on mouse
      particles.rotation.x += (mouseY * 0.02 - particles.rotation.x) * 0.02;
      particles.rotation.y += (mouseX * 0.02 - particles.rotation.y) * 0.02;

      // Pulsing scale
      const time = Date.now() * 0.0003;
      particles.scale.set(
        1 + Math.sin(time) * 0.05,
        1 + Math.cos(time * 0.7) * 0.05,
        1
      );

      renderer.render(scene, camera);
    }

    animate();

    // Resize handler
    function onResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener('resize', onResize, { passive: true });
  }

  // ===== 8. Keyboard Accessibility =====
  document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && hamburger && navLinks) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });

}); // end DOMContentLoaded