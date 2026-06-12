import SectionHeader from '../components/SectionHeader'
import './Experience.css'

const EXPERIENCE = [
  {
    company: 'Siemens Technology and Services',
    role: 'Software Engineer',
    period: 'May 2022 - Present',
    current: true,
    summary:
      'Building production analytics systems for electricity consumption operations, from data preparation and forecasting to dashboards used by business teams.',
    impact: ['100k+ daily records', '15% forecast accuracy gain', '30% reporting effort reduced'],
    bullets: [
      'Designed and deployed 6-8 production Tableau dashboards for operational KPIs, consumption trends, and anomaly monitoring.',
      'Developed ARIMA and LSTM forecasting models for electricity consumption, including rolling-window validation and stakeholder-facing reliability communication.',
      'Established data quality checks and validation protocols before downstream analytics and reporting workflows.',
    ],
  },
  {
    company: 'Zappkode Solutions',
    role: 'Python Developer',
    period: 'Feb 2021 - Jun 2021',
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
  return (
    <section id="experience" className="experience">
      <div className="container">
        <SectionHeader label="Experience" title="Production work with" accent="measurable outcomes" />

        <div className="experience__list">
          {EXPERIENCE.map((job, index) => (
            <article
              className="experience__item"
              key={job.company}
              data-reveal
              data-reveal-delay={String(index * 0.08)}
            >
              <div className="experience__meta">
                <span>{job.period}</span>
                {job.current && <span className="tag">Current</span>}
              </div>

              <div className="experience__body card">
                <div className="experience__header">
                  <div>
                    <h3>{job.role}</h3>
                    <p>{job.company}</p>
                  </div>
                  <div className="experience__impact">
                    {job.impact.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>

                <p className="experience__summary">{job.summary}</p>

                <ul className="experience__bullets">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
