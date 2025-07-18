// Global variables
let particles = [];
let mouseX = 0;
let mouseY = 0;
let isLoading = true;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeLoading();
    initializeCursor();
    initializeParticles();
    initializeScrollAnimations();
    initializeNavigation();
    initializeContactForm();
    initializeSkillAnimations();
    initializeProjectCards();
    initializeHoverEffects();
    initializeButtons();
    
    // Start loading sequence
    setTimeout(hideLoading, 3000);
}

// Loading Screen Animation
function initializeLoading() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingText = document.querySelector('.loading-text');
    
    if (!loadingScreen || !loadingText) return;
    
    // Animate loading text
    const texts = ['Loading Experience...', 'Initializing 3D World...', 'Almost Ready...'];
    let textIndex = 0;
    
    const textInterval = setInterval(() => {
        if (textIndex < texts.length - 1) {
            textIndex++;
            loadingText.textContent = texts[textIndex];
        } else {
            clearInterval(textInterval);
        }
    }, 1000);
}

function hideLoading() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            isLoading = false;
            triggerHeroAnimations();
            initializeTypingEffect();
        }, 500);
    }
}

// Custom Cursor Trail with Purple theme
function initializeCursor() {
    const cursor = document.querySelector('.cursor-trail');
    if (!cursor) return;
    
    let cursorX = 0;
    let cursorY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', (e) => {
        if (isLoading) return;
        
        targetX = e.clientX;
        targetY = e.clientY;
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateCursor() {
        if (isLoading) return;
        
        cursorX += (targetX - cursorX) * 0.1;
        cursorY += (targetY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
}

// Enhanced Particle System with White and Purple particles
function initializeParticles() {
    const particleContainer = document.querySelector('.particles');
    if (!particleContainer) return;
    
    function createParticle() {
        if (isLoading) return;
        
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        // Randomly choose between purple and white particles
        const isPurple = Math.random() > 0.5;
        if (isPurple) {
            particle.style.background = '#8B5CF6';
            particle.style.boxShadow = '0 0 10px rgba(139, 92, 246, 0.8)';
        } else {
            particle.style.background = '#ffffff';
            particle.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
        }
        
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 6000);
    }
    
    // Create particles continuously
    setInterval(createParticle, 300);
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animateOnScroll(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Observe specific elements
    document.querySelectorAll('.timeline-item, .skill-item, .project-card-3d, .contact-item-3d').forEach(item => {
        item.classList.add('fade-in');
        observer.observe(item);
    });
}

function animateOnScroll(element) {
    // Add specific animations based on element type
    if (element.classList.contains('timeline-item')) {
        element.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0)';
    } else if (element.classList.contains('skill-item')) {
        element.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0)';
    }
}

// Fixed Navigation with improved smooth scrolling
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Enhanced smooth scrolling functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Remove active class from all links
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
                
                // Get navigation height for offset calculation
                const nav = document.querySelector('.nav-3d');
                const navHeight = nav ? nav.offsetHeight : 0;
                
                // Calculate target position
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced active link detection
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    };
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                if (sectionId) {
                    // Update active navigation link
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections for active navigation
    sections.forEach(section => {
        if (section.id) {
            navObserver.observe(section);
        }
    });
    
    // Navigation hide/show on scroll
    let lastScrollY = window.scrollY;
    const nav = document.querySelector('.nav-3d');
    
    window.addEventListener('scroll', debounce(() => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    }, 10));
}

// Enhanced Typing Effect
function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const texts = [
        'DevOps Engineer | AWS Trainer | Cloud Community Builder',
        'Kubernetes Expert | CI/CD Specialist',
        'Infrastructure as Code Enthusiast',
        'Cloud Solutions Architect',
        'AWS Certified Professional'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isTyping = false;
    
    function typeText() {
        if (isLoading || isTyping) return;
        
        isTyping = true;
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 30 : 80;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(() => {
            isTyping = false;
            typeText();
        }, typeSpeed);
    }
    
    // Start typing after a short delay
    setTimeout(typeText, 1500);
}

