import './Landing.css'

export default function Landing() {
  return (
    <section id="landing" className="landing">
      <div className="container landing__inner">
        <div className="landing__content">
          <h1 className="landing__name">
            <span className="landing__first">Shreyash</span>
            <span className="landing__last">Tembhurne</span>
          </h1>
          <div className="landing__meta">
            <span>Data Analyst</span>
            <span className="landing__meta-sep">·</span>
            <span>Data Scientist</span>
            <span className="landing__meta-sep">·</span>
            <span>4 years, Siemens Smart Infrastructure</span>
          </div>
          <p className="landing__tagline">
            Pipelines, models, dashboards — from raw data to leadership decisions.
          </p>
        </div>
      </div>
      <div className="landing__scroll">
        <span className="landing__scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
