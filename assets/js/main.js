// main.js - Main Application Logic
(function() {
    'use strict';
    
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
            
            // Hide loading indicator
            hideLoading();
            
        } catch (error) {
            console.error('Error initializing portfolio:', error);
            hideLoading();
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
                }, 300);
            }, 500);
        }
    }
    
    // Show error message
    function showError() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.innerHTML = `
                <div class="text-center">
                    <i class="fas fa-exclamation-circle text-6xl text-red-500 mb-4"></i>
                    <h2 class="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
                    <p class="text-gray-600 dark:text-gray-400 mb-4">Failed to load portfolio data</p>
                    <button onclick="location.reload()" 
                            class="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                        Reload Page
                    </button>
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
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offset = 80; // Height of fixed nav
                    const targetPosition = targetElement.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Setup Scroll Effects
    function setupScrollEffects() {
        let lastScroll = 0;
        const nav = document.querySelector('nav');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Hide/show navbar on scroll
            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scrolling down
                nav?.classList.add('-translate-y-full');
            } else {
                // Scrolling up
                nav?.classList.remove('-translate-y-full');
            }
            
            lastScroll = currentScroll;
            
            // Update active nav link
            updateActiveNavLink();
        });
        
        // Add transition to nav
        if (nav) {
            nav.style.transition = 'transform 0.3s ease-in-out';
        }
    }
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 100)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-primary-600', 'dark:text-primary-400');
            link.classList.add('text-gray-700', 'dark:text-gray-300');
            
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.remove('text-gray-700', 'dark:text-gray-300');
                link.classList.add('text-primary-600', 'dark:text-primary-400');
            }
        });
    }
    
    // Setup Animations
    function setupAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-slide-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
        
        // Animate skill bars
        const skillBars = document.querySelectorAll('.skill-bar');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0%';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 100);
                    skillObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }
    
    // Utility: Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Setup window resize handler
    window.addEventListener('resize', debounce(() => {
        // Handle responsive adjustments if needed
    }, 250));
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Export utilities if needed
    window.portfolioApp = {
        init,
        debounce
    };
})();

// Service Worker Registration (Optional - for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

// Analytics (Optional - Add your tracking code here)
// Example: Google Analytics, Plausible, etc.
