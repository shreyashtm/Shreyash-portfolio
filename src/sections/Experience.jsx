import { useState } from 'react'
import './Experience.css'

const CAREER_ARC = [
  {
    period: 'Year 1–2',
    phase: 'Execution',
    description:
      'Unified multi-vendor BMS sensor data (BACnet/Modbus) into a single analytics schema, and built the first energy load forecasting model on top of it.',
  },
  {
    period: 'Year 2–3',
    phase: 'Ownership',
    description:
      'Anomaly detection on live sensor streams and predictive maintenance scoring — deciding what counts as "real" versus noise. Colleagues started checking with me before escalating.',
  },
  {
    period: 'Year 3–4',
    phase: 'Translation',
    description:
      'Diagnosed control-loop inefficiencies for commissioning engineers and built comfort/occupancy analytics for facility managers. People came to me to interpret, not just compute.',
  },
  {
    period: 'Year 4',
    phase: 'Influence',
    description:
      'Strategic fleet dashboards for product and roadmap decisions. Dual-audience BI serving both facility ops and internal stakeholders from one unified data layer.',
  },
]

const EXPERIENCE = [
  {
    company: 'Siemens Technology and Services',
    role: 'Software Engineer',
    period: 'May 2022 — Present',
    current: true,
    summary:
      'Building production data systems across the Smart Infrastructure Building Automation stack — from multi-source sensor data pipelines and forecasting models to strategic dashboards for leadership.',
    impact: ['8 analytical scopes', '100k+ daily records', '4-year progression'],
    bullets: [
      'Unified multi-vendor BMS sensor data into a single analytics-ready schema for downstream forecasting, anomaly detection, and reporting.',
      'Built and deployed ARIMA and LSTM forecasting models for energy load prediction, including rolling-window validation and stakeholder-facing reliability communication.',
      'Designed strategic fleet dashboards and dual-audience BI systems serving both facility operations and internal product stakeholders.',
    ],
    arc: CAREER_ARC,
  },
  {
    company: 'Zappkode Solutions',
    role: 'Python Developer',
    period: 'Feb 2021 — Jun 2021',
    current: false,
    summary:
      'Built data processing and analytics modules for Project Greenbill, a retail billing platform for grocery stores, petrol pumps, and retail chains.',
    impact: ['Python analytics', 'Retail transactions', 'Dashboard support'],
    bullets: [
      'Built real-time analytics modules using Python, Pandas, and NumPy for transaction reporting.',
      'Designed data processing pipelines to clean, validate, and transform transaction data.',
      'Mentored 3 interns on Python scripting, data processing, and analytical problem solving.',
    ],
  },
]

export default function Experience() {
  const [arcOpen, setArcOpen] = useState(false)

  return (
    <section id="experience" className="experience">
      <div className="container">
        <span className="section-label" data-reveal>Experience</span>
        <h2 className="section-title" data-reveal>
          Where the work <span className="serif gradient-text">shipped</span>
        </h2>

        <div className="experience__list">
          {EXPERIENCE.map((job, i) => (
            <article
              className={`experience__card card ${job.current ? 'experience__card--current' : ''}`}
              key={job.company}
              data-reveal
              data-reveal-delay={String(i * 0.08)}
            >
              <div className="experience__top">
                <div>
                  <h3>{job.role}</h3>
                  <p className="experience__company">{job.company}</p>
                </div>
                <span className="experience__period">{job.period}</span>
              </div>

              <p className="experience__summary">{job.summary}</p>

              <div className="experience__impact">
                {job.impact.map((item) => (
                  <span className="tag" key={item}>{item}</span>
                ))}
              </div>

              <ul className="experience__bullets">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              {job.arc && (
                <div
                  className={`experience__arc ${arcOpen ? 'experience__arc--open' : ''}`}
                  onClick={() => { if (window.innerWidth <= 768) setArcOpen((v) => !v) }}
                >
                  <div className="experience__arc-toggle">
                    <span className="experience__arc-label">Career Progression</span>
                    <span className="experience__arc-summary">
                      {job.arc.map((b, j) => (
                        <span key={b.phase}>
                          {b.phase}{j < job.arc.length - 1 ? ' → ' : ''}
                        </span>
                      ))}
                    </span>
                    <span className="experience__arc-chevron">↓</span>
                  </div>
                  <div className="experience__arc-collapse">
                  <div className="experience__arc-timeline">
                    {job.arc.map((block, j) => (
                      <div className="experience__arc-block" key={block.phase}>
                        <div className="experience__arc-marker">
                          <span className="experience__arc-dot" />
                          {j < job.arc.length - 1 && <span className="experience__arc-line" />}
                        </div>
                        <div className="experience__arc-body">
                          <div className="experience__arc-header">
                            <span className="experience__arc-period">{block.period}</span>
                            <span className="experience__arc-phase">{block.phase}</span>
                          </div>
                          <p className="experience__arc-desc">{block.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
