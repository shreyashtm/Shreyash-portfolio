import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

export default function useRevealAnimations() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray('[data-reveal]')

      if (prefersReducedMotion()) {
        gsap.set(elements, { autoAlpha: 1, y: 0, clearProps: 'transform' })
        gsap.set('.scroll-progress__bar', { scaleX: 1 })
        return
      }

      elements.forEach((element) => {
        const delay = Number(element.dataset.revealDelay || 0)

        gsap.from(element, {
          y: 40,
          autoAlpha: 0,
          duration: 0.85,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            once: true,
          },
        })
      })

      gsap.set('.scroll-progress__bar', { scaleX: 0, transformOrigin: 'left center' })
      gsap.to('.scroll-progress__bar', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.35,
        },
      })

      gsap.set('.data-bg__forecast-line', { animation: 'none' })

      gsap.fromTo(
        '.data-bg__forecast-line',
        { strokeDashoffset: 900, opacity: 0.35 },
        {
          strokeDashoffset: 0,
          opacity: 0.58,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      )

      gsap.to('.data-bg__forecast', {
        y: -90,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      gsap.to('.data-bg__grid', {
        y: -48,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.6,
        },
      })

      gsap.to('.data-bg__axis--y', {
        x: 24,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.4,
        },
      })

      ScrollTrigger.refresh()
    })

    return () => ctx.revert()
  }, [])
}
