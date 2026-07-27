import './Education.css'

export default function Education() {
  return (
    <section id="education" className="education">
      <div className="container">
        <span className="section-label" data-reveal>Education</span>
        <h2 className="section-title" data-reveal>
          The <span className="serif gradient-text">foundation</span>
        </h2>

        <div className="education__card card" data-reveal>
          <div className="education__inner">
            <div className="education__degree">
              <h3>B.Tech</h3>
              <span className="education__field">Computer Science</span>
            </div>
            <div className="education__divider" />
            <div className="education__details">
              <p className="education__school">SGGSIE&T Nanded, Maharashtra</p>
              <p className="education__note">
                Foundation for a career at the intersection of software
                engineering and applied data science.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
