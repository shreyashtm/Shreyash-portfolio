import { useEffect, useRef, useState } from 'react'

export default function useScrollAnimation() {
  const ref = useRef(null)
  const [state, setState] = useState('hidden')
  const stateRef = useRef('hidden')

  const updateState = (newState) => {
    stateRef.current = newState
    setState(newState)
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Reset to hidden after exit animation finishes
    const onTransitionEnd = () => {
      if (stateRef.current === 'exiting') {
        updateState('hidden')
      }
    }
    el.addEventListener('transitionend', onTransitionEnd)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateState('visible')
          } else {
            if (stateRef.current === 'visible') {
              updateState('exiting')
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '-40px 0px -50% 0px'
      }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      el.removeEventListener('transitionend', onTransitionEnd)
    }
  }, [])

  return { ref, state }
}