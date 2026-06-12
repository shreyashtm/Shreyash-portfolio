import { useLayoutEffect, useState } from 'react'
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

  useLayoutEffect(() => {
    const scroll = initSmoothScroll()

    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    return () => scroll.destroy()
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
