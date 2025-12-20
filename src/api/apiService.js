/**
 * ==========================================
 * API CONFIGURATION & SERVICE
 * ==========================================
 */
const API_BASE_URL = "http://localhost:8000/api/v1";

export const api = {
  // Fetch Projects
  getProjects: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/projects`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return await res.json();
    } catch (err) {
      console.warn("API Error (Projects): Using fallback data.", err);
      // Fallback Data
      return [
        {
          id: 1,
          title: "Auditorial Management System",
          category: "Python • FastAPI • PostgreSQL",
          description: "Auditorial management system for managing audits, multiple users, and audit types, booking of audits, and more.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&fit=crop",
          link: "https://auditorial-management-system.vercel.app/"
        },
        {
          id: 2,
          title: "Razorpay recurring payment integration",
          category: "Python • Flask • Razorpay",
          description: "Razorpay recurring payment integration for managing recurring payments. Blueprint code for Razorpay recurring payment integration on Github.",
          image: "/assets/razorpay.png",
          link: "https://github.com/Shafaf-Dev/Python-Flask-Razorpay-Integration",
          github: true
        },
        {
          id: 3,
          title: "DocHours - Clinic Management System",
          category: "Python • FastAPI • PostgreSQL",
          description: "Clinic management system for managing clinics, patients, and appointments.",
          image: "/assets/dochours.png",
          link: "https://dochours.com",
          github: false
        },
        
      ];
    }
  },

  // Fetch Blogs
  getBlogs: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/blogs`);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      return await res.json();
      
    } catch (err) {
      console.warn("API Error (Blogs): Using fallback data.", err);
      return [
        {
          id: 1,
          title: "Understanding the Decorator Pattern in Python",
          date: "2025-01-01", // format: "Jan 2025"
          readTime: "3 min read",
          likes: 8,
          excerpt: "In software design, patterns offer standard solutions to common problems. They help developers create easier code to...",
          content: "This is the content of my blog post.",
          tags: ["Python", "Design Patterns", "Decorator Pattern", "Python Programming"],//
          url: "https://medium.com/@shafafmuhammad6/understanding-the-decorator-pattern-in-python-a7c4ebde04bd",
        },
        {
          id: 2,
          title: "Why AI Should Be a Core Part of Every Developer’s Workflow.",
          date: "2024-09-05", // format: "Jan 2025"
          readTime: "4 min read",
          likes: "31",
          excerpt: "This is the excerpt of my second blog post.",
          content: "This is the content of my second blog post.",
          tags: [
            "AI",
            "Machine Learning",
            "Python",
            "Python Programming",
            "AI Programming",
            "AI Development",
            "AI Implementation",
          ],
          url: "https://medium.com/@shafafmuhammad6/why-ai-should-be-a-core-part-of-every-developers-workflow-a79897fe2803",
        },
        {
          id: 3,
          title: "NPM, YARN, BABEL and Webpack",
          date: "2023-05-05", // format: "Jan 2025"
          readTime: "2 min read",
          likes: "8",
          excerpt: "NPM, YARN, BABEL and Webpack are the most popular package managers and build tools for JavaScript. In this blog post, we'll explore the differences between them and how to use them.",
          content: "This is the content of my third blog post.",
          tags: ["JavaScript", "NPM", "YARN", "BABEL", "Webpack", "JavaScript Programming"],
          url: "https://medium.com/@shafafmuhammad6/npm-yarn-babel-and-webpack-65b885f565d3",
        },
      ];
    }
    // return false;
  },

  // Post Contact Form
  submitContact: async (formData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("Failed to send message");
      return true;
    } catch (err) {
      console.warn("API Error (Contact): Simulating failure.", err);
      return false;
    }
  },

};
