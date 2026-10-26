// render.js - Data Rendering from JSON
(function() {
    'use strict';

    let portfolioData = null;

    // Accent colors cycled across product cards
    const PRODUCT_ACCENTS = ['#6366f1', '#10b981', '#f59e0b', '#0f766e', '#2563eb', '#ec4899'];

    const PLATFORM_ICONS = {
        Web: 'fas fa-globe',
        Android: 'fab fa-android',
        iOS: 'fab fa-apple'
    };

    // Fallback image when a picture fails to load
    function placeholder(label, size) {
        return `this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 200%22%3E%3Cdefs%3E%3ClinearGradient id=%22g%22 x1=%220%22 y1=%220%22 x2=%221%22 y2=%221%22%3E%3Cstop offset=%220%22 stop-color=%22%236366f1%22/%3E%3Cstop offset=%221%22 stop-color=%22%23ec4899%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill=%22url(%23g)%22 width=%22400%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22sans-serif%22 font-size=%22${size}%22 fill=%22white%22%3E${encodeURIComponent(label).replace(/'/g, '%27')}%3C/text%3E%3C/svg%3E'`;
    }

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

    function socialLinksHtml(socialLinks) {
        return socialLinks.map(link => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="${link.platform}" title="${link.platform}">
                <i class="${link.icon}"></i>
            </a>
        `).join('');
    }

    // Render Hero Section
    function renderHero(data) {
        const { profile, socialLinks, contact } = data;

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
        if (contact?.availability) {
            document.getElementById('hero-availability').textContent = contact.availability;
        }

        // Stats
        document.getElementById('stat-years').textContent = `${profile.yearsOfExperience}+`;
        document.getElementById('stat-projects').textContent = `${profile.projectsCompleted}+`;
        document.getElementById('stat-clients').textContent = `${profile.clientsServed}+`;

        // Social links
        document.getElementById('hero-socials').innerHTML = socialLinksHtml(socialLinks);
    }

    // Render About Section
    function renderAbout(data) {
        const { about, profile } = data;

        document.getElementById('about-title').textContent = about.title;
        document.getElementById('about-summary').textContent = about.summary;

        // Highlights
        const highlightsContainer = document.getElementById('about-highlights');
        highlightsContainer.innerHTML = about.highlights.map((highlight, i) => `
            <div class="highlight-item reveal" style="--d:${i * 0.07}s">
                <i class="fas fa-circle-check"></i>
                <p class="text-slate-600 dark:text-slate-300">${highlight}</p>
            </div>
        `).join('');

        // Quick info
        const rows = [
            ['Name', profile.name],
            ['Location', profile.location],
            ['Email', profile.email],
            ['Website', profile.website],
            ['Hobbies', profile.hobbies.join(', ')]
        ];
        document.getElementById('about-info').innerHTML = rows.map(([label, value]) => `
            <div class="info-row">
                <span>${label}</span>
                <span>${value}</span>
            </div>
        `).join('');
    }

    // Render Skills Section
    function skillCardHtml(skill, i) {
        return `
            <div class="skill-card glass spotlight reveal" style="--d:${(i % 4) * 0.06}s">
                <div class="flex items-center justify-between mb-4">
                    <i class="${skill.icon} colored skill-icon"></i>
                    <span class="text-sm font-bold text-primary-600 dark:text-primary-300">${skill.level}%</span>
                </div>
                <h4 class="font-semibold mb-3">${skill.name}</h4>
                <div class="skill-track">
                    <div class="skill-bar" style="width: ${skill.level}%"></div>
                </div>
            </div>
        `;
    }

    function renderSkills(data) {
        const { skills } = data;

        document.getElementById('skills-languages').innerHTML = skills.programmingLanguages.map(skillCardHtml).join('');
        document.getElementById('skills-frameworks').innerHTML = skills.frameworks.map(skillCardHtml).join('');
        document.getElementById('skills-databases').innerHTML = skills.databases.map(skillCardHtml).join('');

        document.getElementById('skills-technologies').innerHTML = skills.technologies.map((tech, i) => `
            <div class="tech-card glass spotlight reveal" style="--d:${(i % 6) * 0.05}s">
                <i class="${tech.icon} colored"></i>
                <h4>${tech.name}</h4>
            </div>
        `).join('');
    }

    // Render Experience Section
    function renderExperience(data) {
        const { experiences } = data;
        const timelineContainer = document.getElementById('experience-timeline');

        timelineContainer.innerHTML = experiences.map(exp => `
            <div class="timeline-item reveal">
                <span class="timeline-dot"></span>
                <div class="timeline-card glass spotlight">
                    <div class="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                            <h3 class="font-display text-xl md:text-2xl font-bold mb-1">${exp.position}</h3>
                            <p class="font-semibold gradient-text">${exp.company}</p>
                            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                <i class="fas fa-location-dot mr-1"></i>${exp.location} • ${exp.type}
                            </p>
                        </div>
                        <span class="period-pill"><i class="far fa-calendar"></i>${exp.period}</span>
                    </div>

                    <p class="text-slate-600 dark:text-slate-300 mb-4">${exp.description}</p>

                    ${exp.responsibilities ? `
                        <div class="mb-4">
                            <h4 class="font-semibold mb-2">Key Responsibilities</h4>
                            <ul class="exp-list">
                                ${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}

                    ${exp.achievements ? `
                        <div class="mb-4">
                            <h4 class="font-semibold mb-2"><i class="fas fa-trophy text-amber-500 mr-1"></i> Achievements</h4>
                            <ul class="exp-list">
                                ${exp.achievements.map(a => `<li>${a}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}

                    <div class="flex flex-wrap gap-2 mt-5">
                        ${exp.technologies.map(tech => `<span class="chip">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Grid placement for the product bento: first two wide, the rest in thirds
    function productSpan(index, total) {
        const lg = index < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
        const md = index === total - 1 && total % 2 === 1 ? 'md:col-span-2' : '';
        return `${lg} ${md}`;
    }

    // Render Projects Section
    function renderProjects(data) {
        const { products, projects, clients } = data;

        // Featured Products
        const productsContainer = document.getElementById('featured-products');
        productsContainer.innerHTML = products.map((product, index) => {
            const accent = product.accent || PRODUCT_ACCENTS[index % PRODUCT_ACCENTS.length];
            const hasLink = product.url && product.url !== '#';
            return `
            <div class="${productSpan(index, products.length)} reveal" style="--d:${(index % 3) * 0.1}s">
                <article class="product-card glass spotlight tilt" style="--accent:${accent}">
                    <div class="product-media shine">
                        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="${placeholder(product.name, 28)}">
                        ${product.category ? `<span class="product-badge">${product.category}</span>` : ''}
                        ${product.platforms ? `
                            <div class="product-platforms">
                                ${product.platforms.map(p => `<span title="${p}"><i class="${PLATFORM_ICONS[p] || 'fas fa-mobile-screen'}"></i></span>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                    <div class="product-accent-bar"></div>
                    <div class="p-6 flex flex-col flex-1">
                        <h3 class="font-display text-2xl font-bold mb-1">${product.name}</h3>
                        <p class="text-sm font-semibold mb-3" style="color:${accent}">${product.tagline}</p>
                        <p class="text-slate-600 dark:text-slate-400 mb-5 line-clamp-3">${product.description}</p>

                        ${product.features ? `
                            <ul class="grid sm:grid-cols-2 ${index < 2 ? '' : 'lg:grid-cols-1'} gap-x-4 gap-y-2 mb-5">
                                ${product.features.slice(0, 4).map(f => `
                                    <li class="feature-item"><i class="fas fa-circle-check"></i><span class="line-clamp-1">${f}</span></li>
                                `).join('')}
                            </ul>
                        ` : ''}

                        ${product.technologies && product.technologies.length > 0 ? `
                            <div class="flex flex-wrap gap-2 mb-5">
                                ${product.technologies.slice(0, 5).map(tech => `<span class="chip">${tech}</span>`).join('')}
                            </div>
                        ` : ''}

                        <div class="mt-auto pt-4 border-t border-slate-200/70 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-sm">
                            <div class="flex gap-4 text-slate-500 dark:text-slate-400">
                                ${product.stats?.users ? `<span><i class="fas fa-users mr-1"></i>${product.stats.users}</span>` : ''}
                                ${product.stats?.downloads ? `<span><i class="fas fa-download mr-1"></i>${product.stats.downloads}</span>` : ''}
                                ${product.stats?.rating ? `<span class="text-amber-500"><i class="fas fa-star mr-1"></i>${product.stats.rating}</span>` : ''}
                            </div>
                            ${hasLink ? `
                                <a href="${product.url}" target="_blank" rel="noopener noreferrer" class="product-link">
                                    Kunjungi <i class="fas fa-arrow-up-right-from-square text-xs"></i>
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </article>
            </div>
        `;
        }).join('');

        // Projects Timeline
        const timelineContainer = document.getElementById('projects-timeline');
        timelineContainer.innerHTML = projects.map((yearProjects, yearIndex) => `
            <div>
                <div class="flex items-center gap-4 mb-8 reveal">
                    <span class="year-pill">${yearProjects.year}</span>
                    <span class="text-sm font-medium text-slate-500 dark:text-slate-400">${yearProjects.items.length} projects</span>
                    <div class="year-line"></div>
                </div>

                <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    ${yearProjects.items.map((project, projectIndex) => `
                        <div class="project-card glass spotlight reveal" style="--d:${(projectIndex % 4) * 0.07}s">
                            <div class="project-media" onclick="window.portfolioImageModal.open(${yearIndex}, ${projectIndex})">
                                <img src="${project.image}" alt="${project.name}" loading="lazy" onerror="${placeholder(project.name, 20)}">
                                <div class="project-overlay"><i class="fas fa-magnifying-glass-plus"></i></div>
                            </div>
                            <div class="p-5">
                                <h5 class="font-bold mb-1 line-clamp-1">${project.name}</h5>
                                ${project.company ? `<p class="text-xs font-semibold text-primary-600 dark:text-primary-300 mb-2">${project.company}</p>` : ''}
                                <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">${project.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

        // Initialize image modal
        initializeImageModal(projects);

        // Clients (duplicated so the marquee loops seamlessly)
        const clientCard = client => `
            <div class="client-card glass">
                <img src="${client.logo}" alt="${client.name}" loading="lazy">
                <div>
                    <p class="font-semibold text-sm">${client.name}</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">${client.category}</p>
                </div>
            </div>
        `;
        const clientsHtml = clients.map(clientCard).join('');
        document.getElementById('clients-grid').innerHTML = clientsHtml + clientsHtml;
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

        // Update modal content (re-trigger the zoom animation on each image)
        function updateModalContent() {
            const project = projects[currentYearIndex].items[currentProjectIndex];
            const year = projects[currentYearIndex].year;

            modalImage.classList.remove('modal-img');
            void modalImage.offsetWidth;
            modalImage.classList.add('modal-img');

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
        document.getElementById('contact-email-card').href = `mailto:${contact.email}`;
        document.getElementById('contact-phone').textContent = contact.phone;
        document.getElementById('contact-phone-card').href = `tel:${contact.phone}`;
        document.getElementById('contact-location').textContent = contact.location;
        document.getElementById('contact-availability').textContent = contact.availability;

        // Social links
        document.getElementById('contact-socials').innerHTML = socialLinksHtml(socialLinks);
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
