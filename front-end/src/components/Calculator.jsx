import { motion } from 'framer-motion'

const Calculator = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-20 text-center"
        >
          <span className="text-white">Project </span>
          <span className="text-gradient">Calculator</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-strong rounded-2xl p-8 text-center"
        >
          <p className="text-gray-300 text-lg mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="text-gray-400">
            Calculator functionality coming soon...
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Calculator
