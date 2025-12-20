import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => (
    <footer className="fixed bottom-0 w-full z-20 pb-8 pointer-events-none">
      <div className="flex justify-center items-end h-full">
        <div className="pointer-events-auto flex items-center gap-8 md:gap-12 px-8 py-4 rounded-2xl bg-gradient-to-t from-black/80 to-transparent backdrop-blur-[2px] animate-fade-in-up">
          <Github className="text-gray-600 hover:text-white cursor-pointer transition-colors" />
          <Linkedin className="text-gray-600 hover:text-blue-400 cursor-pointer transition-colors" />
          <Mail className="text-gray-600 hover:text-gray-400 cursor-pointer transition-colors" />
        </div>
      </div>
    </footer>
  );
  
export default Footer;