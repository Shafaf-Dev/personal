import { useState } from 'react';
import { api } from '../api/apiService';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus('sending');
      const res = await api.submitContact(form);
      console.log(res);
      if (res) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    };
  
    return (
      <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 pt-24 animate-fade-in-up">
        <h2 className="text-4xl font-bold mb-4 text-center">Let's <span className="text-teal-200">Collaborate</span></h2>
        <p className="text-gray-400 mb-10 text-center max-w-md">Got a project in mind? I'm currently available for freelance work and consulting.</p>
        
        <div className="w-full max-w-md glass-card bg-white/5 border border-white/10 p-8 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Name</label>
              <input 
                required
                type="text" 
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-teal-500 focus:outline-none transition-colors" 
                placeholder="John Doe" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
              <input 
                required
                type="email" 
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-teal-500 focus:outline-none transition-colors" 
                placeholder="john@example.com" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message</label>
              <textarea 
                required
                rows="4" 
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-teal-500 focus:outline-none transition-colors" 
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={status === 'sending' || status === 'success' || status === 'error'}
              className={`w-full font-bold py-3.5 rounded-lg transition-colors flex justify-center items-center gap-2
                ${status === 'success' ? 'bg-green-500 text-white' : status === 'error' ? 'bg-red-500 text-white' : 'bg-white text-black hover:bg-gray-200'}`}
            >
              {
                status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : status === 'error' ? 'Failed to send message. Please try again.' : 'Send Message'
              }
            </button>
          </form>
        </div>
      </section>
    );
  };
  
export default Contact;