import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FormCanvas from './components/FormCanvas'
import BootSequence from './components/BootSequence'
import Navbar from './components/Navbar'
import Landing from './sections/Landing'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Education from './sections/Education'
import Contact from './sections/Contact'
import ResumeModal from './components/ResumeModal'
import useRevealAnimations from './hooks/useRevealAnimations'
import { initSmoothScroll } from './lib/smoothScroll'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const handler = (e) => setTheme(e.matches ? 'light' : 'dark')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return theme
}

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false)
  const [bootComplete, setBootComplete] = useState(prefersReducedMotion)
  const [fontsReady, setFontsReady] = useState(false)
  const bootConcentrationRef = useRef(prefersReducedMotion ? 1 : 0)
  const theme = useTheme()

  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true))
  }, [])

  useLayoutEffect(() => {
    if (bootComplete) {
      const scrollInstance = initSmoothScroll()
      const timer = setTimeout(() => ScrollTrigger.refresh(), 100)
      return () => {
        clearTimeout(timer)
        if (scrollInstance?.destroy) scrollInstance.destroy()
      }
    }

    if (!fontsReady) return

    document.body.style.overflow = 'hidden'

    const content = document.querySelector('.landing__content')
    const navbar = document.querySelector('.navbar')
    const logo = document.querySelector('.navbar__logo')
    if (!content) return

    const setupBoot = () => {
      content.style.display = 'inline-block'
      const rect = content.getBoundingClientRect()
      const centerX = (window.innerWidth / 2) - (rect.left + rect.width / 2)
      const centerY = (window.innerHeight / 2) - (rect.top + rect.height / 2)
      content.style.display = ''

      return { centerX, centerY }
    }

    const { centerX, centerY } = setupBoot()
    const isMobile = window.innerWidth <= 768
    const bootScale = isMobile ? 1.05 : 1.2

    const counterEl = document.querySelector('.boot__counter')
    const counterProxy = { value: 0 }

    const ctx = gsap.context(() => {
      const nameEl = content.querySelector('.landing__name')

      gsap.set('.landing__first', { autoAlpha: 0, y: isMobile ? 16 : 30 })
      gsap.set('.landing__last', { opacity: 0, y: isMobile ? 16 : 30 })
      gsap.set('.landing__meta', { autoAlpha: 0, y: 16 })
      gsap.set('.landing__tagline', { autoAlpha: 0, y: 16 })
      gsap.set('.landing__scroll', { autoAlpha: 0, y: 16 })
      gsap.set(content, { x: centerX, y: centerY, scale: bootScale, display: 'inline-block' })
      gsap.set(navbar, { autoAlpha: 0, y: -20 })
      gsap.set(logo, { autoAlpha: 0 })
      gsap.set('.navbar__link', { autoAlpha: 0, y: 12 })

      const tl = gsap.timeline({
        delay: 0.8,
        onComplete: () => {
          document.body.style.overflow = ''
          gsap.set(content, { clearProps: 'all' })
          gsap.set('.landing__first', { clearProps: 'all' })
          gsap.set('.landing__last', { clearProps: 'all' })
          gsap.set('.landing__meta', { clearProps: 'all' })
          gsap.set('.landing__tagline', { clearProps: 'all' })
          gsap.set('.navbar__link', { clearProps: 'all' })
          gsap.set(navbar, { clearProps: 'transform,opacity,visibility' })
          if (nameEl) gsap.set(nameEl, { clearProps: 'all' })
          setBootComplete(true)
        },
      })

      tl.to(bootConcentrationRef, { current: 1, duration: 5.5, ease: 'power2.inOut' }, 0)
      tl.to('.boot__bar-fill', { scaleX: 1, duration: 5.5, ease: 'power2.inOut' }, 0)
      tl.to(counterProxy, {
        value: 100,
        duration: 5.5,
        ease: 'power2.inOut',
        onUpdate() {
          if (counterEl) counterEl.textContent = String(Math.round(counterProxy.value)).padStart(3, '0')
        },
      }, 0)

      tl.to('.boot', { autoAlpha: 0, duration: 0.6 }, 5.8)

      // Name appears centered over orb — use text shadow for contrast
      const shadowRgb = theme === 'light' ? '245,242,237' : '0,0,0'
      if (nameEl) gsap.set(nameEl, { textShadow: `0 2px 30px rgba(${shadowRgb},0.9), 0 0px 60px rgba(${shadowRgb},0.6)` })

      tl.to('.landing__first', { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 6.0)
      tl.to('.landing__last', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 6.2)
      tl.to('.landing__meta', { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 6.6)
      tl.to('.landing__tagline', { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 6.8)

      tl.to(content, {
        x: 0, y: 0, scale: 1, duration: 1.6, ease: 'power3.inOut',
      }, 7.0)
      // Fade out the text shadow as name moves to corner
      if (nameEl) {
        tl.to(nameEl, {
          textShadow: '0 0px 0px rgba(0,0,0,0)',
          duration: 1.0, ease: 'power2.out',
        }, 7.4)
      }
      tl.to(navbar, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 7.8)
      tl.to('.navbar__link', {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
      }, 7.9)
      tl.to('.landing__scroll', { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 8.0)
    })

    return () => {
      ctx.revert()
      bootConcentrationRef.current = 0
      document.body.style.overflow = ''
    }
  }, [bootComplete, fontsReady])

  useRevealAnimations(bootComplete)

  return (
    <>
      <a href="#about" className="skip-to-content">Skip to content</a>
      <FormCanvas
        bootConcentrationRef={bootConcentrationRef}
        bootComplete={bootComplete}
        theme={theme}
      />
      <div className="grid-bg" aria-hidden="true" />
      {!bootComplete && <BootSequence />}
      <Navbar onResumeOpen={() => setResumeOpen(true)} bootComplete={bootComplete} />
      <div className="scroll-progress" aria-hidden="true">
        <span className="scroll-progress__bar" />
      </div>
      <main>
        <Landing />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </>
  )
}
