const commands = {
    help: {
        description: 'Shows available commands',
        execute: () => `
        <h3 style="color: var(--text-green); font-weight: bold; margin-bottom: 0.5rem;">Available Commands:</h3>
        <ul style="list-style: none;">
          <li><span style="color: var(--text-yellow);">about</span> - View my professional background</li>
          <li><span style="color: var(--text-yellow);">projects</span> - Browse my portfolio projects</li>
          <li><span style="color: var(--text-yellow);">contact</span> - Get in touch with me</li>
          <li><span style="color: var(--text-yellow);">clear</span> - Clear the terminal</li>
          <li><span style="color: var(--text-yellow);">help</span> - Show this help message</li>
        </ul>
        <p style="color: var(--text-dim); margin-top: 0.5rem;">Type any command to get started!</p>
      `
    },

    about: {
        description: 'Display information about me',
        execute: () => `
        <div style="color: var(--text-green); font-weight: bold; font-size: 1.125rem; margin-bottom: 1rem;">
          About Me
        </div>
        <p style="margin-bottom: 1rem;">
          Hi, I’m a software engineer with expertise in both frontend and backend development. On the frontend,
          I work with modern frameworks like React, Next.js, Tailwind, and etc. while leveraging Golang and Python 
          on the backend to build scalable, high-performance applications. I’m also deeply invested in UI/UX design, 
          driven by a passion for crafting smooth, user-centric experiences.
        While currently a developer, I have a strong interest in becoming a tech entrepreneur. 
        I actively research business trends, tech news, and innovative solutions, 
        aiming to build successful ventures in the tech industry in the future. 
        I stay up-to-date with the latest tech-business news and advancements to align my skills with the ever-evolving tech landscape.
        </p>
        <div style="margin-bottom: 1rem;">
          <h3 style="color: var(--text-yellow); margin-bottom: 0.5rem;">Experience</h3>
          <ul style="list-style: disc; margin-left: 1.5rem;">
            <li>3+ years of professional development experience</li>
            <li>Led multiple successful project deployments</li>
            <li>Contributed to open-source projects</li>
          </ul>
        </div>
        <div>
          <h3 style="color: var(--text-yellow); margin-bottom: 0.5rem;">Education</h3>
          <ul style="list-style: disc; margin-left: 1.5rem;">
            <li>B.S. in Computer Science</li>
            <li>Multiple certifications in web development</li>
          </ul>
        </div>
      `
    },

    skills: {
        description: 'Display my technical skills',
        execute: () => {
            const skills = [
                { name: 'JavaScript', level: 90 },
                { name: 'HTML/CSS', level: 85 },
                { name: 'Node.js', level: 80 },
                { name: 'Python', level: 75 },
                { name: 'SQL', level: 70 }
            ];

            const skillsHtml = skills.map(skill => `
          <div style="margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
              <span style="color: var(--text-yellow);">${skill.name}</span>
              <span style="color: var(--text-dim);">${skill.level}%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-progress" style="width: ${skill.level}%"></div>
            </div>
          </div>
        `).join('');

            return `
          <h3 style="color: var(--text-green); font-weight: bold; font-size: 1.125rem; margin-bottom: 1rem;">
            Technical Skills
          </h3>
          ${skillsHtml}
        `;
        }
    },

    projects: {
        description: 'Display my projects',
        execute: () => {
            const projects = [
                {
                    name: 'E-commerce Platform',
                    description: 'Full-stack e-commerce solution with modern web technologies',
                    tech: ['JavaScript', 'Node.js', 'MongoDB', 'Express'],
                    github: '404.html',
                    live: '404.html'
                },
                {
                    name: 'Task Management App',
                    description: 'Real-time collaborative task management system',
                    tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
                    github: '404.html',
                    live: '404.html'
                }
            ];

            return `
          <h3 style="color: var(--text-green); font-weight: bold; font-size: 1.125rem; margin-bottom: 1rem;">
            My Projects
          </h3>
          ${projects.map(project => `
            <div class="project-card">
              <div class="project-title">${project.name}</div>
              <p>${project.description}</p>
              <div class="tech-stack">
                ${project.tech.map(tech => `
                  <span class="tech-tag">${tech}</span>
                `).join('')}
              </div>
              <div class="project-links">
                <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  Code
                </a>
                <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="project-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  Live Demo
                </a>
              </div>
            </div>
          `).join('')}
        `;
        }
    },

    contact: {
        description: 'Display contact information',
        execute: () => `
        <h3 style="color: var(--text-green); font-weight: bold; font-size: 1.125rem; margin-bottom: 1rem;">
          Contact Information
        </h3>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <a href="mailto:shafafmuhammad6@gmail.com" style="color: var(--text-dim); text-decoration: none; display: flex; align-items: center; gap: 0.5rem;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            shafafmuhammad6@gmail.com
          </a>
          <a href="https://github.com/Shafaf-Dev" target="_blank" rel="noopener noreferrer" style="color: var(--text-dim); text-decoration: none; display: flex; align-items: center; gap: 0.5rem;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            github.com/Shafaf-Dev
          </a>
          <a href="https://linkedin.com/in/muhammad-shafaf" target="_blank" rel="noopener noreferrer" style="color: var(--text-dim); text-decoration: none; display: flex; align-items: center; gap: 0.5rem;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            linkedin.com/in/muhammad-shafaf
          </a>
        </div>
        <p style="color: var(--text-dim); margin-top: 1rem;">
          Feel free to reach out through any of these channels!
        </p>
      `
    },

    clear: {
        description: 'Clear the terminal',
        execute: () => {
            document.getElementById('output').innerHTML = '';
            return '';
        }
    }
};