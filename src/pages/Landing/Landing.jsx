import { useState } from 'react'
import './Landing.css'
import AnimatedBackground from './components/AnimatedBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import LoginModal from './components/LoginModal'
import MouseGlow from './components/MouseGlow'

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <>
      <MouseGlow />
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <Features />
      <CTASection />
      <Footer />
    </>
  )
}

export default App
