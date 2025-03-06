// Skills Data
const skills = [
    'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js',
    'Flask', 'FastAPI', 'Vue.js', 'Express', 'Django',
    'MongoDB', 'MySQL', 'Redis', 'Go',
    'Docker', 'AWS', 'PostgreSQL'
];

// Projects Data
// const projects = [
//     {
//         title: 'E-commerce Platform',
//         description: 'Full-stack e-commerce solution with real-time inventory management',
//         tech: ['React', 'Node.js', 'MongoDB'],
//         stars: 45,
//         forks: 12
//     },
//     {
//         title: 'Task Management App',
//         description: 'Collaborative project management tool with real-time updates',
//         tech: ['Vue.js', 'Express', 'PostgreSQL'],
//         stars: 32,
//         forks: 8
//     },
//     {
//         title: 'Analytics Dashboard',
//         description: 'Data visualization platform for business metrics',
//         tech: ['React', 'D3.js', 'Node.js'],
//         stars: 28,
//         forks: 5
//     },
//     {
//         title: 'API Gateway Service',
//         description: 'Microservice gateway with authentication and rate limiting',
//         tech: ['Go', 'Redis', 'Docker'],
//         stars: 56,
//         forks: 15
//     }
// ];

// Render Skills
function renderSkills() {
    const skillsContainer = document.getElementById('skills-container');
    skills.forEach(skill => {
        const skillTag = document.createElement('span');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill;
        skillsContainer.appendChild(skillTag);
    });
}

// Render Projects
function renderProjects() {
    const projectsContainer = document.getElementById('projects-container');
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';

        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p class="description">${project.description}</p>
            <div class="project-tech">
                ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-stats">
                <span class="stat">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" />
                    </svg>
                    ${project.stars}
                </span>
                <span class="stat">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
                    </svg>
                    ${project.forks}
                </span>
            </div>
        `;

        projectsContainer.appendChild(projectCard);
    });
}

// Handle Contact Form
function handleContactForm() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        console.log('Form submitted:', { email, message });
        // Here you would typically send the data to a server
        form.reset();
        alert('Message sent successfully!');
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    renderProjects();
    handleContactForm();
});