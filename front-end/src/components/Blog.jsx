import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Helper functions for localStorage
const getLikedBlogs = () => {
  try {
    const liked = localStorage.getItem('likedBlogs')
    return liked ? JSON.parse(liked) : []
  } catch (error) {
    console.error('Error reading liked blogs from localStorage:', error)
    return []
  }
}

const saveLikedBlog = (blogId) => {
  try {
    const liked = getLikedBlogs()
    const blogIdStr = String(blogId)
    if (!liked.includes(blogIdStr)) {
      liked.push(blogIdStr)
      localStorage.setItem('likedBlogs', JSON.stringify(liked))
    }
  } catch (error) {
    console.error('Error saving liked blog to localStorage:', error)
  }
}

const isBlogLiked = (blogId) => {
  const liked = getLikedBlogs()
  // Convert to string for consistent comparison (localStorage stores strings)
  return liked.includes(String(blogId))
}

const Blog = (props) => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [likedBlogs, setLikedBlogs] = useState(new Set())
  const navigate = useNavigate()

  useEffect(() => {
    // Load liked blogs from localStorage on mount
    const liked = getLikedBlogs()
    // Convert to Set for efficient lookups
    setLikedBlogs(new Set(liked))
  }, [])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/blogs', {
          params: {
            sort_by: 'likes'
          }
        })
        // Handle different response structures
        const blogsData = response.data?.blogs || response.data?.data || response.data || []
        setBlogs(Array.isArray(blogsData) ? blogsData : [])
        setLoading(false)
      } catch (err) {
        console.error('Error fetching blogs:', err)
        setError('Failed to load blogs')
        setLoading(false)
        // Set mock data if API fails
        setBlogs([
          {
            id: 1,
            title: 'How to Customize Free Templates to Fit Your Brand',
            date: 'Dec 5, 2023',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            likes: 42
          },
          {
            id: 2,
            title: 'Top 5 Free Templates for Startups',
            date: 'Sep 2, 2023',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            likes: 28
          }
        ])
      }
    }

    fetchBlogs()
  }, [])

  const handleLike = async (e, blogId) => {
    e.preventDefault()
    e.stopPropagation()

    // Check if already liked
    if (isBlogLiked(blogId)) {
      return
    }

    try {
      await axios.post(`http://localhost:8000/api/v1/blogs/${blogId}/like`)
      
      // Update the blog's like count optimistically
      setBlogs(prevBlogs => 
        prevBlogs.map(blog => 
          blog.id === blogId 
            ? { ...blog, likes: (blog.likes || 0) + 1 }
            : blog
        )
      )
      
      // Save to localStorage and update state
      saveLikedBlog(blogId)
      setLikedBlogs(prev => new Set([...prev, String(blogId)]))
    } catch (err) {
      console.error('Error liking blog:', err)
    }
  }
  
  // if props.isHome is true, only show the first 3 blogs. and show it list view.
  if (props.isHome) {
    return (
      <section className="py-32 relative">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Latest </span>
            <span className="text-gradient">Blog Posts</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Blog List */}
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogs.slice(0, 3).map((blog, index) => (
              <div key={blog.id || index} className="relative">
                <Link to={`/blog/${blog.id || index + 1}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="glass-strong rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 group cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop'}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-white/90 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed mb-4">
                        {blog.excerpt || blog.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
                      </p>
                    </div>
                  </motion.article>
                </Link>
              </div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
            onClick={() => navigate('/blog')}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg glass border border-white/20 text-white font-medium hover:border-white/40 transition-all"
              onClick={() => navigate('/blog')}
            >
              View Mores
            </motion.button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Latest </span>
            <span className="text-gradient">Blog Posts</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error && blogs.length === 0 ? (
          <div className="text-center py-20 text-gray-400">{error}</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogs.map((blog, index) => (
              <div key={blog.id || index} className="relative">
                <Link to={`/blog/${blog.id || index + 1}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="glass-strong rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 group cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop'}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-white/60">{blog.date || 'Recent'}</div>
                        <div className="flex items-center gap-1.5 text-white/60 text-sm">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          <span>{blog.likes || 0}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-white/90 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed mb-4">
                        {blog.excerpt || blog.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
                      </p>
                      <span className="text-white/80 font-medium text-sm hover:text-white transition-colors inline-flex items-center gap-1">
                        Read More →
                      </span>
                    </div>
                  </motion.article>
                </Link>
                {/* Like Button */}
                {(() => {
                  const blogId = String(blog.id || index + 1)
                  const isLiked = likedBlogs.has(blogId)
                  return (
                    <motion.button
                      onClick={(e) => handleLike(e, blog.id || index + 1)}
                      disabled={isLiked}
                      whileHover={isLiked ? {} : { scale: 1.1 }}
                      whileTap={isLiked ? {} : { scale: 0.9 }}
                      className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all ${
                        isLiked
                          ? 'bg-red-500/80 border border-red-400/50 cursor-not-allowed'
                          : 'bg-black/40 border border-white/20 hover:bg-black/60'
                      }`}
                      aria-label={isLiked ? 'Already liked' : 'Like blog'}
                    >
                      <svg 
                        className={`w-5 h-5 ${isLiked ? 'text-white fill-white' : 'text-white/80'}`}
                        fill={isLiked ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </motion.button>
                  )
                })()}
              </div>
            ))}
          </div>
        )}

       
      </div>
    </section>
  )
}

export default Blog
