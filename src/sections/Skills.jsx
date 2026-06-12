import SectionHeader from '../components/SectionHeader'
import './Skills.css'

const SKILL_GROUPS = [
  {
    category: 'Data Engineering',
    summary: 'Preparing reliable analytical datasets and production-ready pipelines.',
    skills: ['Python', 'SQL', 'Pandas', 'NumPy', 'PostgreSQL', 'MySQL', 'MongoDB', 'R'],
  },
  {
    category: 'Forecasting & ML',
    summary: 'Building, validating, and communicating models for operational decisions.',
    skills: ['Scikit-learn', 'ARIMA', 'LSTM', 'Regression', 'Classification', 'Feature Engineering', 'Model Evaluation'],
  },
  {
    category: 'BI & Decision Systems',
    summary: 'Turning metrics into dashboards and workflows stakeholders can trust.',
    skills: ['Tableau', 'Power BI', 'KPI Reporting', 'Dashboard Design', 'EDA', 'Data Storytelling'],
  },
  {
    category: 'Reliability',
    summary: 'Keeping analytical outputs explainable, documented, and stable.',
    skills: ['Data Quality', 'Validation Protocols', 'Data Integrity', 'SLA Awareness', 'Documentation'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <SectionHeader label="Skills" title="Tools for building" accent="decision systems" />

        <div className="skills__grid">
          {SKILL_GROUPS.map((group, index) => (
            <article
              className="skills__group card"
              key={group.category}
              data-reveal
              data-reveal-delay={String(index * 0.06)}
            >
              <span className="skills__index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{group.category}</h3>
              <p>{group.summary}</p>
              <div className="skills__tags">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
