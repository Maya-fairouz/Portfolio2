import app from '../script.js';

class Contact {
    constructor() {
        this.formData = {
            name: '',
            email: '',
            message: ''
        };
        this.isSubmitting = false;
        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
        this.setupAnimations();
    }

    render() {
        const contactElement = document.getElementById('contact');
        contactElement.innerHTML = `
            <div class="py-20 px-6 bg-custom-dark-bg">
                <div class="container mx-auto max-w-4xl">
                    <!-- Section Header -->
                    <div class="text-center mb-16 fade-in-on-scroll">
                        <h2 class="section-title text-3xl md:text-4xl lg:text-5xl font-display font-bold text-custom-light mb-6">
                            Get In Touch
                        </h2>
                        <p class="text-lg text-custom-light/70 max-w-2xl mx-auto">
                            I'm always interested in new opportunities and collaborations. Let's connect and discuss how we can work together.
                        </p>
                    </div>

                    <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
                        <!-- Contact Information -->
                        <div class="fade-in-on-scroll">
                            <h3 class="text-2xl font-semibold text-custom-light mb-8">Let's Connect</h3>
                            
                            <div class="space-y-6 mb-8">
                                <!-- Email -->
                                <div class="flex items-center space-x-4">
                                    <div class="w-12 h-12 bg-custom-purple/20 rounded-lg flex items-center justify-center">
                                        <i data-feather="mail" class="w-6 h-6 text-custom-purple"></i>
                                    </div>
                                    <div>
                                        <div class="font-medium text-custom-light">Email</div>
                                        <a href="mailto:menaifimaya6@gmail.com" class="text-custom-purple hover:text-custom-light transition-colors duration-300">
                                            menaifimaya6@gmail.com
                                        </a>
                                    </div>
                                </div>
                                
                                <!-- Phone -->
                                <div class="flex items-center space-x-4">
                                    <div class="w-12 h-12 bg-custom-purple/20 rounded-lg flex items-center justify-center">
                                        <i data-feather="phone" class="w-6 h-6 text-custom-purple"></i>
                                    </div>
                                    <div>
                                        <div class="font-medium text-custom-light">Phone</div>
                                        <a href="tel:+213792571610" class="text-custom-purple hover:text-custom-light transition-colors duration-300">
                                            +(213) 792571610
                                        </a>
                                    </div>
                                </div>
                                
                                <!-- Location -->
                                <div class="flex items-center space-x-4">
                                    <div class="w-12 h-12 bg-custom-purple/20 rounded-lg flex items-center justify-center">
                                        <i data-feather="map-pin" class="w-6 h-6 text-custom-purple"></i>
                                    </div>
                                    <div>
                                        <div class="font-medium text-custom-light">Location</div>
                                        <div class="text-custom-light/80">Constantine, Algeria</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Social Links -->
                            <div>
                                <h4 class="font-medium text-custom-light mb-4">Follow Me</h4>
                                <div class="flex space-x-4">
                                    <a href="https://github.com/Maya-fairouz" target="_blank" rel="noopener noreferrer" class="w-10 h-10 bg-custom-purple/20 rounded-lg flex items-center justify-center text-custom-purple hover:bg-custom-purple hover:text-custom-light transition-all duration-300 hover-scale">
                                        <i data-feather="github" class="w-5 h-5"></i>
                                    </a>
                                    <a href="https://www.linkedin.com/in/maya-faïrouz-64b5b21bb/" target="_blank" rel="noopener noreferrer" class="w-10 h-10 bg-custom-purple/20 rounded-lg flex items-center justify-center text-custom-purple hover:bg-custom-purple hover:text-custom-light transition-all duration-300 hover-scale">
                                        <i data-feather="linkedin" class="w-5 h-5"></i>
                                    </a>
                             
                                </div>
                            </div>
                        </div>

                        <!-- Contact Form -->
                        <div class="fade-in-on-scroll">
                            <form id="contact-form" class="space-y-6">
                                <!-- Name Field -->
                                <div>
                                    <label for="name" class="block text-sm font-medium text-custom-light mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        class="form-input w-full px-4 py-3 rounded-lg text-custom-light placeholder-custom-light/50 focus:outline-none focus:ring-2 focus:ring-custom-purple/50"
                                        placeholder="Your full name"
                                    />
                                    <div class="error-message text-red-400 text-sm mt-1 hidden"></div>
                                </div>

                                <!-- Email Field -->
                                <div>
                                    <label for="email" class="block text-sm font-medium text-custom-light mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        class="form-input w-full px-4 py-3 rounded-lg text-custom-light placeholder-custom-light/50 focus:outline-none focus:ring-2 focus:ring-custom-purple/50"
                                        placeholder="your@email.com"
                                    />
                                    <div class="error-message text-red-400 text-sm mt-1 hidden"></div>
                                </div>

                                <!-- Message Field -->
                                <div>
                                    <label for="message" class="block text-sm font-medium text-custom-light mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="6"
                                        required
                                        class="form-input w-full px-4 py-3 rounded-lg text-custom-light placeholder-custom-light/50 focus:outline-none focus:ring-2 focus:ring-custom-purple/50 resize-vertical"
                                        placeholder="Tell me about your project or just say hello..."
                                    ></textarea>
                                    <div class="error-message text-red-400 text-sm mt-1 hidden"></div>
                                </div>

                                <!-- Submit Button -->
                                <div>
                                    <button
                                        type="submit"
                                        id="submit-btn"
                                        class="btn-primary w-full px-8 py-4 rounded-lg text-custom-light font-medium text-lg hover-scale disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                                    >
                                        <span id="submit-text">Send Message</span>
                                        <span id="submit-loading" class="hidden">
                                            <i data-feather="loader" class="w-5 h-5 mr-2 animate-spin inline"></i>
                                            Sending...
                                        </span>
                                    </button>
                                </div>

                                <!-- Success/Error Messages -->
                                <div id="form-messages" class="hidden">
                                    <div id="success-message" class="bg-green-600/20 border border-green-600/30 text-green-400 px-4 py-3 rounded-lg hidden">
                                        <div class="flex items-center">
                                            <i data-feather="check-circle" class="w-5 h-5 mr-2"></i>
                                            <span></span>
                                        </div>
                                    </div>
                                    <div id="error-message" class="bg-red-600/20 border border-red-600/30 text-red-400 px-4 py-3 rounded-lg hidden">
                                        <div class="flex items-center">
                                            <i data-feather="alert-circle" class="w-5 h-5 mr-2"></i>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Reinitialize Feather icons
        feather.replace();
    }

    setupEventListeners() {
        const form = document.getElementById('contact-form');
        
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
            
            // Real-time validation
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }
    }

    validateField(field) {
        const value = field.value.trim();
        const errorElement = field.nextElementSibling;
        
        let isValid = true;
        let errorMessage = '';

        switch (field.name) {
            case 'name':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Name is required';
                } else if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;
            
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    isValid = false;
                    errorMessage = 'Email is required';
                } else if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            
            case 'message':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Message is required';
                } else if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
        }

        if (isValid) {
            field.classList.remove('border-red-400');
            field.classList.add('border-custom-purple');
            errorElement.classList.add('hidden');
        } else {
            field.classList.remove('border-custom-purple');
            field.classList.add('border-red-400');
            errorElement.textContent = errorMessage;
            errorElement.classList.remove('hidden');
        }

        return isValid;
    }

    clearFieldError(field) {
        field.classList.remove('border-red-400');
        const errorElement = field.nextElementSibling;
        errorElement.classList.add('hidden');
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (this.isSubmitting) return;

        const form = e.target;
        const formData = new FormData(form);
        
        // Validate all fields
        const inputs = form.querySelectorAll('input, textarea');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) return;

        // Prepare data
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        this.setSubmittingState(true);

        try {
            const response = await app.apiCall('/contact', {
                method: 'POST',
                body: JSON.stringify(data)
            });

            if (response.success) {
                this.showSuccessMessage(response.message);
                form.reset();
            } else {
                this.showErrorMessage(response.error || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Contact form submission error:', error);
            this.showErrorMessage('An error occurred while sending your message. Please try again or contact me directly.');
        } finally {
            this.setSubmittingState(false);
        }
    }

    setSubmittingState(isSubmitting) {
        this.isSubmitting = isSubmitting;
        const submitBtn = document.getElementById('submit-btn');
        const submitText = document.getElementById('submit-text');
        const submitLoading = document.getElementById('submit-loading');

        if (isSubmitting) {
            submitBtn.disabled = true;
            submitText.classList.add('hidden');
            submitLoading.classList.remove('hidden');
        } else {
            submitBtn.disabled = false;
            submitText.classList.remove('hidden');
            submitLoading.classList.add('hidden');
        }

        // Re-initialize feather icons for loading spinner
        feather.replace();
    }

    showSuccessMessage(message) {
        const messagesContainer = document.getElementById('form-messages');
        const successMessage = document.getElementById('success-message');
        const errorMessage = document.getElementById('error-message');

        successMessage.querySelector('span').textContent = message;
        successMessage.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        messagesContainer.classList.remove('hidden');

        feather.replace();

        // Auto-hide after 5 seconds
        setTimeout(() => {
            messagesContainer.classList.add('hidden');
        }, 5000);
    }

    showErrorMessage(message) {
        const messagesContainer = document.getElementById('form-messages');
        const successMessage = document.getElementById('success-message');
        const errorMessage = document.getElementById('error-message');

        errorMessage.querySelector('span').textContent = message;
        errorMessage.classList.remove('hidden');
        successMessage.classList.add('hidden');
        messagesContainer.classList.remove('hidden');

        feather.replace();

        // Auto-hide after 7 seconds (longer for errors)
        setTimeout(() => {
            messagesContainer.classList.add('hidden');
        }, 7000);
    }

    setupAnimations() {
        // Add floating animation to contact form
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('mouseenter', () => {
                form.style.transform = 'translateY(-5px)';
            });
            
            form.addEventListener('mouseleave', () => {
                form.style.transform = 'translateY(0)';
            });
        }
    }
}

// Initialize contact section
new Contact();
