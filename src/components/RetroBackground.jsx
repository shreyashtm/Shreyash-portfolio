import { useEffect, useRef } from 'react'
import './RetroBackground.css'

export default function RetroBackground() {
  const rootRef = useRef(null)
  const blocks = [
    ['7%', '18%'],
    ['86%', '16%'],
    ['17%', '43%'],
    ['73%', '44%'],
    ['42%', '25%'],
    ['58%', '68%'],
    ['4%', '72%'],
    ['92%', '70%'],
    ['32%', '82%'],
    ['66%', '9%'],
  ]
  const coins = Array.from({ length: 14 }, (_, index) => ({
    left: `${index * 7.1 + 1}%`,
    top: `${20 + (index % 5) * 14}%`,
    delay: `${index * -0.12}s`,
  }))
  const lanes = Array.from({ length: 5 }, (_, index) => ({
    top: `${12 + index * 17}%`,
    delay: `${index * -1.3}s`,
  }))

  useEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const pointer = {
      currentX: window.innerWidth * 0.72,
      currentY: window.innerHeight * 0.56,
      targetX: window.innerWidth * 0.72,
      targetY: window.innerHeight * 0.56,
      previousX: window.innerWidth * 0.72,
      previousY: window.innerHeight * 0.56,
      previousTime: performance.now(),
    }
    let frameId
    let engageTimer

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

    const engage = () => {
      root.classList.add('retro-bg--engaged')
      window.clearTimeout(engageTimer)
      engageTimer = window.setTimeout(() => {
        root.classList.remove('retro-bg--engaged')
      }, 1400)
    }

    const setTarget = (x, y) => {
      pointer.targetX = clamp(x, 48, window.innerWidth - 48)
      pointer.targetY = clamp(y, 96, window.innerHeight - 90)
      engage()
    }

    const handlePointerMove = (event) => {
      setTarget(event.clientX, event.clientY)
    }

    const handleResize = () => {
      setTarget(window.innerWidth * 0.72, window.innerHeight * 0.56)
    }

    const animate = (time) => {
      const delta = Math.min((time - pointer.previousTime) / 16.67, 3)
      pointer.previousTime = time

      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.12
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.12

      const velocityX = pointer.currentX - pointer.previousX
      const velocityY = pointer.currentY - pointer.previousY
      const energy = clamp(Math.hypot(velocityX, velocityY) / 28, 0, 1)
      const tilt = clamp(velocityX * 0.42, -18, 18)
      const progressX = pointer.currentX / window.innerWidth - 0.5
      const progressY = pointer.currentY / window.innerHeight - 0.5
      const parallaxX = progressX * 34
      const parallaxY = progressY * 24

      root.style.setProperty('--player-x', `${pointer.currentX}px`)
      root.style.setProperty('--player-y', `${pointer.currentY}px`)
      root.style.setProperty('--player-tilt', `${tilt}deg`)
      root.style.setProperty('--pointer-energy', energy.toFixed(3))
      root.style.setProperty('--aura-size', `${11 + energy * 4}rem`)
      root.style.setProperty('--aura-opacity', (0.28 + energy * 0.32).toFixed(3))
      root.style.setProperty('--player-scale', (1 + energy * 0.08).toFixed(3))
      root.style.setProperty('--player-glow', `${14 + energy * 20}px`)
      root.style.setProperty('--engine-opacity', (0.62 + energy * 0.32).toFixed(3))
      root.style.setProperty('--engine-cyan-opacity', (energy * 0.24).toFixed(3))
      root.style.setProperty('--trail-scale', (1 + energy * 1.1).toFixed(3))
      root.style.setProperty('--reticle-size', `${104 + energy * 36}px`)
      root.style.setProperty('--reticle-opacity', (0.22 + energy * 0.36).toFixed(3))
      root.style.setProperty('--reticle-active-opacity', (0.48 + energy * 0.32).toFixed(3))
      root.style.setProperty('--spark-opacity', (0.34 + energy * 0.42).toFixed(3))
      root.style.setProperty('--parallax-x', `${parallaxX}px`)
      root.style.setProperty('--parallax-y', `${parallaxY}px`)
      root.style.setProperty('--parallax-vignette-x', `${parallaxX * -0.8}px`)
      root.style.setProperty('--parallax-vignette-y', `${parallaxY * -0.6}px`)
      root.style.setProperty('--parallax-tile-x', `${parallaxX * -0.35}px`)
      root.style.setProperty('--parallax-tile-y', `${parallaxY * -0.35}px`)
      root.style.setProperty('--parallax-slow-x', `${parallaxX * 0.35}px`)
      root.style.setProperty('--parallax-slow-y', `${parallaxY * 0.24}px`)
      root.style.setProperty('--parallax-fast-x', `${parallaxX * 0.72}px`)
      root.style.setProperty('--parallax-fast-y', `${parallaxY * 0.52}px`)
      root.style.setProperty('--parallax-circuit-x', `${parallaxX * -0.28}px`)
      root.style.setProperty('--parallax-circuit-y', `${parallaxY * 0.18}px`)

      pointer.previousX = pointer.currentX
      pointer.previousY = pointer.currentY
      frameId = window.requestAnimationFrame(animate)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('resize', handleResize)
    frameId = window.requestAnimationFrame(animate)

    return () => {
      window.clearTimeout(engageTimer)
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="retro-bg" ref={rootRef} aria-hidden="true">
      <div className="retro-bg__vignette-glow" />
      <div className="retro-bg__tile-layer retro-bg__tile-layer--back" />
      <div className="retro-bg__stars retro-bg__stars--slow" />
      <div className="retro-bg__stars retro-bg__stars--fast" />

      <div className="retro-bg__circuit">
        {lanes.map((lane, index) => (
          <span
            key={index}
            style={{
              '--lane-top': lane.top,
              '--lane-delay': lane.delay,
            }}
          />
        ))}
      </div>

      <div className="retro-bg__blocks">
        {blocks.map(([left, top], index) => (
          <span
            key={index}
            style={{
              '--block-left': left,
              '--block-top': top,
              '--block-delay': `${index * -0.22}s`,
            }}
          />
        ))}
      </div>

      <div className="retro-bg__coins">
        {coins.map((coin, index) => (
          <span
            key={index}
            style={{
              '--coin-left': coin.left,
              '--coin-top': coin.top,
              '--coin-delay': coin.delay,
            }}
          />
        ))}
      </div>

      <div className="retro-bg__portal retro-bg__portal--one" />
      <div className="retro-bg__portal retro-bg__portal--two" />

      <div className="retro-bg__ship">
        <span />
      </div>

      <div className="retro-bg__pointer-aura" />
      <div className="retro-bg__player">
        <span className="retro-bg__player-core" />
        <span className="retro-bg__player-window" />
        <span className="retro-bg__player-trail" />
      </div>

      <div className="retro-bg__reticle" />
      <div className="retro-bg__pointer-sparks">
        <span />
        <span />
        <span />
      </div>
      <div className="retro-bg__hud">
        <span />
        <span />
        <span />
      </div>

      <div className="retro-bg__ground">
        <div className="retro-bg__ground-track" />
      </div>

      <div className="retro-bg__tile-layer retro-bg__tile-layer--front" />
      <div className="retro-bg__scanlines" />
      <div className="retro-bg__veil" />
    </div>
  )
}