// Hero Animations
function triggerHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons');
    
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, index * 200);
    });
    
    // Animate floating elements
    const floatingElements = document.querySelectorAll('.floating-cloud, .floating-server, .floating-gear');
    floatingElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.animation = `float 3s ease-in-out infinite ${index}s`;
        }, 500 + index * 200);
    });
}

// Fixed Contact Form
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    // Create feedback element
    const feedbackElement = document.createElement('div');
    feedbackElement.className = 'form-feedback';
    contactForm.insertBefore(feedbackElement, contactForm.firstChild);
    
    // Fix input field issues
    const formControls = contactForm.querySelectorAll('.form-control');
    formControls.forEach(control => {
        // Remove any interfering styles
        control.style.pointerEvents = 'auto';
        control.style.zIndex = '1';
        
        // Add focus/blur effects with purple theme
        control.addEventListener('focus', () => {
            control.style.transform = 'perspective(1000px) rotateX(2deg)';
            control.style.boxShadow = '0 10px 20px rgba(139, 92, 246, 0.2)';
            control.style.borderColor = '#8B5CF6';
        });
        
        control.addEventListener('blur', () => {
            control.style.transform = 'perspective(1000px) rotateX(0deg)';
            control.style.boxShadow = '';
            control.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        });
    });
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        // Get form values
        const nameInput = contactForm.querySelector('input[name="name"]');
        const emailInput = contactForm.querySelector('input[name="email"]');
        const messageInput = contactForm.querySelector('textarea[name="message"]');
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        
        // Validate form
        if (!name || !email || !message) {
            showFeedback('Please fill in all fields', 'error');
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFeedback('Please enter a valid email address', 'error');
            return;
        }
        
        // Animate button with purple theme
        button.textContent = 'Sending...';
        button.disabled = true;
        button.style.transform = 'perspective(1000px) rotateX(10deg)';
        button.style.background = '#ffaa00';
        button.style.color = '#000000';
        
        // Show sending feedback
        showFeedback('Sending your message...', 'info');
        
        // Simulate form submission
        setTimeout(() => {
            button.textContent = 'Message Sent!';
            button.style.background = '#8B5CF6';
            button.style.color = '#ffffff';
            showFeedback('Thank you! Your message has been sent successfully. I will get back to you soon!', 'success');
            
            // Add success animation
            button.style.transform = 'perspective(1000px) rotateX(0deg) scale(1.05)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.transform = 'perspective(1000px) rotateX(0deg) scale(1)';
                button.style.background = '';
                button.style.color = '';
                contactForm.reset();
                hideFeedback();
            }, 3000);
        }, 2000);
    });
    
    function showFeedback(message, type) {
        feedbackElement.textContent = message;
        feedbackElement.className = `form-feedback ${type} show`;
    }
    
    function hideFeedback() {
        feedbackElement.className = 'form-feedback';
    }
}

// Enhanced Skill Animations with Purple theme
function initializeSkillAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.skill-icon');
            if (icon) {
                icon.style.animationDuration = '0.5s';
            }
            
            // Create floating effect with enhanced animation
            item.style.transform = 'perspective(1000px) rotateX(15deg) translateY(-20px)';
            item.style.boxShadow = '0 30px 60px rgba(139, 92, 246, 0.4)';
            
            // Add pulsing glow effect with purple
            item.style.background = 'linear-gradient(135deg, #8B5CF6, #ffffff)';
            item.style.color = '#000000';
            item.style.border = '2px solid #8B5CF6';
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.skill-icon');
            if (icon) {
                icon.style.animationDuration = '3s';
            }
            
            item.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0)';
            item.style.boxShadow = '';
            item.style.background = '';
            item.style.color = '';
            item.style.border = '';
        });
    });
}

