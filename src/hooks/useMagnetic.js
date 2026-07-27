import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function useMagnetic(strength = 0.28) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root || prefersReducedMotion()) return undefined

    const canHover = window.matchMedia('(pointer: fine)').matches
    if (!canHover) return undefined

    const target = root.firstElementChild || root

    const handlePointerMove = (event) => {
      const rect = root.getBoundingClientRect()
      const x = (event.clientX - rect.left - rect.width / 2) * strength
      const y = (event.clientY - rect.top - rect.height / 2) * strength

      gsap.to(target, {
        x,
        y,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: true,
      })
    }

    const handlePointerLeave = () => {
      gsap.to(target, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.45)',
        overwrite: true,
      })
    }

    root.addEventListener('pointermove', handlePointerMove)
    root.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      root.removeEventListener('pointermove', handlePointerMove)
      root.removeEventListener('pointerleave', handlePointerLeave)
      gsap.killTweensOf(target)
      gsap.set(target, { clearProps: 'transform' })
    }
  }, [strength])

  return ref
}
