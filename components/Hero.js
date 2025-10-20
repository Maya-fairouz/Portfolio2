import app from '../script.js';

class Hero {
    constructor() {
        this.init();
    }

    init() {
        this.render();
        this.setupAnimations();
    }

    render() {
        const heroElement = document.getElementById('hero');
        heroElement.innerHTML = `
            <div class="hero-gradient relative overflow-hidden pt-10 pb-18">
                <!-- Animated background elements -->
                <div class="absolute inset-0 overflow-hidden">
                    <div class="hero-particle hero-particle-1"></div>
                    <div class="hero-particle hero-particle-2"></div>
                    <div class="hero-particle hero-particle-3"></div>
                    <div class="hero-grid"></div>
                </div>
                
                <div class="relative z-10 flex items-center justify-center px-6 min-h-screen">
                    <div class="container mx-auto">
                        <div class="max-w-5xl mx-auto text-center">
                            <!-- Greeting with enhanced styling -->
                            <div class="inline-flex items-center space-x-2 mb-6 animate-fade-in" style="animation-delay: 0.2s;">
                                <div class="w-2 h-2 bg-custom-purple rounded-full animate-pulse"></div>
                                <p class="text-custom-purple text-lg md:text-xl font-medium">
                                    Hi there, I'm
                                </p>
                                <div class="w-2 h-2 bg-custom-purple rounded-full animate-pulse" style="animation-delay: 0.5s;"></div>
                            </div>
                            
                            <!-- Name glow -->
                            <h1 class="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-custom-light mb-6 animate-fade-in-up enhanced-glow leading-tight" style="animation-delay: 0.4s;">
                                Maya Fairouz <br> Menaifi 
                            </h1>
                            
                            <!-- Subtitle with typing effect -->
                            <div class="mb-10 animate-fade-in-up" style="animation-delay: 0.6s;">
                                <h2 class="text-1xl md:text-3xl lg:text-4xl font-display text-custom-purple mb-2">
                                    Data Scientist & Backend Developer
                                </h2>
                                <div class="text-lg md:text-xl text-custom-light/70">
                            <!--         <span class="typing-text">Building amazing digital experiences</span> -->
                            <!--  <span class="typing-cursor">|</span> -->
                                    
                                </div>
                            </div>
                            
                            <p class="text-lg md:text-l text-custom-light/85 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style="animation-delay: 0.8s;">
                                
                            I create modern, responsive web applications with clean code and beautiful user experiences, and analyze and model data to extract insights and support data-driven decisions.
                            Passionate about turning complex problems into simple, elegant solutions.
                            </p>
                            
                            <!--  CTA Buttons -->
                            <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8 animate-fade-in-up" style="animation-delay: 1s;">
                                <a href="#projects" class="btn-primary px-10 py-3 rounded-xl text-custom-light font-semibold text-lg hover-scale inline-flex items-center group">
                                    <span>View My Work</span>
                                    <i data-feather="arrow-right" class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                                </a>



                                <a href="/resume.pdf" target="_blank" class="hero-secondary-btn px-10 py-3 rounded-xl font-semibold text-lg hover-scale inline-flex items-center group">
                                    <i data-feather="download" class="w-5 h-5 mr-2"></i>
                                    Download Resume
                                </a>
                                
                            </div>
                            
                            <!-- Social Links -->
                            <div class="flex justify-center space-x-8 animate-fade-in" style="animation-delay: 1.2s;">
                                <a href="https://github.com/Maya-fairouz" target="_blank" rel="noopener noreferrer" class="social-link group">
                                    <div class="social-icon-wrapper">
                                        <i data-feather="github" class="w-6 h-6"></i>
                                    </div>
                                    <span class="social-tooltip">GitHub</span>
                                </a>
                                <a href="https://www.linkedin.com/in/maya-fa%C3%AFrouz-64b5b21bb/" target="_blank" rel="noopener noreferrer" class="social-link group">
                                    <div class="social-icon-wrapper">
                                        <i data-feather="linkedin" class="w-6 h-6"></i>
                                    </div>
                                    <span class="social-tooltip">LinkedIn</span>
                                </a>
                                <a href="mailto:menaifimaya6@gmail.com" class="social-link group">
                                    <div class="social-icon-wrapper">
                                        <i data-feather="mail" class="w-6 h-6"></i>
                                    </div>
                                    <span class="social-tooltip">Email</span>
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
        // Subtle parallax effect on scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.getElementById('hero');
            const parallax = scrolled * 0.05; // Reduced parallax intensity
            
            // Only apply parallax while hero is visible
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${parallax}px)`;
            }
        });

        // Initialize typing animation
        this.startTypingAnimation();
    }

    startTypingAnimation() {
        const texts = [
            "Building amazing digital experiences",
            "Creating modern web applications", 
            "Crafting beautiful user interfaces",
            "Solving complex problems"
        ];
        
        let currentTextIndex = 0;
        const typingElement = document.querySelector('.typing-text');
        
        if (!typingElement) return;

        const typeText = (text, callback) => {
            let charIndex = 0;
            typingElement.textContent = '';
            
            const typeChar = () => {
                if (charIndex < text.length) {
                    typingElement.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, 50);
                } else {
                    setTimeout(() => {
                        if (callback) callback();
                    }, 2000);
                }
            };
            
            typeChar();
        };

        const eraseText = (callback) => {
            const currentText = typingElement.textContent;
            let charIndex = currentText.length;
            
            const eraseChar = () => {
                if (charIndex > 0) {
                    typingElement.textContent = currentText.substring(0, charIndex - 1);
                    charIndex--;
                    setTimeout(eraseChar, 30);
                } else {
                    setTimeout(() => {
                        if (callback) callback();
                    }, 500);
                }
            };
            
            eraseChar();
        };

        const cycleText = () => {
            typeText(texts[currentTextIndex], () => {
                eraseText(() => {
                    currentTextIndex = (currentTextIndex + 1) % texts.length;
                    cycleText();
                });
            });
        };

        // Start the animation after initial delay
        setTimeout(() => {
            cycleText();
        }, 1500);
    }
}

// Initialize hero
new Hero();
