// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {

    // Loading Screen
    const loadingScreen = document.getElementById('loading-screen');

    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            initializeAnimations();
        }, 2000);
    });

    // Mobile Navigation
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Particle System
    function createParticles() {
        const particlesContainer = document.getElementById('particles-container');
        const particleCount = window.innerWidth > 768 ? 50 : 25;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';

            // Random colors between white and purple
            const colors = ['#ffffff', '#8B5CF6', '#A855F7', '#C084FC'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];

            particlesContainer.appendChild(particle);
        }
    }

    // Typing Animation
    function typeWriter() {
        const texts = [
            'DevOps Engineer',
            'AWS Trainer',
            'Cloud Community Builder',
            'CI/CD Specialist',
            'Kubernetes Expert'
        ];

        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 100 : 150;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }

    // Skill Bar Animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');

        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }

    // Intersection Observer for Animations
    function observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');

                    // Animate skill bars when skills section is visible
                    if (entry.target.classList.contains('skills')) {
                        setTimeout(animateSkillBars, 500);
                    }
                }
            });
        }, observerOptions);

        // Observe all sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            observer.observe(section);
        });

        // Observe individual elements
        const elementsToObserve = document.querySelectorAll('.about-card, .skill-category, .timeline-item, .project-card');
        elementsToObserve.forEach(element => {
            observer.observe(element);
        });
    }

    // Contact Form Handling
    function handleContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Simulate form submission
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;

            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;

            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                form.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Navbar Scroll Effect
    function handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
                navbar.style.padding = '0.5rem 0';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.9)';
                navbar.style.padding = '1rem 0';
            }
        });
    }

    // Cursor Trail Effect
    function createCursorTrail() {
        if (window.innerWidth <= 768) return; // Skip on mobile

        const trail = [];
        const trailLength = 20;

        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-dot';
            dot.style.position = 'fixed';
            dot.style.width = '4px';
            dot.style.height = '4px';
            dot.style.background = '#8B5CF6';
            dot.style.borderRadius = '50%';
            dot.style.pointerEvents = 'none';
            dot.style.zIndex = '9999';
            dot.style.opacity = '0';
            dot.style.transition = 'opacity 0.3s ease';
            document.body.appendChild(dot);
            trail.push(dot);
        }

        document.addEventListener('mousemove', function(e) {
            trail.forEach((dot, index) => {
                setTimeout(() => {
                    dot.style.left = e.clientX + 'px';
                    dot.style.top = e.clientY + 'px';
                    dot.style.opacity = (trailLength - index) / trailLength;
                }, index * 50);
            });
        });
    }

    // 3D Tilt Effect for Cards
    function add3DTiltEffect() {
        const cards = document.querySelectorAll('.about-card, .skill-category, .project-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'perspective(1000px) rotateX(10deg) rotateY(10deg) translateZ(20px)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });

            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;

                const rotateX = (mouseY / rect.height) * 30;
                const rotateY = (mouseX / rect.width) * 30;

                this.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            });
        });
    }

    // Parallax Effect
    function addParallaxEffect() {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            const particles = document.getElementById('particles-container');
            if (particles) {
                particles.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Initialize All Animations
    function initializeAnimations() {
        createParticles();
        typeWriter();
        observeElements();
        handleContactForm();
        handleNavbarScroll();
        createCursorTrail();
        add3DTiltEffect();
        addParallaxEffect();
    }

    // Responsive handling
    function handleResize() {
        window.addEventListener('resize', function() {
            // Recreate particles on resize
            const particlesContainer = document.getElementById('particles-container');
            if (particlesContainer) {
                particlesContainer.innerHTML = '';
                createParticles();
            }
        });
    }

    // Initialize resize handler
    handleResize();

    // Performance optimization
    function optimizePerformance() {
        // Reduce animations on low-end devices
        const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

        if (isLowEndDevice) {
            document.body.classList.add('low-end-device');

            // Disable heavy animations
            const style = document.createElement('style');
            style.textContent = `
                .low-end-device .particle {
                    animation: none !important;
                }
                .low-end-device .cube {
                    animation: rotateCube 8s infinite linear !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Initialize performance optimizations
    optimizePerformance();

    // Add loading animation to buttons
    function addButtonAnimations() {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(button => {
            button.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }

    // Initialize button animations
    addButtonAnimations();

    // Preload images for better performance
    function preloadImages() {
        const images = [
            'profile.jpg'
        ];

        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Initialize image preloading
    preloadImages();

    // Add smooth scroll behavior for older browsers
    function smoothScrollPolyfill() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));

                    if (target) {
                        const targetPosition = target.offsetTop - 70;
                        const startPosition = window.pageYOffset;
                        const distance = targetPosition - startPosition;
                        const duration = 1000;
                        let start = null;

                        function animation(currentTime) {
                            if (start === null) start = currentTime;
                            const timeElapsed = currentTime - start;
                            const run = ease(timeElapsed, startPosition, distance, duration);
                            window.scrollTo(0, run);
                            if (timeElapsed < duration) requestAnimationFrame(animation);
                        }

                        function ease(t, b, c, d) {
                            t /= d / 2;
                            if (t < 1) return c / 2 * t * t + b;
                            t--;
                            return -c / 2 * (t * (t - 2) - 1) + b;
                        }

                        requestAnimationFrame(animation);
                    }
                }
            });
        });
    }

    // Initialize smooth scroll polyfill
    smoothScrollPolyfill();

    // Add active navigation highlighting
    function highlightActiveNavigation() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', function() {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Initialize active navigation highlighting
    highlightActiveNavigation();

    // Add CSS for active navigation
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--primary-color) !important;
        }
        .nav-link.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);

    console.log('Portfolio initialized successfully!');
});

// Service Worker for better performance (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