// Enhanced Project Cards
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card-3d');
    
    projectCards.forEach(card => {
        let hoverTimeout;
        
        card.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            const inner = card.querySelector('.project-inner');
            if (inner) {
                inner.style.transform = 'rotateY(180deg)';
            }
            
            // Add scale effect with purple glow
            card.style.transform = 'scale(1.05)';
            card.style.zIndex = '10';
            card.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                const inner = card.querySelector('.project-inner');
                if (inner) {
                    inner.style.transform = 'rotateY(0deg)';
                }
                card.style.transform = 'scale(1)';
                card.style.zIndex = '';
                card.style.boxShadow = '';
            }, 300);
        });
    });
}

// Enhanced Hover Effects with Purple theme
function initializeHoverEffects() {
    // Enhanced 3D button effects
    const buttons = document.querySelectorAll('.btn-3d');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'perspective(1000px) rotateX(8deg) translateY(-5px)';
            button.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.4)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0)';
            button.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.5)';
        });
    });
    
    // Enhanced timeline item effects
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const content = item.querySelector('.timeline-content');
            if (content) {
                content.style.transform = 'translateY(-10px) scale(1.05)';
                content.style.boxShadow = '0 25px 50px rgba(139, 92, 246, 0.2)';
                content.style.borderColor = '#8B5CF6';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const content = item.querySelector('.timeline-content');
            if (content) {
                content.style.transform = 'translateY(0) scale(1)';
                content.style.boxShadow = '';
                content.style.borderColor = '';
            }
        });
    });
    
    // Enhanced about card flip effect
    const aboutCard = document.querySelector('.about-card-3d');
    if (aboutCard) {
        aboutCard.addEventListener('mouseenter', () => {
            const inner = aboutCard.querySelector('.card-inner');
            if (inner) {
                inner.style.transform = 'rotateY(180deg)';
            }
            aboutCard.style.transform = 'scale(1.05)';
            aboutCard.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)';
        });
        
        aboutCard.addEventListener('mouseleave', () => {
            const inner = aboutCard.querySelector('.card-inner');
            if (inner) {
                inner.style.transform = 'rotateY(0deg)';
            }
            aboutCard.style.transform = 'scale(1)';
            aboutCard.style.boxShadow = '';
        });
    }
    
    // Enhanced contact item effects with purple theme
    const contactItems = document.querySelectorAll('.contact-item-3d');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'perspective(1000px) rotateX(10deg) translateY(-8px)';
            item.style.background = 'linear-gradient(135deg, #8B5CF6, #ffffff)';
            item.style.color = '#000000';
            item.style.border = '2px solid #8B5CF6';
            
            const text = item.querySelector('.contact-text');
            const icon = item.querySelector('.contact-icon');
            if (text) {
                text.style.color = '#000000';
                const h3 = text.querySelector('h3');
                const p = text.querySelector('p');
                if (h3) h3.style.color = '#000000';
                if (p) p.style.color = '#000000';
            }
            if (icon) icon.style.transform = 'rotate(360deg) scale(1.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0)';
            item.style.background = '';
            item.style.color = '';
            item.style.border = '';
            
            const text = item.querySelector('.contact-text');
            const icon = item.querySelector('.contact-icon');
            if (text) {
                text.style.color = '';
                const h3 = text.querySelector('h3');
                const p = text.querySelector('p');
                if (h3) h3.style.color = '';
                if (p) p.style.color = '';
            }
            if (icon) icon.style.transform = 'rotate(0deg) scale(1)';
        });
    });
}

