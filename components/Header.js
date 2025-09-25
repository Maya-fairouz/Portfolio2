import app from '../script.js';

class Header {
    constructor() {
        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const headerElement = document.getElementById('header');
        headerElement.innerHTML = `
            <nav class="fixed top-0 left-0 right-0 bg-custom-darkest/95 backdrop-blur-md border-b border-custom-darker-purple z-50">
                <div class="container mx-auto px-6">
                    <div class="flex items-center justify-between py-4">
                        <!-- Logo -->
                        <div class="text-xl font-display font-bold text-custom-light">
                            <a href="#hero" class="hover:text-custom-purple transition-colors duration-300">
                                MMF
                            </a>
                        </div>

                        <!-- Desktop Navigation -->
                        <div class="hidden md:flex space-x-8">
                            <a href="#about" class="nav-link text-custom-light hover:text-custom-purple transition-colors duration-300">
                                About
                            </a>
                            <a href="#projects" class="nav-link text-custom-light hover:text-custom-purple transition-colors duration-300">
                                Projects
                            </a>
                            <a href="#contact" class="nav-link text-custom-light hover:text-custom-purple transition-colors duration-300">
                                Contact
                            </a>
                        
                           
                        </div> 

                       
                        <!-- Mobile Menu Button -->
                        <button id="mobile-menu-btn" class="md:hidden text-custom-light p-2">
                            <i data-feather="menu" class="w-6 h-6"></i>
                        </button>
                    </div>

                    <!-- Mobile Navigation -->
                    <div id="mobile-menu" class="hidden md:hidden pb-4">
                        <div class="flex flex-col space-y-4">
                            <a href="#about" class="nav-link text-custom-light hover:text-custom-purple transition-colors duration-300 py-2">
                                About
                            </a>
                            <a href="#projects" class="nav-link text-custom-light hover:text-custom-purple transition-colors duration-300 py-2">
                                Projects
                            </a>
                            <a href="#contact" class="nav-link text-custom-light hover:text-custom-purple transition-colors duration-300 py-2">
                                Contact
                            </a>

                        </div>
                    </div>
                </div>
            </nav>
        `;

        // Reinitialize Feather icons for the header
        feather.replace();
    }

    setupEventListeners() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');


        console.log(mobileMenuBtn, mobileMenu , "this bullshit 1")
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                
                // Toggle menu icon
                const icon = mobileMenuBtn.querySelector('[data-feather]');
                if (mobileMenu.classList.contains('hidden')) {
                    icon.setAttribute('data-feather', 'menu');
                } else {
                    icon.setAttribute('data-feather', 'x');
                }
                feather.replace();
            });
        }

        // Close mobile menu when clicking on links
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('[data-feather]');
                icon.setAttribute('data-feather', 'menu');
                feather.replace();
            });
        });
    }
}

// Initialize header
new Header();
