import { FiArrowUpRight } from 'react-icons/fi'
import './Projects.css'

const PROJECTS = [
  {
    title: 'Retail Demand Forecasting & Dynamic Pricing Engine',
    eyebrow: 'Forecasting · Pricing Strategy',
    status: 'Completed',
    accent: 'var(--crimson)',
    description:
      'Production-ready ML pipeline for retail demand forecasting and pricing optimization using the Corporacion Favorita dataset.',
    metric: '45%',
    metricLabel: 'MAE reduction over baseline',
    highlights: [
      'Forecasting pipeline across stores, product families, promotions, and temporal signals.',
      'Elasticity insights to reason about product-level pricing decisions.',
      'Revenue simulation engine for quantifying pricing tradeoffs before rollout.',
    ],
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Time Series', 'Unit Testing'],
    github: 'https://github.com/shreyashtm/retail-demand-pricing',
  },
  {
    title: 'Production Electricity Forecasting System',
    eyebrow: 'Siemens · Operational Analytics',
    status: 'Production',
    accent: 'var(--ember)',
    description:
      'ARIMA and LSTM forecasting models deployed to predict electricity consumption across operational systems at scale.',
    metric: '15%',
    metricLabel: 'Forecast accuracy improvement',
    highlights: [
      'End-to-end time-series analysis, data preparation, feature engineering, and validation.',
      'Forecast reliability and uncertainty communicated to non-technical stakeholders.',
      'Supported proactive capacity planning and replaced manual forecasting workflows.',
    ],
    tags: ['ARIMA', 'LSTM', 'Python', 'Capacity Planning', 'Production'],
    github: null,
  },
  {
    title: 'Privacy-Aware AI Finance Analyst',
    eyebrow: 'Personal Analytics · AI',
    status: 'In Progress',
    accent: 'var(--ice)',
    description:
      'Financial analytics system for transaction categorization, anomaly detection, spending patterns, and personalized insights.',
    metric: 'AI',
    metricLabel: 'Privacy-aware financial insight layer',
    highlights: [
      'Hybrid pipeline combining classical ML, PyTorch, NLP, and generative AI.',
      'Transaction categorization and spending pattern analysis.',
      'MLOps-ready design for explainable and private personal finance workflows.',
    ],
    tags: ['Python', 'PyTorch', 'NLP', 'MLOps', 'GenAI'],
    github: null,
  },
]

export default function Projects() {
  const handlePointerMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--card-x', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    card.style.setProperty('--card-y', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }

  return (
    <section id="projects" className="projects">
      <div className="container">
        <span className="section-label" data-reveal>Selected Work</span>
        <h2 className="section-title" data-reveal>
          Projects as <span className="serif gradient-text">case studies</span>
        </h2>

        <div className="projects__list">
          {PROJECTS.map((project, i) => (
            <article
              className="project-card card"
              key={project.title}
              style={{ '--project-accent': project.accent }}
              data-reveal
              data-reveal-delay={String(i * 0.1)}
              onPointerMove={handlePointerMove}
            >
              <div className="project-card__header">
                <span className="project-card__eyebrow">{project.eyebrow}</span>
                <span className="project-card__status">{project.status}</span>
              </div>

              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__desc">{project.description}</p>

              <div className="project-card__metric">
                <span>{project.metric}</span>
                <p>{project.metricLabel}</p>
              </div>

              <ul className="project-card__highlights">
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>

              <div className="project-card__footer">
                <div className="project-card__tags">
                  {project.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card__link"
                  >
                    View repository <FiArrowUpRight aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
