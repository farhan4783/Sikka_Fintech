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
      <Navbar onLoginClick={() => setIsLoginModalOpen(true)} />
      <Hero onGetStarted={() => setIsLoginModalOpen(true)} />
      <Features />
      <CTASection onGetStarted={() => setIsLoginModalOpen(true)} />
      <Footer />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  )
}

export default App
