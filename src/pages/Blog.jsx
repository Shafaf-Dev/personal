import { useState, useEffect } from 'react';
import { api } from '../api/apiService';
import { ArrowLeft, Calendar, Clock, Tag, Heart } from 'lucide-react';

const Blog = () => {
    const [view, setView] = useState('list'); // 'list' or 'detail'
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [likedBlogs, setLikedBlogs] = useState([]);
  
    useEffect(() => {
      api.getBlogs().then(data => {
        console.log(data);
        setBlogs(data);
        setLoading(false);
      });
    }, []);
  
    const openBlog = (blog) => {
      setSelectedBlog(blog);
      setView('detail');
      window.scrollTo(0, 0);
    };

    const handleLike = (blogId) => {
      console.log(blogId);
      if (likedBlogs.includes(blogId)) {
        setLikedBlogs(likedBlogs.filter(id => id !== blogId));
      } else {
        setLikedBlogs([...likedBlogs, blogId]);
      }
    };
  
    if (view === 'detail' && selectedBlog) {
      return (
        <section className="flex flex-col items-center min-h-screen px-4 md:px-20 pt-24 animate-fade-in-up">
          <button onClick={() => setView('list')} className="mb-8 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors self-start max-w-2xl mx-auto w-full">
            <ArrowLeft size={16} /> Back to Listing
          </button>
          <article className="max-w-2xl w-full">
            <div className="mb-6">
              {/* likes */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Heart size={12}  onClick={() => handleLike(selectedBlog?.id)} className={likedBlogs.includes(selectedBlog?.id) ? 'text-red-500 cursor-not-allowed' : 'text-gray-500 cursor-pointer'} /> {selectedBlog?.likes}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-4 leading-tight">{selectedBlog?.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Calendar size={12} /> {selectedBlog?.date}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {selectedBlog?.readTime}</span>
              </div>
            </div>
            <div className="w-full h-64 rounded-2xl bg-gray-800 mb-8 overflow-hidden">
               <div className="w-full h-full bg-gradient-to-br from-teal-900 to-purple-900 opacity-50"></div>
            </div>
            <div className="prose prose-invert prose-lg text-gray-300 leading-relaxed">
              <p className="mb-6">{selectedBlog?.excerpt}</p>
              <div className="p-4 bg-white/5 border-l-4 border-teal-500 rounded-r-lg mb-6 italic text-gray-400">
                "Note: This content is simulated as per the 'Single File' requirement."
              </div>
            </div>
          </article>
        </section>
      );
    }
  
    return (
      <section className="flex flex-col items-center min-h-screen px-4 md:px-20 pt-24 animate-fade-in-up">
        <h2 className="text-4xl font-bold mb-12 text-center">Latest <span className="text-teal-200">Insights</span></h2>
        <div className="w-full max-w-3xl space-y-6">
          {loading ? <div className="text-center text-gray-500">Loading articles...</div> : blogs?.map(blog => (
            <article key={blog?.id} onClick={() => openBlog(blog)} className="glass-card bg-white/5 border border-white/10 p-6 rounded-2xl cursor-pointer hover:bg-white/10 transition-all group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-teal-400 font-mono">{new Date(blog?.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                <span className="text-xs text-gray-500">{blog?.readTime}</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-teal-200 transition-colors">{blog?.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{blog?.excerpt}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                {blog?.tags?.map(tag => (
                  <span key={tag} className="flex items-center gap-1"><Tag size={10} /> {tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  };

export default Blog;