import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const MainSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  const cards = [
    {
      id: 1,
      title: 'Modernizing a Subscription Management Platform',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      metrics: [
        { label: 'Engagement', value: '12 min', icon: '⏱️' },
        { label: 'User Satisfaction', value: '4.5★', icon: '⭐' },
      ],
      gradient: 'from-blue-500/20 to-cyan-500/20',
      delay: 0.1,
    },
    {
      id: 2,
      title: 'Revamping an E-Commerce Website',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      metrics: [
        { label: 'Usability', value: '85%', icon: '📊' },
        { label: 'User Retention', value: '70%', icon: '👥' },
      ],
      gradient: 'from-purple-500/20 to-pink-500/20',
      delay: 0.2,
    },
    {
      id: 3,
      title: 'Developing a Mobile Health Tracking App',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      metrics: [
        { label: 'Conversion Rate', value: '12%', icon: '📈' },
        { label: 'User Satisfaction', value: '4.8★', icon: '⭐' },
      ],
      gradient: 'from-orange-500/20 to-red-500/20',
      delay: 0.3,
    },
    {
      id: 4,
      title: 'Optimizing a Corporate Intranet',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      metrics: [
        { label: 'Conversion Rate', value: '20%', icon: '📈' },
        { label: 'User Satisfaction', value: '95%', icon: '✅' },
      ],
      gradient: 'from-teal-500/20 to-blue-500/20',
      delay: 0.4,
    },
  ]

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y, opacity }}
          className="absolute top-1/4 left-0 w-full h-full"
        >
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Featured </span>
            <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
          </p>
        </motion.div>

        {/* Stacking Cards */}
        <div className="space-y-8 max-w-5xl mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ 
                duration: 0.6, 
                delay: card.delay,
                type: 'spring',
                stiffness: 100
              }}
              className="relative"
            >
              {/* Card Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${card.gradient} rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-1000`} />
              
              {/* Main Card */}
              <div className="relative glass-strong rounded-2xl p-8 md:p-10 hover:scale-[1.02] transition-transform duration-300">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                      {card.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {card.description}
                    </p>
                    
                    {/* Metrics */}
                    <div className="flex flex-wrap gap-4">
                      {card.metrics.map((metric, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: card.delay + 0.2 + idx * 0.1 }}
                          className="glass px-4 py-2 rounded-lg border border-white/10"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{metric.icon}</span>
                            <div>
                              <div className="text-xs text-gray-400">{metric.label}</div>
                              <div className="text-sm font-semibold text-white">{metric.value}</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Visual Element */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: card.delay + 0.3 }}
                    className="w-full md:w-48 h-48 rounded-xl overflow-hidden relative"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
                      <motion.div
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 20,
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                        className="w-32 h-32 rounded-full border-2 border-white/20"
                      />
                      <motion.div
                        animate={{ 
                          rotate: [360, 0],
                          scale: [1.2, 1, 1.2]
                        }}
                        transition={{ 
                          duration: 15,
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                        className="absolute w-24 h-24 rounded-full border-2 border-white/30"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* View Case Study Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-6 py-2.5 rounded-lg border border-white/20 text-white font-medium hover:border-white/40 hover:bg-white/5 transition-all"
                >
                  View Case Study →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MainSection
