// =========================================================
// PRATYUSH MISHRA — PORTFOLIO SCRIPT
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initActiveNavLink();
  initScrollReveal();
  initTypingEffect();
  initContactForm();
  initBackToTop();
  init3DBackground();
  initTiltCards();
  initCursorGlow();
  initScrollProgress();
  document.getElementById('year').textContent = new Date().getFullYear();
});

/* ---------- Sticky navbar shrink on scroll ---------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Mobile hamburger menu ---------- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Highlight active section link ---------- */
function initActiveNavLink() {
  const sections = document.querySelectorAll('main section[id], .hero[id]');
  const navLinkMap = new Map();
  document.querySelectorAll('.nav-link').forEach((link) => {
    navLinkMap.set(link.getAttribute('href').slice(1), link);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = navLinkMap.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinkMap.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- Fade-in on scroll ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((item) => observer.observe(item));
}

/* ---------- Typing animation for the hero role ---------- */
function initTypingEffect() {
  const el = document.getElementById('typed');
  if (!el) return;

  const roles = [
    'Full-Stack Developer',
    'Real-Time Web Systems Builder',
    'CSE Student @ LPU',
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    el.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPE_SPEED = 65;
  const DELETE_SPEED = 35;
  const HOLD_TIME = 1600;

  function tick() {
    const currentRole = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = currentRole.slice(0, charIndex);
      if (charIndex === currentRole.length) {
        deleting = true;
        setTimeout(tick, HOLD_TIME);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      el.textContent = currentRole.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
}

/* ---------- Contact form (UI only, no backend) ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = "This form isn't connected to a backend yet — please email me directly at mishrapratyushms@gmail.com.";
  });
}

/* ---------- 3D particle-network background (Three.js) ---------- */
function init3DBackground() {
  const canvas = document.getElementById('bg3d');
  if (!canvas || typeof THREE === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.z = 620;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const isMobile = window.innerWidth < 720;
  const PARTICLE_COUNT = isMobile ? 70 : 160;
  const SPREAD = 1400;

  const positions = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * SPREAD;
    positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD;
    positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0x2fe0c0,
    size: 3.2,
    transparent: true,
    opacity: 0.75,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // Faint connecting lines between nearby particles, computed once for a static "network" look
  const lineVertices = [];
  const LINK_DIST = isMobile ? 140 : 170;
  const MAX_LINKS = isMobile ? 60 : 140;
  let linkCount = 0;
  outer:
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    for (let j = i + 1; j < PARTICLE_COUNT; j++) {
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < LINK_DIST) {
        lineVertices.push(
          positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
          positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
        );
        linkCount++;
        if (linkCount >= MAX_LINKS) break outer;
      }
    }
  }
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lineVertices), 3));
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x2fe0c0, transparent: true, opacity: 0.12 });
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lines);

  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener(
    'mousemove',
    (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true }
  );

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  let scrollFactor = 0;
  window.addEventListener(
    'scroll',
    () => {
      scrollFactor = window.scrollY * 0.06;
    },
    { passive: true }
  );

  function animate() {
    requestAnimationFrame(animate);

    if (!prefersReducedMotion) {
      points.rotation.y += 0.0009;
      points.rotation.x += 0.0002;
      lines.rotation.y = points.rotation.y;
      lines.rotation.x = points.rotation.x;
    }

    // subtle parallax toward the cursor + gentle drift with scroll depth
    camera.position.x += (mouseX * 60 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 60 - camera.position.y) * 0.03;
    camera.position.z = 620 + scrollFactor;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  if (!prefersReducedMotion) {
    animate();
  } else {
    renderer.render(scene, camera);
  }
}

/* ---------- 3D tilt effect for cards ---------- */
function initTiltCards() {
  if (window.matchMedia('(hover: none)').matches) return; // skip on touch devices
  const cards = document.querySelectorAll('.tilt');

  cards.forEach((card) => {
    const MAX_TILT = 8;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateY = x * MAX_TILT * 2;
      const rotateX = -y * MAX_TILT * 2;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.015)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ---------- Cursor-following glow (hero only) ---------- */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  const hero = document.getElementById('home');
  if (!glow || !hero || window.matchMedia('(hover: none)').matches) return;

  hero.addEventListener('mouseenter', () => glow.classList.add('active'));
  hero.addEventListener('mouseleave', () => glow.classList.remove('active'));
  hero.addEventListener(
    'mousemove',
    (e) => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    },
    { passive: true }
  );
}

/* ---------- Scroll progress bar ---------- */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

/* ---------- Back to top button ---------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => {
      btn.classList.toggle('visible', window.scrollY > 500);
    },
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
