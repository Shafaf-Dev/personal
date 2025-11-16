import { motion } from 'framer-motion'

const Experience = () => {
  const experiences = [
    {
      title: 'Design Director',
      company: 'Stark Studio',
      period: 'Jan 2019 - Present',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      title: 'Co-Founder',
      company: 'Neon Agency',
      period: 'Jan 2017 - Dec 2018',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  ]

  return (
    <section className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-20 text-center"
        >
          <span className="text-white">Work </span>
          <span className="text-gradient">Experience</span>
        </motion.h1>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="glass-strong rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
              <p className="text-blue-400 mb-1">{exp.company}</p>
              <p className="text-gray-400 text-sm mb-4">{exp.period}</p>
              <p className="text-gray-300">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
