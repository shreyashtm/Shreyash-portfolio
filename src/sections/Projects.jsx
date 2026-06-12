import { FiArrowUpRight } from 'react-icons/fi'
import SectionHeader from '../components/SectionHeader'
import './Projects.css'

const PROJECTS = [
  {
    title: 'Retail Demand Forecasting & Dynamic Pricing Engine',
    eyebrow: 'Forecasting · Pricing Strategy',
    status: 'Completed',
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
    visual: 'forecast',
  },
  {
    title: 'Production Electricity Forecasting System',
    eyebrow: 'Siemens · Operational Analytics',
    status: 'Production',
    description:
      'ARIMA and LSTM forecasting models deployed to predict electricity consumption across operational systems at scale.',
    metric: '15%',
    metricLabel: 'forecast accuracy improvement',
    highlights: [
      'End-to-end time-series analysis, data preparation, feature engineering, and validation.',
      'Forecast reliability and uncertainty communicated to non-technical stakeholders.',
      'Supported proactive capacity planning and replaced manual forecasting workflows.',
    ],
    tags: ['ARIMA', 'LSTM', 'Python', 'Capacity Planning', 'Production'],
    github: null,
    visual: 'operations',
  },
  {
    title: 'Privacy-Aware AI Finance Analyst',
    eyebrow: 'Personal Analytics · AI',
    status: 'In Progress',
    description:
      'Financial analytics system for transaction categorization, anomaly detection, spending patterns, and personalized insights.',
    metric: 'AI',
    metricLabel: 'privacy-aware financial insight layer',
    highlights: [
      'Hybrid pipeline combining classical ML, PyTorch, NLP, and generative AI.',
      'Transaction categorization and spending pattern analysis.',
      'MLOps-ready design for explainable and private personal finance workflows.',
    ],
    tags: ['Python', 'PyTorch', 'NLP', 'MLOps', 'GenAI'],
    github: null,
    visual: 'finance',
  },
]

function ForecastVisual() {
  return (
    <div className="project-visual project-visual--forecast" aria-hidden="true">
      <div className="project-visual__top">
        <span>Demand signal</span>
        <strong>0.82</strong>
      </div>
      <svg viewBox="0 0 520 280">
        <path className="project-visual__gridline" d="M0 70 H520 M0 140 H520 M0 210 H520" />
        <path className="project-visual__area" d="M0 210 C60 190 92 155 142 166 C208 182 240 96 304 112 C378 130 396 76 462 84 C498 88 510 72 520 66 V280 H0 Z" />
        <path className="project-visual__line" d="M0 210 C60 190 92 155 142 166 C208 182 240 96 304 112 C378 130 396 76 462 84 C498 88 510 72 520 66" />
        <path className="project-visual__line project-visual__line--muted" d="M0 230 C74 212 106 184 164 188 C232 192 252 154 312 158 C380 164 420 132 520 122" />
      </svg>
      <div className="project-visual__legend">
        <span>forecast</span>
        <span>baseline</span>
      </div>
    </div>
  )
}

function OperationsVisual() {
  return (
    <div className="project-visual project-visual--operations" aria-hidden="true">
      <div className="project-visual__top">
        <span>Consumption monitor</span>
        <strong>Live</strong>
      </div>
      <div className="operations-grid">
        <div>
          <span>Load</span>
          <strong>84%</strong>
        </div>
        <div>
          <span>MAPE</span>
          <strong>6.8</strong>
        </div>
        <div>
          <span>Anomalies</span>
          <strong>03</strong>
        </div>
        <div>
          <span>Sources</span>
          <strong>05</strong>
        </div>
      </div>
      <div className="operations-wave">
        {Array.from({ length: 18 }, (_, index) => (
          <span key={index} style={{ height: `${24 + ((index * 17) % 66)}%` }} />
        ))}
      </div>
    </div>
  )
}

function FinanceVisual() {
  return (
    <div className="project-visual project-visual--finance" aria-hidden="true">
      <div className="project-visual__top">
        <span>Insight engine</span>
        <strong>Private</strong>
      </div>
      <div className="finance-list">
        <span>Recurring spend detected</span>
        <span>Anomaly score 0.71</span>
        <span>Category confidence 92%</span>
      </div>
      <div className="finance-rings">
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

function ProjectVisual({ type }) {
  if (type === 'operations') return <OperationsVisual />
  if (type === 'finance') return <FinanceVisual />
  return <ForecastVisual />
}

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <SectionHeader label="Projects" title="Selected work as" accent="case studies" />

        <div className="projects__list">
          {PROJECTS.map((project, index) => (
            <article
              className="project-card card"
              key={project.title}
              data-reveal
              data-reveal-delay={String(index * 0.08)}
            >
              <div className="project-card__visual-wrap">
                <ProjectVisual type={project.visual} />
              </div>

              <div className="project-card__content">
                <div className="project-card__meta">
                  <span>{project.eyebrow}</span>
                  <span className={project.status === 'Completed' ? 'tag' : 'tag tag-amber'}>
                    {project.status}
                  </span>
                </div>

                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="project-card__metric">
                  <span>{project.metric}</span>
                  <p>{project.metricLabel}</p>
                </div>

                <ul className="project-card__highlights">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>

                <div className="project-card__footer">
                  <div className="project-card__tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="project-card__link">
                      View repository
                      <FiArrowUpRight aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
