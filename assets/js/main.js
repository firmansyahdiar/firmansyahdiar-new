// main.js - Main Application Logic
(function() {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // Initialize application
    async function init() {
        try {
            // Show loading indicator
            showLoading();

            // Render portfolio data
            await window.portfolioRenderer.render();

            // Setup event listeners
            setupNavigation();
            setupScrollEffects();
            setupAnimations();
            setupTyping();
            setupPointerEffects();

            // Hide loading indicator
            hideLoading();

        } catch (error) {
            console.error('Error initializing portfolio:', error);
            showError();
        }
    }

    // Show loading indicator
    function showLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = 'flex';
        }
    }

    // Hide loading indicator
    function hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            setTimeout(() => {
                loading.style.opacity = '0';
                setTimeout(() => {
                    loading.style.display = 'none';
                }, 500);
            }, 300);
        }
    }

    // Show error message
    function showError() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.innerHTML = `
                <div class="text-center px-6">
                    <i class="fas fa-circle-exclamation text-6xl text-rose-500 mb-4"></i>
                    <h2 class="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
                    <p class="text-slate-500 dark:text-slate-400 mb-2">Failed to load portfolio data</p>
                    <p class="text-sm text-slate-400 mb-6">Jalankan lewat server lokal, misalnya <code>python3 -m http.server 8000</code></p>
                    <button onclick="location.reload()" class="btn-primary">Reload Page</button>
                </div>
            `;
        }
    }

    // Setup Navigation
    function setupNavigation() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu?.querySelectorAll('a');
        mobileLinks?.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetElement = document.querySelector(this.getAttribute('href'));

                if (targetElement) {
                    e.preventDefault();
                    const offset = 90; // Height of floating nav
                    window.scrollTo({
                        top: targetElement.offsetTop - offset,
                        behavior: prefersReducedMotion ? 'auto' : 'smooth'
                    });
                }
            });
        });

        // Back to top
        document.getElementById('back-to-top')?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    }

    // Setup Scroll Effects
    function setupScrollEffects() {
        let lastScroll = 0;
        let ticking = false;
        const nav = document.getElementById('navbar');
        const progress = document.getElementById('scroll-progress');
        const backToTop = document.getElementById('back-to-top');
        const mobileMenu = document.getElementById('mobile-menu');

        function onScroll() {
            const currentScroll = window.pageYOffset;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

            // Hide navbar while scrolling down, show when scrolling up
            const menuOpen = mobileMenu && !mobileMenu.classList.contains('hidden');
            nav?.classList.toggle('nav-hidden', !menuOpen && currentScroll > lastScroll && currentScroll > 200);
            nav?.classList.toggle('scrolled', currentScroll > 20);

            if (progress) {
                progress.style.transform = `scaleX(${maxScroll > 0 ? currentScroll / maxScroll : 0})`;
            }
            backToTop?.classList.toggle('show', currentScroll > 700);

            lastScroll = currentScroll;
            updateActiveNavLink();
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(onScroll);
                ticking = true;
            }
        }, { passive: true });

        onScroll();
    }

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';

        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - 120) {
                currentSection = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
        });
    }

    // Setup Animations
    function setupAnimations() {
        const revealItems = document.querySelectorAll('.reveal');

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            revealItems.forEach(el => el.classList.remove('reveal'));
            return;
        }

        // Scroll reveal; the classes are dropped afterwards so hover transforms work normally
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                el.classList.add('in-view');
                revealObserver.unobserve(el);

                const delay = parseFloat(getComputedStyle(el).transitionDelay) || 0;
                setTimeout(() => el.classList.remove('reveal', 'in-view'), 900 + delay * 1000);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

        revealItems.forEach(el => revealObserver.observe(el));

        // Animate skill bars from zero
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const bar = entry.target;
                const width = bar.dataset.width;
                requestAnimationFrame(() => { bar.style.width = width; });
                skillObserver.unobserve(bar);
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.skill-bar').forEach(bar => {
            bar.dataset.width = bar.style.width;
            bar.style.width = '0%';
            skillObserver.observe(bar);
        });

        // Count-up numbers
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));
    }

    function animateCounter(el) {
        const text = el.textContent.trim();
        const target = parseInt(text, 10);
        if (isNaN(target)) return;

        const suffix = text.replace(/^\d+/, '');
        const duration = 1600;
        const start = performance.now();

        function frame(now) {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = `${Math.round(target * eased)}${suffix}`;
            if (t < 1) requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);
    }

    // Typing effect cycling through the roles in the hero subtitle ("A | B | C")
    function setupTyping() {
        const el = document.querySelector('[data-typed]');
        if (!el) return;

        const roles = el.textContent.split('|').map(s => s.trim()).filter(Boolean);
        if (roles.length < 2 || prefersReducedMotion) return;

        let roleIndex = 0;
        let charIndex = roles[0].length;
        let deleting = true;

        function tick() {
            const role = roles[roleIndex];

            if (deleting) {
                charIndex--;
                if (charIndex <= 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            } else {
                charIndex++;
            }

            el.textContent = roles[roleIndex].slice(0, Math.max(charIndex, 0));

            let delay = deleting ? 35 : 75;
            if (!deleting && charIndex >= roles[roleIndex].length) {
                deleting = true;
                delay = 2200;
            }
            setTimeout(tick, delay);
        }

        el.textContent = roles[0];
        setTimeout(tick, 2500);
    }

    // Spotlight glow that follows the cursor, plus a subtle 3D tilt on product cards
    function setupPointerEffects() {
        if (!canHover) return;

        document.addEventListener('pointermove', (e) => {
            const card = e.target.closest?.('.spotlight');
            if (!card) return;
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
            card.style.setProperty('--my', `${e.clientY - rect.top}px`);
        }, { passive: true });

        if (prefersReducedMotion) return;

        document.querySelectorAll('.tilt').forEach(card => {
            card.addEventListener('pointermove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `perspective(1000px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-6px)`;
            });

            card.addEventListener('pointerleave', () => {
                card.style.transform = '';
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export utilities if needed
    window.portfolioApp = {
        init
    };
})();
