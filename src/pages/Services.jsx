import { Layout, Server, Database, Cloud } from 'lucide-react';


const Services = () => (
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 pt-24 animate-fade-in-up">
      <h2 className="text-4xl font-bold mb-8 text-center">Technical <span className="text-purple-200">Expertise</span></h2>
      <p className="max-w-3xl text-center mb-12 text-gray-400">
        I architect and build systems that scale. From database design to pixel-perfect frontends.
      </p>
  
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: Layout, title: "Frontend", tools: "React, Redux, Tailwind", color: "text-teal-400" },
          { icon: Server, title: "Backend", tools: "Python, JavaScript, Go", color: "text-purple-400" },
          { icon: Database, title: "Database", tools: "Postgres, MySQL, Redis", color: "text-blue-400" },
          { icon: Cloud, title: "DevOps", tools: "AWS, Docker, CI/CD", color: "text-orange-400" }
        ].map((item, i) => (
          <div key={i} className="p-6 glass-card bg-white/5 border border-white/10 rounded-xl text-center hover:bg-white/10 transition-colors cursor-default">
            <item.icon className={`mx-auto mb-4 w-8 h-8 ${item.color}`} />
            <h3 className="font-bold mb-1">{item.title}</h3>
            <p className="text-xs text-gray-500">{item.tools}</p>
          </div>
        ))}
      </div>
    </section>
  );

export default Services;