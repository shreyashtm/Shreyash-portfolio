import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function useRevealAnimations(enabled = true) {
  useLayoutEffect(() => {
    if (!enabled) return
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set('[data-reveal], .card, .tag, .section-label, .about__metric-value', {
          autoAlpha: 1, y: 0, x: 0, scale: 1, clearProps: 'transform',
        })
        gsap.set('.scroll-progress__bar', { scaleX: 1 })
        return
      }

      // Generic data-reveal elements (skip cards, labels, metrics — they have their own animation)
      const reveals = gsap.utils.toArray('[data-reveal]').filter((el) =>
        !el.classList.contains('card') &&
        !el.classList.contains('section-label') &&
        !el.classList.contains('about__metric-value')
      )

      reveals.forEach((element) => {
        const delay = Number(element.dataset.revealDelay || 0)

        gsap.fromTo(element,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1, y: 0,
            duration: 0.9, delay, ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 88%', once: true },
          }
        )
      })

      // Section labels slide in from left
      gsap.utils.toArray('.section-label').forEach((label) => {
        gsap.fromTo(label,
          { autoAlpha: 0, x: -24 },
          {
            autoAlpha: 1, x: 0,
            duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: label, start: 'top 90%', once: true },
          }
        )
      })

      // Cards staggered entrance per section
      gsap.utils.toArray('section').forEach((section) => {
        const cards = section.querySelectorAll('.card')
        if (cards.length < 1) return

        gsap.set(cards, { autoAlpha: 0, y: 44, scale: 0.97 })

        ScrollTrigger.create({
          trigger: cards[0],
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              autoAlpha: 1, y: 0, scale: 1,
              duration: 0.8, stagger: 0.12, ease: 'power3.out',
            })
          },
        })
      })

      // Tags stagger in
      gsap.utils.toArray('.skills__tags').forEach((group) => {
        const tags = group.querySelectorAll('.tag')
        if (!tags.length) return

        gsap.set(tags, { autoAlpha: 0, scale: 0.85, y: 8 })

        ScrollTrigger.create({
          trigger: group,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(tags, {
              autoAlpha: 1, scale: 1, y: 0,
              duration: 0.5, stagger: 0.03, ease: 'back.out(1.4)',
            })
          },
        })
      })

      // Metric values
      gsap.utils.toArray('.about__metric-value').forEach((el) => {
        gsap.fromTo(el,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1, y: 0,
            duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        )
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

      ScrollTrigger.refresh()
    })

    return () => ctx.revert()
  }, [enabled])
}
