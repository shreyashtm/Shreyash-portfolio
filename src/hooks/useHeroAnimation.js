import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const parseMetricValue = (value) => {
  const normalized = String(value || '').trim()

  if (normalized.endsWith('k+')) {
    return { amount: Number.parseFloat(normalized), suffix: 'k+' }
  }

  if (normalized.endsWith('%')) {
    return { amount: Number.parseFloat(normalized), suffix: '%' }
  }

  if (normalized.endsWith('+')) {
    return { amount: Number.parseFloat(normalized), suffix: '+' }
  }

  return { amount: Number.parseFloat(normalized) || 0, suffix: '' }
}

const formatMetricValue = (amount, suffix) => {
  if (suffix === 'k+') return `${Math.round(amount)}k+`
  if (suffix === '%') return `${Math.round(amount)}%`
  if (suffix === '+') return `${Math.round(amount)}+`
  return `${Math.round(amount)}`
}

const setFinalMetricValues = (scope) => {
  scope.querySelectorAll('[data-hero-metric-value]').forEach((element) => {
    const { amount, suffix } = parseMetricValue(element.dataset.heroMetricValue)
    element.textContent = formatMetricValue(amount, suffix)
  })
}

const splitTextToChars = (element) => {
  const originalHtml = element.innerHTML
  const originalLabel = (element.textContent || '').replace(/\s+/g, ' ').trim()
  const targets = element.querySelectorAll('[data-hero-title-line]').length
    ? Array.from(element.querySelectorAll('[data-hero-title-line]'))
    : [element]

  element.setAttribute('aria-label', originalLabel)

  targets.forEach((target) => {
    const original = target.textContent || ''
    const fragment = document.createDocumentFragment()

    target.textContent = ''
    target.setAttribute('aria-hidden', 'true')

    Array.from(original).forEach((character) => {
      const wrapper = document.createElement('span')
      wrapper.className = character === ' ' ? 'char char--space' : 'char'
      wrapper.setAttribute('aria-hidden', 'true')

      if (character === ' ') {
        wrapper.innerHTML = '&nbsp;'
        fragment.appendChild(wrapper)
        return
      }

      const inner = document.createElement('span')
      inner.className = 'char__inner'
      inner.textContent = character
      wrapper.appendChild(inner)
      fragment.appendChild(wrapper)
    })

    target.appendChild(fragment)
  })

  return () => {
    element.removeAttribute('aria-label')
    element.innerHTML = originalHtml
  }
}

