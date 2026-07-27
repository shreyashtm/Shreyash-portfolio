import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const nativeScrollTo = (target) => {
  if (typeof target === 'string') {
    const element = document.querySelector(target)
    element?.scrollIntoView()
    return
  }

  if (typeof target === 'number') {
    window.scrollTo(0, target)
  }
}

export function initSmoothScroll() {
  if (prefersReducedMotion()) {
    return {
      destroy: () => {},
      scrollTo: nativeScrollTo,
    }
  }

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.6,
  })

  const handleLenisScroll = () => ScrollTrigger.update()
  const tick = (time) => lenis.raf(time * 1000)

  const handleAnchorClick = (event) => {
    const link = event.target.closest?.('a[href^="#"]')
    if (!link) return

    const hash = link.getAttribute('href')
    if (!hash || hash === '#') return

    const target = document.querySelector(hash)
    if (!target) return

    event.preventDefault()
    lenis.scrollTo(target, {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lock: true,
    })
    window.history.pushState(null, '', hash)
  }

  lenis.on('scroll', handleLenisScroll)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  document.addEventListener('click', handleAnchorClick)
  document.documentElement.classList.add('has-smooth-scroll')

  return {
    destroy: () => {
      document.removeEventListener('click', handleAnchorClick)
      document.documentElement.classList.remove('has-smooth-scroll')
      gsap.ticker.remove(tick)
      lenis.off('scroll', handleLenisScroll)
      lenis.destroy()
    },
    scrollTo: (target, options) => lenis.scrollTo(target, options),
  }
}
