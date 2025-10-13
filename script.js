// // Main application logic
// class PortfolioApp {
//     constructor() {
//         this.apiUrl = '/api';
//         this.components = {};
//         this.data = {
//             projects: [],
//             skills: {},
//             loading: false
//         };
//         this.init();
//     }

//     async init() {
//         try {
//             // Initialize components
//             await this.loadComponents();
            
//             // Load initial data
//             await this.loadData();
            
//             // Set up navigation
//             this.setupNavigation();
            
//             // Set up scroll effects
//             this.setupScrollEffects();
            
//             console.log('Portfolio app initialized successfully');
//         } catch (error) {
//             console.error('Error initializing app:', error);
//         }
//     }

//     async loadComponents() {
//         try {
//             // Components will be loaded via their individual modules
//             // This method can be used for any global component setup
//             this.setupContactForm();
//         } catch (error) {
//             console.error('Error loading components:', error);
//         }
//     }

//     async loadData() {
//         this.data.loading = true;
        
//         try {
//             // Load projects
//             const projectsResponse = await this.apiCall('/projects');
//             if (projectsResponse.success) {
//                 this.data.projects = projectsResponse.data;
//             }

//             // Load skills
//             const skillsResponse = await this.apiCall('/skills');
//             if (skillsResponse.success) {
//                 this.data.skills = skillsResponse.data;
//             }

//             this.data.loading = false;
//         } catch (error) {
//             console.error('Error loading data:', error);
//             this.data.loading = false;
//         }
//     }

//     async apiCall(endpoint, options = {}) {
//         try {
//             const response = await fetch(`${this.apiUrl}${endpoint}`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     ...options.headers
//                 },
//                 ...options
//             });

//             if (!response.ok) {
//                 throw new Error(`API call failed: ${response.statusText}`);
//             }

//             return await response.json();
//         } catch (error) {
//             console.error(`API call to ${endpoint} failed:`, error);
//             throw error;
//         }
//     }

//     setupNavigation() {
//         // Mobile menu toggle
//         const mobileMenuBtn = document.querySelector('#mobile-menu-btn');
//         const mobileMenu = document.querySelector('#mobile-menu');

//         if (mobileMenuBtn && mobileMenu) {
//             mobileMenuBtn.addEventListener('click', () => {
//                 mobileMenu.classList.toggle('hidden');
//             });
//         }

//         // Smooth scroll for navigation links
//         document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//             anchor.addEventListener('click', (e) => {
//                 e.preventDefault();
//                 const target = document.querySelector(anchor.getAttribute('href'));
//                 if (target) {
//                     target.scrollIntoView({
//                         behavior: 'smooth',
//                         block: 'start'
//                     });
//                 }
//             });
//         });

//         // Update active navigation link on scroll
//         window.addEventListener('scroll', this.updateActiveNavigation.bind(this));
//     }

//     updateActiveNavigation() {
//         const sections = document.querySelectorAll('section[id]');
//         const navLinks = document.querySelectorAll('.nav-link');
        
//         let current = '';
        
//         sections.forEach(section => {
//             const sectionTop = section.offsetTop;
//             const sectionHeight = section.clientHeight;
            
//             if (scrollY >= (sectionTop - 200)) {
//                 current = section.getAttribute('id');
//             }
//         });

//         navLinks.forEach(link => {
//             link.classList.remove('active');
//             if (link.getAttribute('href') === `#${current}`) {
//                 link.classList.add('active');
//             }
//         });
//     }

//     setupScrollEffects() {
//         // Intersection Observer for fade-in animations
//         const observerOptions = {
//             threshold: 0.1,
//             rootMargin: '0px 0px -50px 0px'
//         };

//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     entry.target.classList.add('animate-fade-in-up');
//                 }
//             });
//         }, observerOptions);

//         // Observe elements that should animate on scroll
//         document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
//             observer.observe(el);
//         });
//     }

//     setupContactForm() {
//         // Contact form submission will be handled by the Contact component
//         // This method can be used for any global form setup
//     }

//     // Utility methods
//     showNotification(message, type = 'success') {
//         // Create notification element
//         const notification = document.createElement('div');
//         notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
//             type === 'success' 
//                 ? 'bg-green-600 text-white' 
//                 : 'bg-red-600 text-white'
//         }`;
//         notification.textContent = message;

//         document.body.appendChild(notification);

//         // Auto-remove after 5 seconds
//         setTimeout(() => {
//             notification.style.opacity = '0';
//             setTimeout(() => {
//                 document.body.removeChild(notification);
//             }, 300);
//         }, 5000);
//     }

//     formatDate(dateString) {
//         const options = { year: 'numeric', month: 'long', day: 'numeric' };
//         return new Date(dateString).toLocaleDateString(undefined, options);
//     }

