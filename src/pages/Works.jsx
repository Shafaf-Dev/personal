import { useState, useEffect } from 'react';
import { api } from '../api/apiService';

const Works = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      api.getProjects().then(data => {
        setProjects(data);
        setLoading(false);
      });
    }, []);
  
    return (
      <section className="flex flex-col items-center min-h-screen px-4 md:px-20 pt-24 animate-fade-in-up">
        <h2 className="text-4xl font-bold mb-12 text-center">Selected <span className="text-teal-200">Works</span></h2>
        
        {loading ? (
          <div className="text-teal-400 animate-pulse">Loading Projects...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {projects.map((p) => (
              <div key={p.id} className="glass-card bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                <div className="h-48 bg-gray-800 relative overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    {p.category.split('•').map((tag, i) => (
                      <span key={i} className="text-[10px] bg-white/5 text-teal-200 px-2 py-1 rounded-md border border-white/10">{tag.trim()}</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{p.description}</p>
                  <button className="text-sm text-white border-b border-white/30 pb-0.5 hover:border-white transition-colors">
                    <a href={p?.link || '#'} target="_blank" rel="noopener noreferrer">
                      {p?.github ? 'View on Github' : 'View Project'}
                    </a>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  };

export default Works;