import app from '../script.js';

class About {
    constructor() {
        this.skills = {};
        this.init();
    }

    async init() {
        await this.loadSkills();
        this.render();
        this.setupAnimations();
    }

    async loadSkills() {
        try {
            const response = await app.apiCall('/skills');
            if (response.success) {
                this.skills = response.data;
            }
        } catch (error) {
            console.error('Error loading skills:', error);
            // Fallback skills data
            this.skills = {
                languages: ['JavaScript', 'Python', 'TypeScript'],
                frontend: ['React', 'Vue.js', 'TailwindCSS'],
                backend: ['Node.js', 'Flask', 'Django'],
                databases: ['MongoDB', 'PostgreSQL', 'Redis'],
                tools: ['Git', 'Docker', 'AWS'],
                ddd: ['aaa', 'Docker', 'AWS'],

            };
        }
    }

    render() {
        const aboutElement = document.getElementById('about');
        aboutElement.innerHTML = `
            <div class="py-20 px-6 bg-custom-dark-bg">
                <div class="container mx-auto max-w-6xl">
                    <!-- Section Header -->
                    <div class="text-center mb-16 fade-in-on-scroll">
                        <h2 class="section-title text-3xl md:text-4xl lg:text-5xl font-display font-bold text-custom-light mb-6">
                            About Me
                        </h2>
                        <p class="text-lg text-custom-light/70 max-w-2xl mx-auto">
                            Get to know more about my background, skills, and passion for development
                        </p>
                    </div>

                    <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <!-- Bio Section -->
                        <div class="fade-in-on-scroll">
                            <h3 class="text-2xl font-semibold text-custom-light mb-8">Education😍</h3>                        
                            <div class="prose prose-lg prose-invert max-w-none">
                                <p class="text-custom-light/90 leading-relaxed mb-6">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                
                                <p class="text-custom-light/90 leading-relaxed mb-6">
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                                
                                <p class="text-custom-light/90 leading-relaxed mb-8">
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.
                                </p>                                <p class="text-custom-light/90 leading-relaxed mb-8">
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.
                                </p>

                               
                                

                                <!-- Personal Interests -->
                                <div class="mb-8">
                                    <h3 class="text-xl font-semibold text-custom-light mb-4">When I'm not coding</h3>
                                    <div class="flex flex-wrap gap-2">
                                        ${['Photography', 'Hiking', 'Reading', 'Gaming', 'Cooking'].map(interest => `
                                            <span class="skill-tag px-3 py-1 rounded-full text-sm text-custom-light">
                                                ${interest}
                                            </span>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Skills Section -->
                        <div class="fade-in-on-scroll">
                            <h3 class="text-2xl font-semibold text-custom-light mb-8">Technical Skills ❤️</h3>
                            
                            ${Object.entries(this.skills).map(([category, skillList]) => `
                                <div class="mb-8">
                                    <h4 class="text-lg font-medium text-custom-purple mb-4 capitalize">
                                        ${category.replace(/([A-Z])/g, ' $1').trim()}
                                    </h4>
                                    <div class="flex flex-wrap gap-2">
                                        ${skillList.map(skill => `
                                            <span class="skill-tag px-3 py-2 rounded-lg text-sm text-custom-light">
                                                ${skill}
                                            </span>
                                        `).join('')}
                                    </div>
                                </div>
                            `).join('')}

                            <!-- Download Resume Button -->
                            <div class="mt-8">
                                <a href="/resume.pdf" target="_blank" class="btn-primary px-6 py-3 rounded-lg text-custom-light font-medium inline-flex items-center hover-scale">
                                    <i data-feather="download" class="w-5 h-5 mr-2"></i>
                                    Download Resume
                                </a>
                            </div>
                        </div>
                    </div>

 
                </div>
            </div>
        `;

        // Reinitialize Feather icons
        feather.replace();
    }

  

    setupAnimations() {
        // Skill tags animation on hover
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Initialize about section
new About();
