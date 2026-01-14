// render.js - Data Rendering from JSON
(function() {
    'use strict';
    
    let portfolioData = null;
    
    // Fetch portfolio data
    async function fetchPortfolioData() {
        try {
            const response = await fetch('/assets/data/portfolio.json');
            if (!response.ok) throw new Error('Failed to fetch portfolio data');
            portfolioData = await response.json();
            return portfolioData;
        } catch (error) {
            console.error('Error fetching portfolio data:', error);
            throw error;
        }
    }
    
    // Render Hero Section
    function renderHero(data) {
        const { profile, socialLinks } = data;
        
        // Profile info
        document.getElementById('nav-name').textContent = profile.name.split(' ').map(n => n[0]).join('');
        
        // Set avatar image
        const heroAvatar = document.getElementById('hero-avatar');
        if (heroAvatar && profile.avatar) {
            heroAvatar.src = profile.avatar;
            heroAvatar.alt = profile.name;
        }
        
        document.getElementById('hero-name').textContent = profile.name;
        document.getElementById('hero-title').textContent = profile.title;
        document.getElementById('hero-subtitle').textContent = profile.subtitle;
        document.getElementById('hero-tagline').textContent = profile.tagline;
        
        // Stats
        document.getElementById('stat-years').textContent = `${profile.yearsOfExperience}+`;
        document.getElementById('stat-projects').textContent = `${profile.projectsCompleted}+`;
        document.getElementById('stat-clients').textContent = `${profile.clientsServed}+`;
        
        // Social links
        const socialsContainer = document.getElementById('hero-socials');
        socialsContainer.innerHTML = socialLinks.map(link => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" 
               class="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition">
                <i class="${link.icon} text-xl text-gray-700 dark:text-gray-300"></i>
            </a>
        `).join('');
    }
    
    // Render About Section
    function renderAbout(data) {
        const { about, profile } = data;
        
        document.getElementById('about-title').textContent = about.title;
        document.getElementById('about-summary').textContent = about.summary;
        
        // Highlights
        const highlightsContainer = document.getElementById('about-highlights');
        highlightsContainer.innerHTML = about.highlights.map(highlight => `
            <div class="flex items-start gap-3">
                <i class="fas fa-check-circle text-primary-600 dark:text-primary-400 mt-1"></i>
                <p class="text-gray-600 dark:text-gray-400">${highlight}</p>
            </div>
        `).join('');
        
        // Quick info
        const infoContainer = document.getElementById('about-info');
        infoContainer.innerHTML = `
            <div class="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <span class="text-gray-600 dark:text-gray-400">Name:</span>
                <span class="font-semibold">${profile.name}</span>
            </div>
            <div class="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <span class="text-gray-600 dark:text-gray-400">Location:</span>
                <span class="font-semibold">${profile.location}</span>
            </div>
            <div class="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <span class="text-gray-600 dark:text-gray-400">Email:</span>
                <span class="font-semibold">${profile.email}</span>
            </div>
            <div class="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <span class="text-gray-600 dark:text-gray-400">Website:</span>
                <span class="font-semibold">${profile.website}</span>
            </div>
            <div class="flex justify-between py-3">
                <span class="text-gray-600 dark:text-gray-400">Hobbies:</span>
                <span class="font-semibold">${profile.hobbies.join(', ')}</span>
            </div>
        `;
    }
    
    // Render Skills Section
    function renderSkills(data) {
        const { skills } = data;
        
        // Programming Languages
        const languagesContainer = document.getElementById('skills-languages');
        languagesContainer.innerHTML = skills.programmingLanguages.map(skill => `
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <div class="flex items-center justify-between mb-3">
                    <i class="${skill.icon} text-4xl"></i>
                    <span class="text-sm font-semibold text-primary-600 dark:text-primary-400">${skill.level}%</span>
                </div>
                <h4 class="font-semibold mb-2">${skill.name}</h4>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div class="skill-bar bg-gradient-to-r from-primary-600 to-purple-600 h-2 rounded-full" 
                         style="width: ${skill.level}%"></div>
                </div>
            </div>
        `).join('');
        
        // Frameworks
        const frameworksContainer = document.getElementById('skills-frameworks');
        frameworksContainer.innerHTML = skills.frameworks.map(skill => `
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <div class="flex items-center justify-between mb-3">
                    <i class="${skill.icon} text-4xl"></i>
                    <span class="text-sm font-semibold text-primary-600 dark:text-primary-400">${skill.level}%</span>
                </div>
                <h4 class="font-semibold mb-2">${skill.name}</h4>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div class="skill-bar bg-gradient-to-r from-primary-600 to-purple-600 h-2 rounded-full" 
                         style="width: ${skill.level}%"></div>
                </div>
            </div>
        `).join('');
        
        // Databases
        const databasesContainer = document.getElementById('skills-databases');
        databasesContainer.innerHTML = skills.databases.map(skill => `
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <div class="flex items-center justify-between mb-3">
                    <i class="${skill.icon} text-4xl"></i>
                    <span class="text-sm font-semibold text-primary-600 dark:text-primary-400">${skill.level}%</span>
                </div>
                <h4 class="font-semibold mb-2">${skill.name}</h4>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div class="skill-bar bg-gradient-to-r from-primary-600 to-purple-600 h-2 rounded-full" 
                         style="width: ${skill.level}%"></div>
                </div>
            </div>
        `).join('');
        
        // Technologies
        const technologiesContainer = document.getElementById('skills-technologies');
        technologiesContainer.innerHTML = skills.technologies.map(tech => `
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
                <i class="${tech.icon} text-4xl mb-3"></i>
                <h4 class="font-semibold">${tech.name}</h4>
            </div>
        `).join('');
    }
    
    // Render Experience Section
    function renderExperience(data) {
        const { experiences } = data;
        const timelineContainer = document.getElementById('experience-timeline');
        
        timelineContainer.innerHTML = experiences.map((exp, index) => `
            <div class="relative pl-8 md:pl-32 pb-8 ${index !== experiences.length - 1 ? 'border-l-2 border-primary-600 dark:border-primary-400' : ''}">
                <div class="absolute left-0 top-0 w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full -ml-[9px]"></div>
                <div class="absolute left-0 md:left-auto md:right-full md:mr-8 top-1 text-sm font-semibold text-primary-600 dark:text-primary-400">
                    ${exp.period}
                </div>
                <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
                    <div class="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                            <h3 class="text-xl md:text-2xl font-bold mb-2">${exp.position}</h3>
                            <p class="text-primary-600 dark:text-primary-400 font-semibold">${exp.company}</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">${exp.location} • ${exp.type}</p>
                        </div>
                    </div>
                    
                    <p class="text-gray-600 dark:text-gray-400 mb-4">${exp.description}</p>
                    
                    ${exp.responsibilities ? `
                        <div class="mb-4">
                            <h4 class="font-semibold mb-2">Key Responsibilities:</h4>
                            <ul class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                                ${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${exp.achievements ? `
                        <div class="mb-4">
                            <h4 class="font-semibold mb-2">Achievements:</h4>
                            <ul class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                                ${exp.achievements.map(a => `<li>${a}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    <div class="flex flex-wrap gap-2 mt-4">
                        ${exp.technologies.map(tech => `
                            <span class="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm">
                                ${tech}
                            </span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Render Projects Section
    function renderProjects(data) {
        const { products, projects, clients } = data;
        
        // Featured Products with Carousel
        const productsContainer = document.getElementById('featured-products');
        productsContainer.innerHTML = products.map(product => `
            <div class="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4">
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                    <div class="relative h-64 overflow-hidden group">
                        <img src="${product.image}" alt="${product.name}" 
                             class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                             onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect fill=%22%23667eea%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22sans-serif%22 font-size=%2224%22 fill=%22white%22%3E${product.name}%3C/text%3E%3C/svg%3E'">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        ${product.url !== '#' ? `
                            <a href="${product.url}" target="_blank" rel="noopener noreferrer" 
                               class="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary-600 hover:text-white z-10">
                                <i class="fas fa-external-link-alt text-sm"></i>
                            </a>
                        ` : ''}
                    </div>
                    <div class="p-6">
                        <div class="mb-3">
                            <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">${product.name}</h3>
                            <p class="text-sm font-semibold text-primary-600 dark:text-primary-400">${product.tagline}</p>
                        </div>
                        <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">${product.description}</p>
                        
                        ${product.features ? `
                            <div class="mb-4">
                                <h4 class="font-semibold text-sm mb-2 text-gray-900 dark:text-white">Key Features:</h4>
                                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                    ${product.features.slice(0, 3).map(f => `
                                        <li class="flex items-start gap-2">
                                            <i class="fas fa-check-circle text-primary-600 dark:text-primary-400 text-xs mt-1"></i>
                                            <span class="line-clamp-1">${f}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        
                        ${product.technologies && product.technologies.length > 0 ? `
                            <div class="flex flex-wrap gap-2 mt-4">
                                ${product.technologies.slice(0, 4).map(tech => `
                                    <span class="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full font-medium">
                                        ${tech}
                                    </span>
                                `).join('')}
                            </div>
                        ` : ''}
                        
                        ${product.stats ? `
                            <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between text-sm">
                                ${product.stats.users ? `<span class="text-gray-600 dark:text-gray-400"><i class="fas fa-users mr-1"></i>${product.stats.users}</span>` : ''}
                                ${product.stats.downloads ? `<span class="text-gray-600 dark:text-gray-400"><i class="fas fa-download mr-1"></i>${product.stats.downloads}</span>` : ''}
                                ${product.stats.rating ? `<span class="text-yellow-500"><i class="fas fa-star mr-1"></i>${product.stats.rating}</span>` : ''}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');
        
        // Setup carousel indicators
        const indicatorsContainer = document.getElementById('carousel-indicators');
        if (indicatorsContainer) {
            indicatorsContainer.innerHTML = products.map((_, index) => `
                <button class="carousel-indicator w-3 h-3 rounded-full transition-all ${index === 0 ? 'bg-primary-600 w-8' : 'bg-gray-300 dark:bg-gray-600'}" 
                        data-index="${index}">
                </button>
            `).join('');
        }
        
        // Initialize carousel
        initializeCarousel(products.length);
        
        // Projects Timeline
        const timelineContainer = document.getElementById('projects-timeline');
        timelineContainer.innerHTML = projects.map((yearProjects, yearIndex) => `
            <div class="mb-12">
                <div class="flex items-center gap-4 mb-6">
                    <div class="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span class="text-2xl font-bold text-white">${yearProjects.year}</span>
                    </div>
                    <div class="flex-1 h-1 bg-gradient-to-r from-primary-600/50 to-transparent"></div>
                </div>
                
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    ${yearProjects.items.map((project, projectIndex) => `
                        <div class="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                            <div class="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700 cursor-pointer" 
                                 onclick="window.portfolioImageModal.open(${yearIndex}, ${projectIndex})">
                                <img src="${project.image}" 
                                     alt="${project.name}" 
                                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect fill=%22%23667eea%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22sans-serif%22 font-size=%2220%22 fill=%22white%22%3E${project.name}%3C/text%3E%3C/svg%3E'">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <i class="fas fa-search-plus text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                                </div>
                                <div class="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <div class="flex items-center gap-2 text-white text-sm">
                                        <i class="fas fa-calendar-alt"></i>
                                        <span>${yearProjects.year}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="p-4">
                                <h5 class="font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">${project.name}</h5>
                                ${project.company ? `<p class="text-xs font-semibold text-primary-600 dark:text-primary-400 mb-2">${project.company}</p>` : ''}
                                <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">${project.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
        
        // Initialize image modal
        initializeImageModal(projects);
        
        // Clients
        const clientsContainer = document.getElementById('clients-grid');
        clientsContainer.innerHTML = clients.map(client => `
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition flex items-center justify-center">
                <div class="text-center">
                    <div class="w-16 h-16 mx-auto mb-3 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <img src="${client.logo}" alt="${client.name}" class="w-full h-full object-contain rounded-full bg-white">
                    </div>
                    <p class="font-semibold text-sm">${client.name}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">${client.category}</p>
                </div>
            </div>
        `).join('');
    }
    
    // Initialize Carousel
    function initializeCarousel(totalItems) {
        let currentIndex = 0;
        const container = document.getElementById('featured-products');
        const prevBtn = document.getElementById('prev-product');
        const nextBtn = document.getElementById('next-product');
        const indicators = document.querySelectorAll('.carousel-indicator');
        
        // Get number of visible items based on screen width
        function getVisibleItems() {
            if (window.innerWidth >= 1024) return 3; // lg
            if (window.innerWidth >= 768) return 2;  // md
            return 1; // sm
        }
        
        function updateCarousel() {
            const visibleItems = getVisibleItems();
            const maxIndex = Math.max(0, totalItems - visibleItems);
            
            // Ensure currentIndex is within bounds
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            
            const offset = -(currentIndex * (100 / visibleItems));
            container.style.transform = `translateX(${offset}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('bg-primary-600', 'w-8');
                    indicator.classList.remove('bg-gray-300', 'dark:bg-gray-600');
                } else {
                    indicator.classList.remove('bg-primary-600', 'w-8');
                    indicator.classList.add('bg-gray-300', 'dark:bg-gray-600');
                }
            });
            
            // Update button states
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= maxIndex;
            
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        }
        
        // Navigation buttons
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            const visibleItems = getVisibleItems();
            const maxIndex = Math.max(0, totalItems - visibleItems);
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });
        
        // Indicator clicks
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });
        
        // Auto-play carousel
        let autoPlayInterval = setInterval(() => {
            const visibleItems = getVisibleItems();
            const maxIndex = Math.max(0, totalItems - visibleItems);
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }, 5000);
        
        // Pause auto-play on hover
        container.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        container.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(() => {
                const visibleItems = getVisibleItems();
                const maxIndex = Math.max(0, totalItems - visibleItems);
                if (currentIndex < maxIndex) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateCarousel();
            }, 5000);
        });
        
        // Update on window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateCarousel();
            }, 250);
        });
        
        // Initial update
        updateCarousel();
    }
    
    // Initialize Image Modal
    function initializeImageModal(projects) {
        const modal = document.getElementById('image-modal');
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const closeBtn = document.getElementById('close-modal');
        const prevBtn = document.getElementById('prev-image');
        const nextBtn = document.getElementById('next-image');
        
        let currentYearIndex = 0;
        let currentProjectIndex = 0;
        
        // Open modal function
        function openModal(yearIndex, projectIndex) {
            currentYearIndex = yearIndex;
            currentProjectIndex = projectIndex;
            updateModalContent();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
        
        // Close modal function
        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        // Update modal content
        function updateModalContent() {
            const project = projects[currentYearIndex].items[currentProjectIndex];
            const year = projects[currentYearIndex].year;
            
            modalImage.src = project.image;
            modalImage.alt = project.name;
            modalTitle.textContent = `${project.name} (${year})`;
            modalDescription.textContent = project.description;
        }
        
        // Navigate to previous image
        function showPrevImage() {
            currentProjectIndex--;
            if (currentProjectIndex < 0) {
                currentYearIndex--;
                if (currentYearIndex < 0) {
                    currentYearIndex = projects.length - 1;
                }
                currentProjectIndex = projects[currentYearIndex].items.length - 1;
            }
            updateModalContent();
        }
        
        // Navigate to next image
        function showNextImage() {
            currentProjectIndex++;
            if (currentProjectIndex >= projects[currentYearIndex].items.length) {
                currentYearIndex++;
                if (currentYearIndex >= projects.length) {
                    currentYearIndex = 0;
                }
                currentProjectIndex = 0;
            }
            updateModalContent();
        }
        
        // Event listeners
        closeBtn.addEventListener('click', closeModal);
        prevBtn.addEventListener('click', showPrevImage);
        nextBtn.addEventListener('click', showNextImage);
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'flex') {
                if (e.key === 'Escape') closeModal();
                if (e.key === 'ArrowLeft') showPrevImage();
                if (e.key === 'ArrowRight') showNextImage();
            }
        });
        
        // Export to window for onclick handlers
        window.portfolioImageModal = {
            open: openModal,
            close: closeModal
        };
    }
    
    // Render Contact Section
    function renderContact(data) {
        const { contact, socialLinks } = data;
        
        document.getElementById('contact-title').textContent = contact.title;
        document.getElementById('contact-subtitle').textContent = contact.subtitle;
        document.getElementById('contact-email').textContent = contact.email;
        document.getElementById('contact-email').href = `mailto:${contact.email}`;
        document.getElementById('contact-phone').textContent = contact.phone;
        document.getElementById('contact-phone').href = `tel:${contact.phone}`;
        document.getElementById('contact-location').textContent = contact.location;
        document.getElementById('contact-availability').textContent = contact.availability;
        
        // Social links
        const socialsContainer = document.getElementById('contact-socials');
        socialsContainer.innerHTML = socialLinks.map(link => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" 
               class="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 hover:bg-primary-600 dark:hover:bg-primary-500 hover:text-white transition">
                <i class="${link.icon} text-xl"></i>
            </a>
        `).join('');
    }
    
    // Render Footer
    function renderFooter(data) {
        const { profile } = data;
        const currentYear = new Date().getFullYear();
        
        document.getElementById('footer-year').textContent = currentYear;
        document.getElementById('footer-name').textContent = profile.name;
    }
    
    // Update SEO meta tags
    function updateSEO(data) {
        const { seo } = data;
        
        document.getElementById('page-title').textContent = seo.title;
        document.getElementById('page-description').content = seo.description;
        document.getElementById('og-title').content = seo.title;
        document.getElementById('og-description').content = seo.description;
    }
    
    // Main render function
    async function renderPortfolio() {
        try {
            const data = await fetchPortfolioData();
            
            renderHero(data);
            renderAbout(data);
            renderSkills(data);
            renderExperience(data);
            renderProjects(data);
            renderContact(data);
            renderFooter(data);
            updateSEO(data);
            
            return data;
        } catch (error) {
            console.error('Error rendering portfolio:', error);
            throw error;
        }
    }
    
    // Export for use in other scripts
    window.portfolioRenderer = {
        render: renderPortfolio,
        getData: () => portfolioData
    };
})();
