// ==========================================
// SCRIPT.JS - PREMIUM INTERACTIVE PORTFOLIO
// Motion Design, Canvas Particles, GSAP
// Enhanced: Magnetic Buttons, Text Reveal,
// Cursor Glow, Loading Screen
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    const gsapReady = typeof gsap !== 'undefined';
    const scrollTriggerReady = typeof ScrollTrigger !== 'undefined';
    if (gsapReady && scrollTriggerReady) {
        gsap.registerPlugin(ScrollTrigger);
    }

    initLoadingScreen();
    initCursorGlow();
    initInteractiveCanvas();
    initHeaderScroll();
    initMobileMenu();
    initThemeToggle();
    initScrollToTop();
    initGlassTiltAndGlow();
    initMagneticButtons();
    initContactForm();

    // GSAP-dependent animations (only if loaded)
    if (gsapReady) {
        initHeroAnimations();
        initScrollAnimations();
        initCounterAnimation();
    }
});

/* ==========================================
   0. LOADING SCREEN
   ========================================== */
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1800);
    });

    // Fallback: hide after 3s
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 3000);
}

/* ==========================================
   0.1 CURSOR GLOW
   ========================================== */
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || window.innerWidth < 768) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }

    animateGlow();
}

/* ==========================================
   0.2 HERO ENTRY ANIMATIONS
   ========================================== */
function initHeroAnimations() {
    if (typeof gsap === 'undefined') return;

    // Hero elements start visible, animate from hidden state
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Set initial states then animate
    gsap.set('.hero-subtitle', { opacity: 0, x: -40 });
    gsap.set('.hero-text h1', { opacity: 0, y: 40 });
    gsap.set('.hero-description', { opacity: 0, y: 20 });
    gsap.set('.hero-cta a', { opacity: 0, y: 20 });
    gsap.set('.hero-image-container', { opacity: 0, scale: 0.7 });
    gsap.set('.orbit-ring', { opacity: 0, scale: 0 });
    gsap.set('.tech-ticker', { opacity: 0, y: 30 });

    tl.to('.hero-subtitle', { opacity: 1, x: 0, duration: 0.8 })
      .to('.hero-text h1', { opacity: 1, y: 0, duration: 1 }, '-=0.5')
      .to('.hero-description', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to('.hero-cta a', { opacity: 1, y: 0, stagger: 0.15, duration: 0.8 }, '-=0.5')
      .to('.hero-image-container', { opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.7)' }, '-=0.7')
      .to('.orbit-ring', { opacity: 1, scale: 1, duration: 0.8 }, '-=0.5')
      .to('.tech-ticker', { opacity: 1, y: 0, duration: 0.8 }, '-=0.3');
}

/* ==========================================
   1. INTERACTIVE ELECTRICAL PARTICLE CANVAS
   ========================================== */
function initInteractiveCanvas() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const particles = [];
    const maxParticles = window.innerWidth < 768 ? 40 : 80;
    const connectionDistance = 110;
    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('resize', () => {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    });

    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.radius = Math.random() * 2 + 1;
            this.color = Math.random() > 0.5 ? '#00f0ff' : '#b829f7';
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        update() {
            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;

            this.x += this.vx;
            this.y += this.vy;

            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x += (dx / dist) * force * 0.8;
                    this.y += (dy / dist) * force * 0.8;
                }
            }
        }
    }

    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }

    function connect() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    const alpha = (1 - dist / connectionDistance) * 0.12;
                    ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }

            if (mouse.x !== null && mouse.y !== null) {
                const p = particles[i];
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    const alpha = (1 - dist / mouse.radius) * 0.18;
                    ctx.strokeStyle = `rgba(184, 41, 247, ${alpha})`;
                    ctx.lineWidth = 1.2;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connect();
        requestAnimationFrame(animate);
    }

    animate();
}

/* ==========================================
   2. NAVBAR SCROLL EFFECT
   ========================================== */
function initHeaderScroll() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ==========================================
   3. MOBILE NAVIGATION DRAWER
   ========================================== */
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    if (mobileToggle) mobileToggle.addEventListener('click', toggleMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', toggleMenu);

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ==========================================
   4. THEME TOGGLE
   ========================================== */
function initThemeToggle() {
    const themeBtn = document.getElementById('themeToggle');
    if (!themeBtn) return;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') applyLightTheme();

    themeBtn.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light-theme');
        if (isLight) {
            applyDarkTheme();
        } else {
            applyLightTheme();
        }
    });

    function applyLightTheme() {
        document.body.classList.add('light-theme');
        themeBtn.innerHTML = '\uD83C\uDF19';
        localStorage.setItem('theme', 'light');
    }

    function applyDarkTheme() {
        document.body.classList.remove('light-theme');
        themeBtn.innerHTML = '\u2600\uFE0F';
        localStorage.setItem('theme', 'dark');
    }
}

/* ==========================================
   5. SCROLL TO TOP
   ========================================== */
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ==========================================
   6. 3D CARD TILT & GLOW HOVER EFFECTS
   ========================================== */
