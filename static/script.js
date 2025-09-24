// Main application logic
class PortfolioApp {
    constructor() {
        this.apiUrl = '/api';
        this.components = {};
        this.data = {
            projects: [],
            skills: {},
            loading: false
        };
        this.init();
    }

    async init() {
        try {
            // Initialize components
            await this.loadComponents();
            
            // Load initial data
            await this.loadData();
            
            // Set up navigation
            this.setupNavigation();
            
            // Set up scroll effects
            this.setupScrollEffects();
            
            console.log('Portfolio app initialized successfully');
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }

    async loadComponents() {
        try {
            // Components will be loaded via their individual modules
            // This method can be used for any global component setup
            this.setupContactForm();
        } catch (error) {
            console.error('Error loading components:', error);
        }
    }

    async loadData() {
        this.data.loading = true;
        
        try {
            // Load projects
            const projectsResponse = await this.apiCall('/projects');
            if (projectsResponse.success) {
                this.data.projects = projectsResponse.data;
            }

            // Load skills
            const skillsResponse = await this.apiCall('/skills');
            if (skillsResponse.success) {
                this.data.skills = skillsResponse.data;
            }

            this.data.loading = false;
        } catch (error) {
            console.error('Error loading data:', error);
            this.data.loading = false;
        }
    }

    async apiCall(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.apiUrl}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`API call failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API call to ${endpoint} failed:`, error);
            throw error;
        }
    }

    setupNavigation() {
        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('#mobile-menu-btn');
        const mobileMenu = document.querySelector('#mobile-menu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Update active navigation link on scroll
        window.addEventListener('scroll', this.updateActiveNavigation.bind(this));
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    setupScrollEffects() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    setupContactForm() {
        // Contact form submission will be handled by the Contact component
        // This method can be used for any global form setup
    }

    // Utility methods
    showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
            type === 'success' 
                ? 'bg-green-600 text-white' 
                : 'bg-red-600 text-white'
        }`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    debounce(func, wait) {
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
}

// Global app instance
window.portfolioApp = new PortfolioApp();

// Export for modules
export default window.portfolioApp;
