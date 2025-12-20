import { Code } from "lucide-react";

const Navbar = ({ activePage, setPage }) => (
  <nav className="fixed top-0 w-full z-40 px-6 py-6 flex justify-center">
    <div className="glass-nav backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-6 py-3 flex items-center space-x-4 md:space-x-8 shadow-2xl animate-fade-in-up">
      <button onClick={() => setPage('works')} className={`text-sm font-medium transition-colors ${activePage === 'works' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Works</button>
      <button onClick={() => setPage('services')} className={`text-sm font-medium transition-colors ${activePage === 'services' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Stack</button>
      
      <button onClick={() => setPage('home')} className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-400 to-purple-500 flex items-center justify-center text-black shadow-lg hover:scale-110 transition-transform">
        <Code size={14} strokeWidth={3} />
      </button>
      
      <button onClick={() => setPage('blog')} className={`text-sm font-medium transition-colors ${activePage === 'blog' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Blog</button>
      <button onClick={() => setPage('contact')} className={`text-sm font-medium transition-colors ${activePage === 'contact' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Contact</button>
    </div>
  </nav>
);

export default Navbar;
