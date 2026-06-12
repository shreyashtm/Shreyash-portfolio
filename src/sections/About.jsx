import { FiArrowUpRight } from 'react-icons/fi'
import SectionHeader from '../components/SectionHeader'
import './About.css'

const highlights = [
  { number: '4+', label: 'Years working across data engineering and analytics' },
  { number: '100k+', label: 'Daily records processed from operational systems' },
  { number: '6-8', label: 'Production Tableau dashboards deployed' },
  { number: '2', label: 'Forecasting models shipped into production' },
]

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <SectionHeader
          label="About"
          title="I build the analytics layer between"
          accent="operations and decisions"
        />

        <div className="about__grid">
          <div className="about__copy" data-reveal>
            <p>
              I am a Software Engineer with a focus on production data systems,
              forecasting, and business intelligence. At Siemens, I work with
              large operational datasets from electricity consumption systems,
              building the pipelines, models, and dashboards teams rely on every
              day.
            </p>
            <p>
              My work sits close to the business problem: define the metric,
              prepare the data, validate the model, build the dashboard, and
              communicate the tradeoffs clearly enough for a stakeholder to act.
            </p>
            <p>
              I am especially interested in data roles where engineering quality
              and analytical judgment meet: demand forecasting, pricing systems,
              data product development, and decision intelligence.
            </p>

            <div className="about__links">
              <a href="https://github.com/shreyashtm" target="_blank" rel="noreferrer" className="btn btn-outline">
                GitHub
                <FiArrowUpRight aria-hidden="true" />
              </a>
              <a href="https://www.linkedin.com/in/shreyash-tembhurne/" target="_blank" rel="noreferrer" className="btn btn-outline">
                LinkedIn
                <FiArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="about__panel card" data-reveal data-reveal-delay="0.1">
            <span className="about__panel-label">Current focus</span>
            <h3>Data products that earn trust in production.</h3>
            <p>
              Reliable inputs, transparent modeling, dashboard ergonomics, and
              metrics that do not collapse under scrutiny.
            </p>
            <div className="about__focus-list">
              <span>Forecasting</span>
              <span>BI systems</span>
              <span>Data quality</span>
              <span>Stakeholder analytics</span>
            </div>
          </div>
        </div>

        <div className="about__highlights">
          {highlights.map((highlight, index) => (
            <div
              className="about__highlight"
              key={highlight.label}
              data-reveal
              data-reveal-delay={String(index * 0.05)}
            >
              <span>{highlight.number}</span>
              <p>{highlight.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
