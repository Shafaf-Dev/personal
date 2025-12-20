// import { useState } from 'react';
// import { api } from '../api/apiService';
// import { X, Sparkles } from 'lucide-react';


// const AIModal = ({ isOpen, onClose }) => {
//     const [prompt, setPrompt] = useState('');
//     const [result, setResult] = useState(null);
//     const [loading, setLoading] = useState(false);
  
//     if (!isOpen) return null;
  
//     const handleGenerate = async () => {
//       if (!prompt) return;
//       setLoading(true);
//       setResult(null);
//       try {
//         const data = await api.generateConcept(prompt);
//         setResult(data);
//       } catch (e) {
//         // alert('AI Error');
//       }
//       setLoading(false);
//     };
  
//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//         <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
//         <div className="relative w-full max-w-lg bg-[#141419] border border-white/10 rounded-3xl p-8 overflow-hidden shadow-2xl animate-fade-in-up">
//           <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
//             <X size={20} />
//           </button>
  
//           <div className="mb-6 text-center">
//             <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-teal-500/20 to-purple-500/20 border border-white/10 mb-4">
//               <Sparkles className="text-teal-300" size={20} />
//             </div>
//             <h2 className="text-2xl font-bold mb-1">The Dev Muse ✨</h2>
//             <p className="text-gray-400 text-sm">Describe your next app, and I'll generate a UI theme.</p>
//           </div>
  
//           <div className="relative mb-6">
//             <input 
//               type="text" 
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
//               placeholder="e.g., 'A cyberpunk crypto trading dashboard'..." 
//               className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50"
//             />
//             <button onClick={handleGenerate} className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-teal-500 to-purple-600 rounded-lg px-4 text-xs font-bold hover:opacity-90 transition-opacity">
//               GENERATE
//             </button>
//           </div>
  
//           {loading && (
//             <div className="py-8 flex flex-col items-center justify-center space-y-4">
//               <div className="w-2 h-2 bg-teal-400 rounded-full animate-ping"></div>
//               <p className="text-xs text-teal-200/70 tracking-widest uppercase">Processing...</p>
//             </div>
//           )}
  
//           {result && (
//             <div className="space-y-6 animate-fade-in-up">
//               <div>
//                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Palette</h3>
//                 <div className="flex gap-4">
//                   {result.colors.map((c, i) => (
//                     <div key={i} className="h-16 flex-1 rounded-lg shadow-lg border border-white/10" style={{ backgroundColor: c }}></div>
//                   ))}
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 gap-4">
//                 <div className="bg-white/5 rounded-xl p-4 border border-white/5">
//                   <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Font Stack</h3>
//                   <p className="text-teal-100 font-mono text-sm">{result.fonts}</p>
//                 </div>
//                 <div className="bg-gradient-to-br from-white/5 to-transparent rounded-xl p-4 border border-white/5">
//                   <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">The Vibe</h3>
//                   <p className="text-gray-300 text-sm leading-relaxed">{result.vibe}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

// export default AIModal;