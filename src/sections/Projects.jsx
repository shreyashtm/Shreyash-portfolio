import useCardAnimation from '../hooks/useCardAnimation'
import SectionHeader from '../components/SectionHeader'
import './Projects.css'

const PROJECTS = [
  {
    title: 'Retail Demand Forecasting & Dynamic Pricing Engine',
    status: 'completed',
    description:
      'Production-ready ML pipeline for retail demand forecasting and pricing optimization, built on the Corporación Favorita dataset (125M+ transactions, 4,000+ SKUs, 50+ stores across Ecuador).',
    highlights: [
      '45% MAE reduction over mean baseline, enabling accurate demand predictions',
      'Product-level elasticity insights guiding promotional strategy',
      'Revenue simulation engine quantifying pricing decision impacts'
    ],
    tags: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Time Series Analysis', 'Statistical Modeling', 'Unit Testing'],
    github: 'https://github.com/shreyashtm/retail-demand-pricing',
  },
  {
    title: 'Production Electricity Forecasting System',
    status: 'production',
    description:
      'Deployed ARIMA and LSTM forecasting models at Siemens to predict electricity consumption across operational systems at scale. Replaced manual forecasting processes and directly enabled proactive capacity planning.',
    highlights: [
      '15% improvement in forecast accuracy (MAPE)',
      'ARIMA + LSTM models in live production',
      'End-to-end: data prep → feature engineering → rolling-window validation',
      'Uncertainty bounds communicated to non-technical stakeholders',
    ],
    tags: ['ARIMA', 'LSTM', 'Python', 'Time Series', 'Production', 'Capacity Planning'],
    github: null,
  },
  {
    title: 'Privacy-Aware AI finance Analyst',
    status: 'in-progress',
    description:
      'Production-grade financial analytics system that processes personal transaction data using classical ML, deep learning, and generative AI to uncover spending patterns, detect anomalies, and generate personalized insights while maintaining privacy.',
    highlights: [
      'Transaction categorization and spending pattern analysis',
      'Hybrid pipeline using classical ML, PyTorch, NLP, and GenAI',
      'Privacy-aware design with MLOps-ready workflows',
    ],
    tags: ['Python', 'Pandas', 'PyTorch', 'NLP', 'MLOps', 'GenAI'],
    github: null,
  },
]

const STATUS_CONFIG = {
  completed:     { label: 'Completed',   className: 'tag' },
  production:    { label: 'Production',  className: 'tag tag-amber' },
  'in-progress': { label: 'In Progress', className: 'tag tag-amber' },
}

function ProjectCard({ project, index }) {
  const { ref, visible } = useCardAnimation(index * 150)
  const status = STATUS_CONFIG[project.status]

  return (
    <div
      ref={ref}
      className={`project-card card ${visible ? 'card-visible' : 'card-hidden'}`}
    >
      <div className="project-card__header">
        <div className="project-card__meta">
          <span className={status.className}>{status.label}</span>
          <span className="project-card__number">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.description}</p>
      </div>

      <ul className="project-card__highlights">
        {project.highlights.map(h => (
          <li key={h}>
            <span className="project-card__bullet">▸</span>
            {h}
          </li>
        ))}
      </ul>

      <div className="project-card__footer">
        <div className="project-card__tags">
          {project.tags.map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline project-card__btn"
          >
            View on GitHub →
          </a>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <SectionHeader
          label="Projects"
          title="Things I've"
          accent="built"
        />
        <div className="projects__list">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}