function initGlassTiltAndGlow() {
    const cards = document.querySelectorAll('.glass-card, .service-card, .timeline-content');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            const width = rect.width;
            const height = rect.height;
            const rotateX = -(y - height / 2) / height * 8;
            const rotateY = (x - width / 2) / width * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

/* ==========================================
   7. MAGNETIC BUTTONS
   ========================================== */
function initMagneticButtons() {
    if (typeof gsap === 'undefined') return;

    const buttons = document.querySelectorAll('.magnetic-btn, .btn-electric');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return;
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}

/* ==========================================
   8. GSAP SCROLL ANIMATIONS
   ========================================== */
function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Header scroll trigger active class
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 30%',
            end: 'bottom 30%',
            onEnter: () => setActiveLink(section.id),
            onEnterBack: () => setActiveLink(section.id)
        });
    });

    function setActiveLink(id) {
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    }

    // Reveal Animations on Scroll - use gsap.to (from visible state)
    const scrollRevealSelectors = [
        '.about-image', '.about-text',
        '.skills-grid .skill-card', '.stats-grid .stat-item',
        '.services-grid .service-card',
        '.timeline-item', '.experience-item',
        '.contact-form', '.contact-info .info-card'
    ];

    scrollRevealSelectors.forEach(selector => {
        gsap.utils.toArray(selector).forEach((element, index) => {
            // Set initial state
            gsap.set(element, { opacity: 0, y: 50 });

            ScrollTrigger.create({
                trigger: element,
                start: 'top 90%',
                onEnter: () => {
                    gsap.to(element, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: index * 0.05,
                        ease: 'power3.out'
                    });
                }
            });
        });
    });

    // Section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.set(title, { opacity: 0, y: 30 });
        ScrollTrigger.create({
            trigger: title,
            start: 'top 88%',
            onEnter: () => {
                gsap.to(title, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
            }
        });
    });

    // Skill Bar Progression Animation
    ScrollTrigger.create({
        trigger: '.skills',
        start: 'top 65%',
        onEnter: () => {
            document.querySelectorAll('.skill-bar-fill').forEach(bar => {
                const targetWidth = bar.getAttribute('data-width');
                gsap.to(bar, {
                    width: `${targetWidth}%`,
                    duration: 1.5,
                    ease: 'power2.out'
                });
            });

            document.querySelectorAll('.skill-percent').forEach(percent => {
                const targetVal = parseInt(percent.getAttribute('data-width'));
                if (isNaN(targetVal)) return;
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: targetVal,
                    duration: 1.5,
                    ease: 'power2.out',
                    onUpdate: () => {
                        percent.innerText = `${Math.floor(obj.val)}%`;
                    }
                });
            });
        }
    });

    // Timeline line animation
    const tlLine = document.querySelector('.timeline-line');
    if (tlLine) {
        gsap.set(tlLine, { scaleY: 0, transformOrigin: 'top center' });
        ScrollTrigger.create({
            trigger: '.timeline',
            start: 'top 70%',
            onEnter: () => {
                gsap.to(tlLine, { scaleY: 1, duration: 1.5, ease: 'power2.out' });
            }
        });
    }

    // Experience line animation
    const expLine = document.querySelector('.experience-line');
    if (expLine) {
        gsap.set(expLine, { scaleY: 0, transformOrigin: 'top center' });
        ScrollTrigger.create({
            trigger: '.experience-timeline',
            start: 'top 70%',
            onEnter: () => {
                gsap.to(expLine, { scaleY: 1, duration: 1.5, ease: 'power2.out' });
            }
        });
    }
}

/* ==========================================
   9. COUNTER ANIMATION
   ========================================== */
function initCounterAnimation() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    ScrollTrigger.create({
        trigger: '.stats-grid',
        start: 'top 75%',
        onEnter: () => {
            document.querySelectorAll('.stat-value[data-count]').forEach(el => {
                const target = parseInt(el.getAttribute('data-count'));
                if (isNaN(target)) return;
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: () => {
                        el.textContent = `${Math.floor(obj.val)}+`;
                    }
                });
            });
        }
    });
}

/* ==========================================
   10. CONTACT FORM SUBMISSION OVERLAY
   ========================================== */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(4, 4, 13, 0.9);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            display: flex; justify-content: center; align-items: center;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;

        const glassPanel = document.createElement('div');
        glassPanel.className = 'glass-card';
        glassPanel.style.cssText = `
            padding: 50px 40px;
            max-width: 450px;
            width: 90%;
            text-align: center;
            border-color: var(--primary-green);
            box-shadow: var(--glow-green);
            position: relative;
            z-index: 1;
        `;

        glassPanel.innerHTML = `
            <div style="font-size: 4rem; color: var(--primary-green); margin-bottom: 20px; text-shadow: var(--glow-green);">
                <i class="fas fa-circle-check"></i>
            </div>
            <h3 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 15px; letter-spacing: 1px;">Transmission Réussie</h3>
            <p style="color: var(--text-secondary); margin-bottom: 30px; font-size: 0.95rem; line-height: 1.5;">Votre message a été transmis avec succès. Andy vous recontactera dans les plus brefs délais.</p>
            <button class="btn-electric btn-close-overlay" style="box-shadow: var(--glow-green); background: linear-gradient(135deg, var(--primary-green), #00d4ff);">
                <i class="fas fa-xmark"></i> Fermer
            </button>
        `;

        overlay.appendChild(glassPanel);
        document.body.appendChild(overlay);

        setTimeout(() => { overlay.style.opacity = '1'; }, 50);

        contactForm.reset();

        const closeBtn = glassPanel.querySelector('.btn-close-overlay');
        closeBtn.addEventListener('click', () => {
            overlay.style.opacity = '0';
            setTimeout(() => { overlay.remove(); }, 500);
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => { overlay.remove(); }, 500);
            }
        });
    });
}