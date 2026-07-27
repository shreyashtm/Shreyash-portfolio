import { FiArrowUpRight } from 'react-icons/fi'
import './About.css'

const metrics = [
  { value: '4+', label: 'Years at Siemens Smart Infrastructure' },
  { value: '8', label: 'Distinct analytical scopes owned end-to-end' },
  { value: '100k+', label: 'Daily BMS sensor records processed' },
  { value: '2', label: 'Forecasting models shipped to production' },
]

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <span className="section-label" data-reveal>About</span>
        <h2 className="about__statement" data-reveal>
          I build the analytics layer between operations
          and <span className="serif gradient-text">decisions</span>
        </h2>

        <div className="about__body" data-reveal>
          <p>
            Over four years at Siemens Smart Infrastructure, I've built the
            data systems that make building-automation analytics reliable — from
            unifying multi-source BMS sensor data into production pipelines, to
            forecasting models and dashboards that teams rely on daily. Over
            time, I became the informal resolution point across data quality,
            forecast interpretation, and metric definitions — not because of a
            title, but because I'd built all three layers and knew where each
            could break.
          </p>
          <p>
            My work spans eight distinct analytical scopes — energy load
            forecasting, predictive maintenance, anomaly detection, data
            unification, occupancy analytics, device optimization, strategic
            dashboards, and dual-audience BI — each a widening of what I owned,
            from writing reliable code to deciding what the organisation pays
            attention to.
          </p>
          <p>
            I'm looking for roles where that end-to-end ownership — pipeline to
            dashboard to stakeholder decision — can operate at a larger scale.
          </p>
        </div>

        <div className="about__metrics">
          {metrics.map((m, i) => (
            <div
              className="about__metric"
              key={m.label}
              data-reveal
              data-reveal-delay={String(i * 0.06)}
            >
              <span className="about__metric-value">{m.value}</span>
              <p>{m.label}</p>
            </div>
          ))}
        </div>

        <div className="about__links" data-reveal>
          <a
            href="https://github.com/shreyashtm"
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            GitHub <FiArrowUpRight aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/shreyash-tembhurne/"
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            LinkedIn <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
