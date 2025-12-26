// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const skillLevels = document.querySelectorAll('.skill-level');
const contactForm = document.getElementById('contactForm');
const modeToggle = document.getElementById('modeToggle');
const body = document.body;

// Theme Management
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);

modeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add animation to the toggle button
    modeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
        modeToggle.style.transform = 'scale(1)';
    }, 200);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Animate skill bars when in viewport
    animateSkills();
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Project filtering
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || filter === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Animate skill bars when in viewport
function animateSkills() {
    skillLevels.forEach(skill => {
        const skillPosition = skill.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (skillPosition < screenPosition) {
            const level = skill.getAttribute('data-level');
            skill.style.width = level + '%';
        }
    });
}

// Initialize skill bars
window.addEventListener('load', animateSkills);

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
    const message = contactForm.querySelector('textarea').value;
    
    // In a real application, you would send this data to a server
    // For this example, we'll just show an alert
    alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
    
    // Reset form
    contactForm.reset();
});

// Add hover effect to project cards
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('filtered-out')) {
            card.style.transform = 'translateY(0)';
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add dynamic year to footer
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.querySelector('#current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Initialize animation for elements in viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Dynamic typing effect for hero section
function initTypingEffect() {
    const titleElement = document.querySelector('.title .highlight');
    if (!titleElement) return;
    
    const originalText = titleElement.textContent;
    const professions = ['Data Analyst', 'Accountant', 'Financial Expert', 'Problem Solver'];
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function typeEffect() {
        const currentProfession = professions[professionIndex];
        
        if (!isPaused && !isDeleting && charIndex < currentProfession.length) {
            // Typing
            titleElement.textContent = originalText + ' | ' + currentProfession.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeEffect, 100);
        } else if (!isPaused && isDeleting && charIndex > 0) {
            // Deleting
            titleElement.textContent = originalText + ' | ' + currentProfession.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeEffect, 50);
        } else if (!isPaused && isDeleting && charIndex === 0) {
            // Finished deleting, move to next profession
            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
            setTimeout(typeEffect, 1000);
        } else if (!isPaused && !isDeleting && charIndex === currentProfession.length) {
            // Finished typing, pause then start deleting
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                typeEffect();
            }, 2000);
        }
    }
    
    // Start the typing effect
    setTimeout(typeEffect, 1000);
}

// Initialize typing effect when page loads
window.addEventListener('load', initTypingEffect);

// Add theme transition to all elements
document.querySelectorAll('*').forEach(element => {
    element.style.transition = 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease';
});