export default function useHeroAnimation(scopeRef) {
  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope) return undefined

    const title = scope.querySelector('[data-hero="title"]')
    const restoreTitle = title ? splitTextToChars(title) : () => {}

    let media

    const ctx = gsap.context(() => {
      const reducedMotion = prefersReducedMotion()
      const titleChars = gsap.utils.toArray('.char__inner')
      const eyebrow = scope.querySelector('[data-hero="eyebrow"]')
      const lead = scope.querySelector('[data-hero="lead"]')
      const actions = scope.querySelector('[data-hero="actions"]')
      const visual = scope.querySelector('[data-hero="visual"]')
      const metricCards = gsap.utils.toArray('[data-hero="metric"]')
      const metricValues = gsap.utils.toArray('[data-hero-metric-value]')
      const chartBars = gsap.utils.toArray('.hero__mini-chart span')
      const scrollCue = scope.querySelector('.hero__scroll-cue')

      scope.style.setProperty('--hero-parallax-x', '0px')
      scope.style.setProperty('--hero-parallax-y', '0px')
      scope.style.setProperty('--hero-parallax-inverse-x', '0px')
      scope.style.setProperty('--hero-parallax-inverse-y', '0px')
      scope.style.setProperty('--title-depth-x', '0px')
      scope.style.setProperty('--title-depth-y', '0px')

      if (reducedMotion) {
        gsap.set([eyebrow, lead, actions, visual, metricCards, scrollCue], {
          autoAlpha: 1,
          y: 0,
          clearProps: 'transform',
        })
        gsap.set(titleChars, { yPercent: 0, rotateX: 0 })
        gsap.set(chartBars, { scaleY: 1, autoAlpha: 1 })
        setFinalMetricValues(scope)
        return
      }

      gsap.set(titleChars, {
        yPercent: 118,
        rotateX: -32,
        transformOrigin: '50% 100%',
      })
      gsap.set([eyebrow, lead, actions, visual, metricCards], {
        y: 28,
        autoAlpha: 0,
      })
      gsap.set(chartBars, {
        scaleY: 0.14,
        autoAlpha: 0,
        transformOrigin: 'bottom center',
      })

      const timeline = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      })

      timeline
        .to(eyebrow, { y: 0, autoAlpha: 1, duration: 0.75 }, 0.05)
        .to(
          titleChars,
          {
            yPercent: 0,
            rotateX: 0,
            duration: 1.05,
            stagger: 0.018,
            ease: 'power4.out',
          },
          0.12
        )
        .to(lead, { y: 0, autoAlpha: 1, duration: 0.85 }, 0.48)
        .to(actions, { y: 0, autoAlpha: 1, duration: 0.75 }, 0.62)
        .to(visual, { y: 0, autoAlpha: 1, duration: 0.95 }, 0.42)
        .to(
          metricCards,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.75,
            stagger: 0.08,
          },
          0.76
        )
        .to(
          chartBars,
          {
            scaleY: 1,
            autoAlpha: 1,
            duration: 0.82,
            stagger: 0.055,
            ease: 'power3.out',
          },
          0.84
        )

      metricValues.forEach((element, index) => {
        const { amount, suffix } = parseMetricValue(element.dataset.heroMetricValue)
        const proxy = { value: 0 }

        timeline.to(
          proxy,
          {
            value: amount,
            duration: 1.1,
            ease: 'power2.out',
            onUpdate: () => {
              element.textContent = formatMetricValue(proxy.value, suffix)
            },
            onComplete: () => {
              element.textContent = formatMetricValue(amount, suffix)
            },
          },
          0.86 + index * 0.08
        )
      })

      gsap.to(visual, {
        y: -54,
        ease: 'none',
        scrollTrigger: {
          trigger: scope,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.15,
        },
      })

      gsap.to(scrollCue, {
        y: 18,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: scope,
          start: 'top top',
          end: '35% top',
          scrub: 0.8,
        },
      })

      media = gsap.matchMedia()
      media.add('(pointer: fine) and (min-width: 861px)', () => {
        const state = { x: 0, y: 0 }
        const renderX = () => {
          scope.style.setProperty('--hero-parallax-x', `${state.x}px`)
          scope.style.setProperty('--hero-parallax-inverse-x', `${state.x * -0.48}px`)
          scope.style.setProperty('--title-depth-x', `${state.x}px`)
        }
        const renderY = () => {
          scope.style.setProperty('--hero-parallax-y', `${state.y}px`)
          scope.style.setProperty('--hero-parallax-inverse-y', `${state.y * -0.58}px`)
          scope.style.setProperty('--title-depth-y', `${state.y}px`)
        }
        const xTo = gsap.quickTo(state, 'x', {
          duration: 0.72,
          ease: 'power3.out',
          onUpdate: renderX,
        })
        const yTo = gsap.quickTo(state, 'y', {
          duration: 0.72,
          ease: 'power3.out',
          onUpdate: renderY,
        })

        const handlePointerMove = (event) => {
          const rect = scope.getBoundingClientRect()
          const progressX = (event.clientX - rect.left) / rect.width - 0.5
          const progressY = (event.clientY - rect.top) / rect.height - 0.5
          xTo(progressX * 30)
          yTo(progressY * 22)
        }

        const handlePointerLeave = () => {
          xTo(0)
          yTo(0)
        }

        window.addEventListener('pointermove', handlePointerMove)
        window.addEventListener('blur', handlePointerLeave)
        scope.addEventListener('pointerleave', handlePointerLeave)

        return () => {
          window.removeEventListener('pointermove', handlePointerMove)
          window.removeEventListener('blur', handlePointerLeave)
          scope.removeEventListener('pointerleave', handlePointerLeave)
          gsap.killTweensOf(state)
        }
      })
    }, scope)

    return () => {
      media?.revert()
      ctx.revert()
      restoreTitle()
    }
  }, [scopeRef])
}
