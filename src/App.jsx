import React, { useState } from 'react';

import Navbar from './pages/Navbar.jsx';
import Hero from './pages/Hero.jsx';
import Works from './pages/Works.jsx';
import Services from './pages/Services.jsx';
import Blog from './pages/Blog.jsx';
import Contact from './pages/Contact.jsx';
import Footer from './pages/Footer.jsx';


export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Router Logic
  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Hero setPage={setCurrentPage} />;
      case 'works': return <Works />;
      case 'services': return <Services />;
      case 'blog': return <Blog />;
      case 'contact': return <Contact />;
      default: return <Hero setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans selection:bg-teal-500 selection:text-white overflow-x-hidden">
      <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
        <div class="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* 2. Content */}
      <div className="relative z-10 pb-24">
        <Navbar activePage={currentPage} setPage={setCurrentPage} />
          <main className='mt-8'>
            {renderPage()}
          </main>
        <Footer />
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer { animation: shimmer 2s infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}