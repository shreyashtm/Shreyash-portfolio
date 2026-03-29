import useCardAnimation from '../hooks/useCardAnimation'
import SectionHeader from '../components/SectionHeader'
import './Experience.css'

const EXPERIENCE = [
  {
    company: 'Siemens Technology and Services',
    role: 'Software Engineer',
    period: 'May 2022 – Present',
    current: true,
    groups: [
      {
        label: 'Analytics & Business Intelligence',
        bullets: [
          'Designed and deployed 6–8 production Tableau dashboards monitoring critical operational KPIs, consumption trends, and system anomalies across 3–5 operational data sources.',
          'Reduced manual reporting effort by 30% through automated dashboards and standardised KPI definitions — operations teams now respond to issues in hours instead of days.',
          'Conducted EDA on electricity consumption datasets (100k+ daily records) to identify patterns, anomalies, and outliers supporting resource optimisation initiatives.',
        ],
      },
      {
        label: 'Demand Forecasting & Capacity Planning',
        bullets: [
          'Developed and deployed production ARIMA and LSTM models to forecast electricity consumption at scale, improving forecast accuracy by 15% (MAPE).',
          'Performed end-to-end time-series analysis: data preparation, feature engineering, rolling-window validation, and hyperparameter tuning.',
          'Communicated forecast reliability, uncertainty bounds, and confidence intervals to non-technical stakeholders.',
        ],
      },
      {
        label: 'Data Quality & Reliability',
        bullets: [
          'Established data quality checks and validation protocols ensuring accuracy before downstream analytics.',
          'Performed end-to-end data preparation on large-scale datasets — handling missing values, outliers, and inconsistencies.',
        ],
      },
    ],
  },
  {
    company: 'Zappkode Solutions',
    role: 'Python Developer',
    period: 'Feb 2021 – June 2021',
    current: false,
    groups: [
      {
        label: null,
        bullets: [
          'Built real-time analytics modules using Python (Pandas, NumPy) for Project Greenbill — a retail billing platform serving grocery stores, petrol pumps, and retail chains.',
          'Designed data processing pipelines to clean, validate, and transform transaction data for downstream reporting.',
          'Enhanced Tableau dashboards for financial and operational metrics, improving data clarity and supporting internal decision-making.',
          'Mentored 3 interns on Python scripting, data processing best practices, and analytical problem-solving.',
        ],
      },
    ],
  },
]

function ExperienceCard({ job, index }) {
  const { ref, visible } = useCardAnimation(index * 150)

  return (
    <div className="experience__item">
      <div className="experience__marker">
        <div className={`experience__dot ${job.current ? 'experience__dot--active' : ''}`} />
        <div className="experience__line" />
      </div>

      <div
        ref={ref}
        className={`experience__content card ${visible ? 'card-visible' : 'card-hidden'}`}
      >
        <div className="experience__header">
          <div>
            <h3 className="experience__role">{job.role}</h3>
            <span className="experience__company">{job.company}</span>
          </div>
          <div className="experience__period-wrap">
            <span className="experience__period">{job.period}</span>
            {job.current && <span className="tag">Current</span>}
          </div>
        </div>

        {job.groups.map((group, gi) => (
          <div key={gi} className="experience__group">
            {group.label && (
              <span className="experience__group-label">{group.label}</span>
            )}
            <ul className="experience__bullets">
              {group.bullets.map((b, bi) => (
                <li key={bi}>
                  <span className="experience__bullet">▸</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="container">
        <SectionHeader
          label="Experience"
          title="Where I've"
          accent="worked"
        />
        <div className="experience__timeline">
          {EXPERIENCE.map((job, i) => (
            <ExperienceCard key={job.company} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}