//     debounce(func, wait) {
//         let timeout;
//         return function executedFunction(...args) {
//             const later = () => {
//                 clearTimeout(timeout);
//                 func(...args);
//             };
//             clearTimeout(timeout);
//             timeout = setTimeout(later, wait);
//         };
//     }
// }

// // Global app instance
// window.portfolioApp = new PortfolioApp();

// // Export for modules
// export default window.portfolioApp;



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
        
        // Mock data to replace API calls
        this.mockData = {
            projects: [
    {
                    id: 1,
                    title: "Enhancing Information Retrieval with Query Expansion",
                    description: " An Information Retrieval system to improves search relevance by automatically expanding queries with semantically related terms. Leveraged Word2Vec embedding and evaluated performance using Terrier4 with BM25 ranking.",
                    image_url: "./media/search.png",
                    technologies: ["Python", "NLTK", "Gensim", "NumPy", "pandas", "Word2Vec", "Terrier4", "Jupyter Notebook"],
                    project_url: "https://github.com/Maya-fairouz/IR-assignment",
                    github_url: "https://github.com/Maya-fairouz/IR-assignment",
                    featured: true
                },
                {

                    id: 2,
                    title: "Harmful Insect Classification Model",
                    description: "Built a deep learning CNN to classify 15 species of harmful agricultural insects using TensorFlow, improving pest identification accuracy for precision farming.",
                    image_url: "./media/7.jpg",
                    technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "NumPy"],
                    project_url: "https://github.com/Maya-fairouz/insects_classification",
                    github_url: "https://github.com/Maya-fairouz/insects_classification",
                    featured: true
                },
                {
                    id: 3,
                    title: "AI-Powered Bladder Cancer Detection System",
                    description: "Developed an AI-powered diagnostic tool for bladder cancer classification using deep learning and VGG16. It analyzes histopathological images to assist doctors in making faster, data-driven decisions. Includes a companion web app for real-time testing and visualization of model predictions.",
                    image_url: "./media/cancer.jpeg",
                    technologies: ["Python", "TensorFlow", "Keras", "scikit-learn", "Pandas", "NumPy", "Matplotlib"],
                    project_url: "https://github.com/Maya-fairouz/Cancer_Detection_System",
                    github_url: "https://github.com/Maya-fairouz/Cancer_Detection_System",
                    featured: true
                },
                {
                    id: 4,
                    title: "Social Media Sentiment Analysis",
                    description: "Built a system to analyze sentiment in social media posts using NLP techniques and deep learning models.",
                    image_url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                    technologies: ["Python", "NLTK", "TensorFlow", "Twitter API", "FastAPI"],
                    project_url: "https://github.com/Maya-fairouz",
                    github_url: "https://github.com/Maya-fairouz",
                    featured: false
                },
                {
                    id: 5,
                    title: "Financial Portfolio Tracker",
                    description: "Developed a web application to track investment portfolios with automated data fetching and performance analysis.",
                    image_url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                    technologies: ["React", "Python", "Alpha Vantage API", "PostgreSQL", "Chart.js"],
                    project_url: "https://github.com/Maya-fairouz",
                    github_url: "https://github.com/Maya-fairouz",
                    featured: false
                },
                {
                    id: 6,
                    title: "Weather Prediction System",
                    description: "Created a weather prediction system using historical data and machine learning algorithms with web interface.",
                    image_url: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                    technologies: ["Python", "Prophet", "Flask", "OpenWeatherMap API", "Bootstrap"],
                    project_url: "https://github.com/Maya-fairouz",
                    github_url: "https://github.com/Maya-fairouz",
                    featured: false
                }
            ],
            skills: {
                languages: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'R'],
                frontend: ['React', 'Vue.js', 'HTML/CSS', 'TailwindCSS', 'Bootstrap'],
                backend: ['Flask', 'FastAPI', 'Node.js', 'Express', 'Django'],
                databases: ['PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'MySQL'],
                tools: ['Git', 'Docker', 'AWS', 'Jupyter', 'VS Code'],
                datascience: ['Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'Plotly']
            }
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
            // Simulate API delay for better UX
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Load projects from mock data
            this.data.projects = this.mockData.projects;

            // Load skills from mock data
            this.data.skills = this.mockData.skills;

            this.data.loading = false;
        } catch (error) {
            console.error('Error loading data:', error);
            this.data.loading = false;
        }
    }

    async apiCall(endpoint, options = {}) {
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // Mock API responses based on endpoint
            if (endpoint === '/projects') {
                return {
                    success: true,
                    data: this.mockData.projects
                };
            } else if (endpoint === '/skills') {
                return {
                    success: true,
                    data: this.mockData.skills
                };
            } else if (endpoint === '/contact' && options.method === 'POST') {
                // Simulate contact form submission
                console.log('Contact form submitted:', options.body);
                return {
                    success: true,
                    message: 'Thank you for your message! I\'ll get back to you soon.'
                };
            }
            
            // Default response for unknown endpoints
            return {
                success: false,
                error: 'Endpoint not found'
            };
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