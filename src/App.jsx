import { useLayoutEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import RetroBackground from './components/RetroBackground'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import ResumeModal from './components/ResumeModal'
import useRevealAnimations from './hooks/useRevealAnimations'
import { initSmoothScroll } from './lib/smoothScroll'

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false)
  const initializedRef = useRef(false)

  useLayoutEffect(() => {
    // Prevent double initialization in React Strict Mode
    if (initializedRef.current) return
    initializedRef.current = true

    let scrollInstance = null
    if (typeof initSmoothScroll === 'function') {
      scrollInstance = initSmoothScroll()
    }

    // Defer ScrollTrigger refresh until after React hydration & layout calculations settle
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 0)

    return () => {
      clearTimeout(timer)
      if (scrollInstance?.destroy) scrollInstance.destroy()
    }
  }, [])

  useRevealAnimations()

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span className="scroll-progress__bar" />
      </div>
      <RetroBackground />
      <Navbar />
      <main>
        <Hero onResumeOpen={() => setResumeOpen(true)} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </>
  )
}
