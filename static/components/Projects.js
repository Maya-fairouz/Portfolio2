import app from '../script.js';

class Projects {
    constructor() {
        this.projects = [];
        this.featuredProjects = [];
        this.showingAll = false;
        this.init();
    }

    async init() {
        await this.loadProjects();
        this.render();
        this.setupEventListeners();
        this.setupAnimations();
    }

    async loadProjects() {
        try {
            // Load all projects
            const allProjectsResponse = await app.apiCall('/projects');
            if (allProjectsResponse.success) {
                this.projects = allProjectsResponse.data;
            }

            // Load featured projects
            const featuredResponse = await app.apiCall('/projects');
            if (featuredResponse.success) {
                this.featuredProjects = featuredResponse.data;
            }
        } catch (error) {
            console.error('Error loading projects:', error);
            // Fallback data
            this.projects = [];
            this.featuredProjects = [];
        }
    }

    render() {
        const projectsElement = document.getElementById('projects');
        projectsElement.innerHTML = `
            <div class="py-20 px-6">
                <div class="container mx-auto max-w-6xl">
                    <!-- Section Header -->
                    <div class="text-center mb-16 fade-in-on-scroll">
                        <h2 class="section-title text-3xl md:text-4xl lg:text-5xl font-display font-bold text-custom-light mb-6">
                            Featured Projects
                        </h2>
                        <p class="text-lg text-custom-light/70 max-w-2xl mx-auto mb-8">
                            A collection of projects I've worked on, showcasing different technologies and problem-solving approaches
                        </p>
                        

                    <!-- Projects Grid -->
                    <div id="projects-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        ${this.renderProjects(this.featuredProjects)}
                    </div>

                    <!-- Load More Button -->
                    <div class="text-center mt-12 fade-in-on-scroll" id="load-more-container" style="display: none;">
                        <button id="load-more-btn" class="btn-primary px-8 py-3 rounded-lg text-custom-light font-medium hover-scale">
                            Load More Projects
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderProjects(projects) {
        if (!projects || projects.length === 0) {
            return `
                <div class="col-span-full text-center py-12">
                    <i data-feather="folder" class="w-16 h-16 text-custom-purple mx-auto mb-4"></i>
                    <p class="text-custom-light/70 text-lg">No projects to display</p>
                </div>
            `;
        }

        return projects.map(project => `
            <div class="project-card rounded-lg overflow-hidden hover-scale fade-in-on-scroll" data-project-id="${project.id}">
                <!-- Project Image -->
                <div class="relative overflow-hidden">
                    <img 
                        src="${project.image_url}" 
                        alt="${project.title}"
                        class="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                        loading="lazy"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-custom-darkest/80 to-transparent"></div>
                    

                </div>

                <!-- Project Content -->
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-custom-light mb-3">
                        ${project.title}
                    </h3>
                    
                    <p class="text-custom-light/80 mb-4 line-clamp-3">
                        ${project.description}
                    </p>

                    <!-- Technologies -->
                    <div class="flex flex-wrap gap-2 mb-6">
                        ${project.technologies.slice(0, 4).map(tech => `
                            <span class="skill-tag px-3 py-1 rounded-full text-xs text-custom-light">
                                ${tech}
                            </span>
                        `).join('')}
                        ${project.technologies.length > 4 ? `
                            <span class="skill-tag px-3 py-1 rounded-full text-xs text-custom-light">
                                +${project.technologies.length - 4} more
                            </span>
                        ` : ''}
                    </div>

                    <!-- Project Links -->
                    <div class="flex gap-4">
                        <a 
                            href="${project.project_url}" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            class="flex-1 btn-primary px-4 py-2 rounded-lg text-custom-light text-sm font-medium text-center hover-scale inline-flex items-center justify-center"
                        >
                            <i data-feather="external-link" class="w-4 h-4 mr-2"></i>
                            Live Demo
                        </a>
                        
                        ${project.github_url ? `
                            <a 
                                href="${project.github_url}" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                class="border border-custom-purple text-custom-purple px-4 py-2 rounded-lg text-sm font-medium hover:bg-custom-purple hover:text-custom-light transition-all duration-300 inline-flex items-center justify-center"
                            >
                                <i data-feather="github" class="w-4 h-4 mr-2"></i>
                                Code
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Filter buttons
        const showFeaturedBtn = document.getElementById('show-featured');
        const showAllBtn = document.getElementById('show-all');

        if (showFeaturedBtn && showAllBtn) {
            showFeaturedBtn.addEventListener('click', () => {
                this.showFeatured();
                this.updateActiveFilter(showFeaturedBtn, showAllBtn);
            });

            showAllBtn.addEventListener('click', () => {
                this.showAll();
                this.updateActiveFilter(showAllBtn, showFeaturedBtn);
            });
        }

        // Project card click tracking
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const projectId = card.getAttribute('data-project-id');
                this.trackProjectView(projectId);
            });
        });
    }

    showFeatured() {
        const grid = document.getElementById('projects-grid');
        const loadMoreContainer = document.getElementById('load-more-container');
        
        grid.innerHTML = this.renderProjects(this.featuredProjects);
        loadMoreContainer.style.display = 'none';
        this.showingAll = false;
        
        // Reinitialize icons and event listeners
        feather.replace();
        this.setupProjectEventListeners();
    }

    showAll() {
        const grid = document.getElementById('projects-grid');
        const loadMoreContainer = document.getElementById('load-more-container');
        
        grid.innerHTML = this.renderProjects(this.projects);
        loadMoreContainer.style.display = this.projects.length > 6 ? 'block' : 'none';
        this.showingAll = true;
        
        // Reinitialize icons and event listeners
        feather.replace();
        this.setupProjectEventListeners();
    }

    updateActiveFilter(activeBtn, inactiveBtn) {
        activeBtn.classList.add('active', 'btn-primary');
        activeBtn.classList.remove('border', 'border-custom-purple', 'text-custom-purple');
        
        inactiveBtn.classList.remove('active', 'btn-primary');
        inactiveBtn.classList.add('border', 'border-custom-purple', 'text-custom-purple', 'hover:bg-custom-purple', 'hover:text-custom-light');
    }

    setupProjectEventListeners() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // Only track if not clicking on links
                if (!e.target.closest('a')) {
                    const projectId = card.getAttribute('data-project-id');
                    this.trackProjectView(projectId);
                }
            });
        });
    }

    async trackProjectView(projectId) {
        try {
            // This would typically send analytics to the backend
            console.log(`Project ${projectId} viewed`);
            // await app.apiCall('/analytics/project-view', {
            //     method: 'POST',
            //     body: JSON.stringify({ projectId })
            // });
        } catch (error) {
            console.error('Error tracking project view:', error);
        }
    }

    setupAnimations() {
        // Staggered animation for project cards
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Initially hide all project cards for animation
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
}

// Initialize projects section
new Projects();
