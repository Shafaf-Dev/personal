import { ArrowRight, Download } from "lucide-react";

const Hero = ({ setPage }) => {
  const handleDownloadResume = () => {
    // download the resume
    const resume = "/assets/resume.pdf";
    const a = document.createElement("a");
    a.href = resume;
    a.download = "resume.pdf";
    a.click();
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-[85vh] px-4 pt-20 animate-fade-in-up">
      {/* Avatar */}
      <div className="relative mb-8 group reveal reveal-delay-1">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
          <div className="relative w-32 h-32 rounded-full p-[2px] bg-gradient-to-r from-gray-700 to-gray-800 overflow-hidden shadow-2xl">
              <img src="./assets/profile-1.png" 
                    alt="Developer Profile" 
                    className="w-full h-full object-cover rounded-full border-2 border-[#030712] grayscale group-hover:grayscale-0 transition-all duration-500"/>
          </div>
          <div className="absolute bottom-1 right-0 bg-white/10 backdrop-blur-xl border border-white/20 p-1.5 rounded-full flex items-center justify-center shadow-lg">
              {/* <!-- Verified Badge --> */}
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div className="absolute top-0 -right-12 translate-x-4 bg-white/5 backdrop-blur border border-white/10 px-3 py-1 rounded-lg text-xs font-light text-teal-200 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-x-0">
             Let's start...
          </div>
      </div>
  
      <div className="max-w-4xl text-center mb-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-2">
          Building Scalable <br />
          <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-100 to-purple-200 animate-shine bg-[length:200%_auto]">Digital Solutions</span>
        </h1>
      </div>
  
      <div className="max-w-lg text-center mb-10">
        <p className="text-lg text-gray-400 font-light leading-relaxed">
          Full Stack Developer specialized in modern web technologies, cloud infrastructure, and intuitive user experiences.
        </p>
      </div>
  
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button onClick={() => setPage('works')} className="group relative px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm transition-all hover:scale-105 hover:shadow-white/20 hover:shadow-lg overflow-hidden">
          <span className="relative z-10 flex items-center gap-2">
            View Projects
            <ArrowRight size={14} className="-rotate-45 group-hover:rotate-0 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
        </button>
  
        {/* resume button */}
        <button onClick={()=> handleDownloadResume()} className="px-8 py-3.5 rounded-full bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm flex items-center gap-2">
            {/* download resume icon */}
            <Download size={14} className="text-teal-300" />
            Resume
          </button>
            
        </div>
      </section>
    )
  }

export default Hero;