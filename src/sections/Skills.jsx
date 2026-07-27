import { SKILL_GROUPS } from '../data/skills'
import './Skills.css'

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <span className="section-label" data-reveal>Skills</span>
        <h2 className="section-title" data-reveal>
          Tools for building <span className="serif gradient-text">decision</span> systems
        </h2>

        <div className="skills__grid">
          {SKILL_GROUPS.map((group, i) => (
            <article
              className="skills__card card"
              key={group.category}
              data-reveal
              data-reveal-delay={String(i * 0.06)}
            >
              <span className="skills__index">{String(i + 1).padStart(2, '0')}</span>
              <h3>{group.category}</h3>
              <p>{group.summary}</p>
              <div className="skills__tags">
                {group.skills.map((s) => (
                  <span className="tag" key={s}>{s}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
