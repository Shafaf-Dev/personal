// Development steps data
const steps = [
    { 
        id: 1, 
        title: 'Core Development', 
        icon: 'code', 
        completed: true 
    },
    { 
        id: 2, 
        title: 'Coffee Break', 
        icon: 'coffee', 
        completed: false 
    },
    { 
        id: 3, 
        title: 'Launch', 
        icon: 'rocket', 
        completed: false 
    }
];

// SVG icons
const icons = {
    palette: '<path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.21-.64-1.67-.08-.09-.13-.21-.13-.33 0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-5.51-4.49-10-10-10zM7.5 9C8.33 9 9 8.33 9 7.5S8.33 6 7.5 6 6 6.67 6 7.5 6.67 9 7.5 9zm2.5 4c-.83 0-1.5-.67-1.5-1.5S9.17 10 10 10s1.5.67 1.5 1.5S10.83 13 10 13zm4-4c-.83 0-1.5-.67-1.5-1.5S13.17 6 14 6s1.5.67 1.5 1.5S14.83 9 14 9zm2.5 4c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>',
    code: '<polyline points="16,18 22,12 16,6"></polyline><polyline points="8,6 2,12 8,18"></polyline>',
    coffee: '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" x2="6" y1="1" y2="4"/><line x1="10" x2="10" y1="1" y2="4"/><line x1="14" x2="14" y1="1" y2="4"/>',
    sparkles: '<path d="m12 3-1.912 5.813a2 2 0 01-1.275 1.275L3 12l5.813 1.912a2 2 0 011.275 1.275L12 21l1.912-5.813a2 2 0 011.275-1.275L21 12l-5.813-1.912a2 2 0 01-1.275-1.275L12 3z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>',
    rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="m12 15-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
    check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/>'
};

// Current step tracker
let currentStep = 2;

// Initialize the application
function init() {
    renderSteps();
    startStepAnimation();
    // setupFormHandler();
}

// Render development steps
function renderSteps() {
    const container = document.getElementById('stepsContainer');
    
    steps.forEach(step => {
        const stepElement = document.createElement('div');
        stepElement.className = 'step';
        stepElement.id = `step-${step.id}`;
        
        const iconClass = step.completed ? 'completed' : 
                         step.id === currentStep ? 'active' : 'pending';
        
        const progressClass = step.completed ? 'completed' : 
                             step.id === currentStep ? 'active' : 'pending';
        
        const iconContent = step.completed ? icons.check : icons[step.icon];
        
        stepElement.innerHTML = `
            <div class="step-icon ${iconClass}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${iconContent}
                </svg>
            </div>
            <div class="step-content">
                <h4 class="step-title">${step.title}</h4>
                <div class="step-progress">
                    <div class="step-progress-bar ${progressClass}"></div>
                </div>
            </div>
        `;
        
        container.appendChild(stepElement);
    });
}

// Animate through steps
function startStepAnimation() {
    setInterval(() => {
        // Remove active class from current step
        const currentStepElement = document.getElementById(`step-${currentStep}`);
        if (currentStepElement) {
            currentStepElement.classList.remove('active');
        }
        
        // Move to next step
        currentStep = currentStep >= 5 ? 1 : currentStep + 1;
        
        // Add active class to new current step
        const newStepElement = document.getElementById(`step-${currentStep}`);
        if (newStepElement) {
            newStepElement.classList.add('active');
            
            // Update step icon and progress
            const stepData = steps.find(s => s.id === currentStep);
            const stepIcon = newStepElement.querySelector('.step-icon');
            const stepProgress = newStepElement.querySelector('.step-progress-bar');
            const stepTitle = newStepElement.querySelector('.step-title');
            
            if (!stepData.completed) {
                stepIcon.className = 'step-icon active';
                stepProgress.className = 'step-progress-bar active';
                stepTitle.style.color = '#14b8a6';
                
                // Update icon
                const svg = stepIcon.querySelector('svg');
                svg.innerHTML = icons[stepData.icon];
            }
        }
        
        // Reset styles for non-active steps
        steps.forEach(step => {
            if (step.id !== currentStep) {
                const element = document.getElementById(`step-${step.id}`);
                if (element) {
                    const title = element.querySelector('.step-title');
                    title.style.color = '';
                }
            }
        });
        
    }, 4000);
}

// Setup form submission handler
// function setupFormHandler() {
//     const form = document.getElementById('contactForm');
//     const formContainer = document.getElementById('formContainer');
//     const successMessage = document.getElementById('successMessage');
    
//     form.addEventListener('submit', function(e) {
//         // e.preventDefault();
        
//         const email = document.getElementById('email').value.trim();
        
//         if (email) {
//             // Hide form and show success message
//             form.style.display = 'none';
//             successMessage.classList.add('show');
            
//             // Reset form
//             form.reset();
            
//             // Hide success message and show form again after 3 seconds
//             setTimeout(() => {
//                 successMessage.classList.remove('show');
//                 form.style.display = 'flex';
//             }, 3000);
//         }
//     });
// }

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add loading animation to submit button
function addButtonLoadingState() {
    const submitBtn = document.querySelector('.submit-btn');
    
    submitBtn.addEventListener('click', function() {
        const originalContent = this.innerHTML;
        
        this.innerHTML = `
            <svg class="submit-icon animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
            <span>Sending...</span>
        `;
        
        // Reset button after form submission
        setTimeout(() => {
            this.innerHTML = originalContent;
        }, 1000);
    });
}

// Add CSS for spin animation
function addSpinAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-spin {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    init();
    setupSmoothScrolling();
    addButtonLoadingState();
    addSpinAnimation();
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add typing effect to hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'all 0.8s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 500);
    }
});