import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'

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
    if (!liked.includes(blogId)) {
      liked.push(blogId)
      localStorage.setItem('likedBlogs', JSON.stringify(liked))
    }
  } catch (error) {
    console.error('Error saving liked blog to localStorage:', error)
  }
}

const isBlogLiked = (blogId) => {
  const liked = getLikedBlogs()
  return liked.includes(String(blogId))
}

const SingleBlog = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isLiking, setIsLiking] = useState(false)

  useEffect(() => {
    // Check if blog is already liked from localStorage
    if (id) {
      setIsLiked(isBlogLiked(id))
    }
  }, [id])

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/blogs/${id}`)
        // Handle different response structures
        const blogData = response.data?.blog || response.data?.data || response.data
        setBlog(blogData)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching blog:', err)
        setError('Failed to load blog')
        setLoading(false)
        // Set mock data if API fails
        setBlog({
          id: id,
          title: 'How to Customize Free Templates to Fit Your Brand',
          date: 'Dec 5, 2023',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          likes: 42
        })
      }
    }

    if (id) {
      fetchBlog()
    }
  }, [id])

  const handleLike = async () => {
    // Prevent liking if already liked or if request is in progress
    if (isLiking || !id || isLiked) return

    // Check localStorage again to be sure
    if (isBlogLiked(id)) {
      setIsLiked(true)
      return
    }

    setIsLiking(true)
    try {
      await axios.post(`http://localhost:8000/api/v1/blogs/${id}/like`)
      
      // Update the blog's like count optimistically
      setBlog(prevBlog => ({
        ...prevBlog,
        likes: (prevBlog?.likes || 0) + 1
      }))
      
      // Save to localStorage and update state
      saveLikedBlog(id)
      setIsLiked(true)
    } catch (err) {
      console.error('Error liking blog:', err)
    } finally {
      setIsLiking(false)
    }
  }

  if (loading) {
    return (
      <section className="min-h-screen pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    )
  }

  if (error && !blog) {
    return (
      <section className="min-h-screen pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center py-20 text-gray-400">{error}</div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blogs
        </motion.button>

        {/* Blog Content */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Date and Likes */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-white/60">
              {blog?.date || blog?.createdAt || 'Recent'}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{blog?.likes || 0}</span>
              </div>
              <motion.button
                onClick={handleLike}
                disabled={isLiking || isLiked}
                whileHover={isLiked ? {} : { scale: 1.05 }}
                whileTap={isLiked ? {} : { scale: 0.95 }}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  isLiked
                    ? 'bg-red-500/20 border border-red-500/50 text-red-400 cursor-not-allowed'
                    : 'bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                } ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <svg 
                  className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
                  fill={isLiked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm font-medium">
                  {isLiked ? 'Liked' : 'Like'}
                </span>
              </motion.button>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            {blog?.title}
          </h1>

          {/* Featured Image */}
          {blog?.image && (
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <div className="text-white/80 text-lg leading-relaxed space-y-6">
              {blog?.content ? (
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              ) : blog?.description ? (
                <p>{blog.description}</p>
              ) : (
                <div className="space-y-4">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Tags or Categories */}
          {blog?.tags && blog.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.article>
      </div>
    </section>
  )
}

export default SingleBlog
