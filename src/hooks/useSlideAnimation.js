import { useEffect, useRef, useState } from 'react'

export default function useSlideAnimation(delay = 0) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisible(true), delay)
          } else {
            setVisible(false)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '-30px 0px -30px 0px'
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return { ref, visible }
}