import { useRef, useEffect, useState } from 'react'
import './Hero.css'
import photo from '../assets/photo.jpg'

export default function Hero({ scrollY, onResumeOpen }) {
  const nameRef = useRef(null)
  const [namePos, setNamePos] = useState(null)

  // Measure where the name sits on screen on load
  useEffect(() => {
    const measure = () => {
      if (nameRef.current) {
        const rect = nameRef.current.getBoundingClientRect()
        setNamePos({
          top: rect.top + window.scrollY,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        })
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const heroHeight = window.innerHeight
  const progress = Math.min(scrollY / (heroHeight * 0.75), 1)

  // Name travels to logo position (top:20px left:32px is where ST sits)
  const targetTop = 20
  const targetLeft = 32
  const targetScale = 0.08  // how small the name shrinks to fit "ST" size

  const nameStyle = namePos ? {
    position: 'fixed',
    top: namePos.top - scrollY + (targetTop - (namePos.top - scrollY)) * progress,
    left: namePos.left + (targetLeft - namePos.left) * progress,
    width: namePos.width,
    transformOrigin: 'top left',
    transform: `scale(${1 - (1 - targetScale) * progress})`,
    opacity: progress < 0.85 ? 1 : 1 - ((progress - 0.85) / 0.15),
    pointerEvents: 'none',
    zIndex: 99,
    lineHeight: 1.05,
    margin: 0,
  } : {}

  // Background elements recede into the page
  const recedingStyle = (delay = 0) => {
  const p = Math.max(0, Math.min((progress - delay) / (1 - delay), 1))
  // ease-out so motion is snappy early and eases off
  const eased = 1 - Math.pow(1 - p, 2)
  return {
    opacity: Math.max(0, 1 - eased * 1.6),
    transform: `translateY(${eased * 60}px) scale(${1 - eased * 0.1}) translateZ(0)`,
    transformOrigin: 'center top',
    transition: 'none',
    willChange: 'transform, opacity',
  }
}

  return (
    <section id="hero" className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__glow hero__glow--1" aria-hidden="true" />
      <div className="hero__glow hero__glow--2" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__content">

          <span
            className="hero__eyebrow"
            style={recedingStyle(0)}
          >
            Software Engineer · Data & Analytics
          </span>

          {/* This is the visible name that stays in flow */}
          <h1
            className="hero__name"
            ref={nameRef}
            style={{ opacity: 0, pointerEvents: 'none' }}
          >
            Shreyash<br />
            <span className="hero__name--accent">Tembhurne</span>
          </h1>

          <p className="hero__tagline" style={recedingStyle(0)}>
            I build data systems that turn raw operational data into decisions —
            forecasting models, BI dashboards, and analytics pipelines
            that have shipped in production at scale.
          </p>

          <div className="hero__cta" style={recedingStyle(0.05)}>
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact"  className="btn btn-outline">Contact Me</a>
            <button
              className="btn btn-outline"
              onClick={onResumeOpen}
            >
              Resume ↓
            </button>
          </div>

          <div className="hero__stats" style={recedingStyle(0.1)}>
            <div className="hero__stat">
              <span className="hero__stat-number">4+</span>
              <span className="hero__stat-label">Years Experience</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">30%</span>
              <span className="hero__stat-label">Reporting Effort Reduced</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">15%</span>
              <span className="hero__stat-label">Forecast Accuracy Gained</span>
            </div>
          </div>
        </div>

        <div className="hero__photo-wrap" style={recedingStyle(0.05)}>
          <div className="hero__photo-placeholder">
            {/* <div className="hero__photo-initials">ST</div>
            <div className="hero__photo-hint">Add photo.jpg to src/assets/</div> */}
            <img
              src={photo}
              alt="Shreyash Tembhurne"
              className="hero__photo"
            />
          </div>
          <div className="hero__photo-ring" />
        </div>
      </div>

      {/* The animated name — rendered on top of everything, travels to logo */}
      {namePos && (
        <h1 className="hero__name hero__name--floating" style={nameStyle}>
          Shreyash<br />
          <span className="hero__name--accent">Tembhurne</span>
        </h1>
      )}

      <a href="#about" className="hero__scroll" aria-label="Scroll down">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-text">scroll</span>
      </a>
    </section>
  )
}
