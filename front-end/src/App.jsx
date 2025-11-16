import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import MainSection from './components/MainSection'
import Blog from './components/Blog'
import SingleBlog from './components/SingleBlog'
import Experience from './components/Experience'
import FAQ from './components/FAQ'
import Calculator from './components/Calculator'
import Contact from './components/Contact'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <MainSection />
              <Blog isHome={true} />
            </>
          } />
          <Route path="/experience" element={<Experience />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/proposal" element={<Calculator />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/studio" element={<Calculator />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
