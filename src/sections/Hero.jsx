import { useRef } from 'react'
import { FiArrowUpRight, FiDownload, FiMail } from 'react-icons/fi'
import useHeroAnimation from '../hooks/useHeroAnimation'
import useMagnetic from '../hooks/useMagnetic'
import './Hero.css'
import photo from '../assets/photo-optimized.jpg'

const metrics = [
  { value: '4+', label: 'Years building production data systems' },
  { value: '100k+', label: 'Daily operational records analyzed' },
  { value: '30%', label: 'Manual reporting effort reduced' },
]

const chartBars = [44, 58, 52, 72, 66, 84, 78, 92]

export default function Hero({ onResumeOpen }) {
  const scopeRef = useRef(null)
  const magneticRef = useMagnetic(0.32)

  useHeroAnimation(scopeRef)

  return (
    <section id="hero" className="hero" ref={scopeRef}>
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__eyebrow" data-hero="eyebrow">
            Software Engineer · Data Products · Forecasting
          </span>

          <h1 className="hero__title" data-hero="title">
            Shreyash Tembhurne
          </h1>

          <p className="hero__lead" data-hero="lead">
            I design data systems that turn operational noise into clear decisions:
            forecasting models, BI dashboards, and analytics pipelines that ship
            into production.
          </p>

          <div className="hero__actions" data-hero="actions">
            <span className="btn-magnetic" ref={magneticRef}>
              <a href="#projects" className="btn btn-primary">
                View case studies
                <FiArrowUpRight aria-hidden="true" />
              </a>
            </span>
            <button type="button" className="btn btn-outline" onClick={onResumeOpen}>
              Resume
              <FiDownload aria-hidden="true" />
            </button>
            <a href="mailto:shreyash13.tm@gmail.com" className="btn btn-outline">
              Contact
              <FiMail aria-hidden="true" />
            </a>
          </div>

          <div className="hero__metrics">
            {metrics.map((metric, index) => (
              <div className="hero__metric" key={metric.label} data-hero="metric">
                <span data-hero-metric-value={index}>0</span>
                <p>{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="hero__visual" data-hero="visual">
          <div className="hero__portrait-card">
            <img src={photo} alt="Shreyash Tembhurne" className="hero__photo" />
            <div className="hero__status">
              <span />
              Open to data engineering and analytics roles
            </div>
          </div>

          <div className="hero__signal-card">
            <div className="hero__signal-topline">
              <span>Forecast accuracy</span>
              <strong>+15%</strong>
            </div>
            <div className="hero__mini-chart" aria-hidden="true">
              {chartBars.map((height, index) => (
                <span
                  key={index}
                  style={{
                    height: `${height}%`,
                  }}
                />
              ))}
            </div>
            <div className="hero__signal-footer">
              <span>ARIMA + LSTM</span>
              <span>production</span>
            </div>
          </div>
        </aside>
      </div>

      <a href="#about" className="hero__scroll-cue" aria-label="Scroll to about">
        <span />
        Scroll
      </a>
    </section>
  )
}