// Button initialization with improved event handling
function initializeButtons() {
    // Download CV functionality
    const downloadBtn = document.querySelector('.btn--primary');
    if (downloadBtn && downloadBtn.textContent.includes('Download CV')) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Create comprehensive CV content
            const cvContent = `
PUSHKAR LAL
DevOps Engineer | AWS Trainer | Cloud Community Builder
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT INFORMATION
📧 Email: pushkar3002@gmail.com
📱 Phone: +91 9661986771
🌐 LinkedIn: linkedin.com/in/pushkar-lal-814609202
💬 WhatsApp: wa.me/919661986771
📍 Location: Jaipur, Rajasthan, India

PROFESSIONAL SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Passionate DevOps Engineer with expertise in AWS Cloud, Kubernetes, and CI/CD practices. 
Specialized in training professionals and organizations to harness the power of cloud technology.
Helping teams scale with automation, infrastructure optimization, and modern DevOps practices.

TECHNICAL SKILLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☁️ Cloud Platforms: AWS (Advanced), Azure
🔧 DevOps Tools: Jenkins, GitLab CI, ArgoCD, Docker, Kubernetes
📊 Monitoring: Grafana, Prometheus, AWS CloudWatch
🏗️ Infrastructure: AWS EC2, EKS, Terraform, CloudFormation
🐧 Operating Systems: Linux (Ubuntu, CentOS, Amazon Linux)
📝 Version Control: Git, GitHub, GitLab
🔄 CI/CD: Pipeline automation, deployment strategies

PROFESSIONAL EXPERIENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DevOps Engineer | TECH GLANCE SERVICE (TGS)
September 2023 - Present
• Implementing DevOps best practices on AWS and Azure cloud platforms
• Designing scalable cloud infrastructure and optimizing deployment pipelines
• Automating CI/CD processes to improve development workflow efficiency
• Managing containerized applications using Docker and Kubernetes

Student | LinuxWorld Informatics Pvt Ltd
September 2023 - Present
• Continuous learning and development in DevOps and cloud technologies
• Specialized training in AWS, Kubernetes, and modern DevOps practices
• Hands-on experience with real-world cloud infrastructure projects

EDUCATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bachelor of Technology - Artificial Intelligence
Suresh Gyan Vihar University | August 2023 - April 2026

Diploma in Computer Science
Suresh Gyan Vihar University | 2020 - 2023

CERTIFICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏆 Mastering Git & GitHub: From Basic to Advanced Workflows
🏆 Linux for DevOps Engineers and Developers
🏆 PromptOps: AI-Powered DevOps

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"Helping You Scale With The Cloud"
            `;
            
            const blob = new Blob([cvContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Pushkar_Lal_DevOps_Resume.txt';
            link.click();
            window.URL.revokeObjectURL(url);
            
            // Show success message with purple theme
            const originalText = this.textContent;
            this.textContent = 'Downloaded!';
            this.style.background = '#8B5CF6';
            this.style.color = '#ffffff';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
                this.style.color = '';
            }, 2000);
        });
    }
    
    // Contact button functionality
    const contactBtn = document.querySelector('.btn--outline');
    if (contactBtn && contactBtn.textContent.includes('Contact Me')) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const nav = document.querySelector('.nav-3d');
                const navHeight = nav ? nav.offsetHeight : 0;
                const elementPosition = contactSection.offsetTop;
                const offsetPosition = elementPosition - navHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, offsetPosition),
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Performance optimization
function debounce(func, wait) {
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

// Mobile responsiveness
function initializeMobileFeatures() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Reduce particle density on mobile
        const particles = document.querySelector('.particles');
        if (particles) {
            particles.style.opacity = '0.5';
        }
        
        // Simplify 3D effects on mobile
        const card3d = document.querySelectorAll('.about-card-3d, .project-card-3d');
        card3d.forEach(card => {
            card.style.perspective = '500px';
        });
        
        // Disable cursor trail on mobile
        const cursor = document.querySelector('.cursor-trail');
        if (cursor) {
            cursor.style.display = 'none';
        }
    }
}

// Initialize mobile features
window.addEventListener('resize', debounce(initializeMobileFeatures, 250));
initializeMobileFeatures();

// Enhanced Parallax Effect
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.floating-cloud, .floating-server, .floating-gear');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            if (element) {
                element.style.transform = `translateY(${rate * speed}px)`;
            }
        });
    });
}

// Initialize parallax after loading
setTimeout(() => {
    if (!isLoading) {
        initializeParallax();
    }
}, 4000);

// Console messages
console.log('🚀 Pushkar Lal Portfolio - Purple Edition Loaded Successfully!');
console.log('💜 3D Animations Active | Particle System Online | Purple Theme Engaged');
console.log('🔥 Navigation Fixed | Contact Form Functional | All Systems Go!');