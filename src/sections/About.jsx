import React from 'react'
import SectionHeader from '../components/SectionHeader'
import useSlideAnimation from '../hooks/useSlideAnimation'
import './About.css'

function AnimatedParagraph({ children, delay }) {
  const { ref, visible } = useSlideAnimation(delay)
  return (
    <p
      ref={ref}
      className={visible ? 'slide-right-visible' : 'slide-right-hidden'}
    >
      {children}
    </p>
  )
}

function AnimatedLink({ href, children, delay }) {
  const { ref, visible } = useSlideAnimation(delay)
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`btn btn-outline ${visible ? 'slide-right-visible' : 'slide-right-hidden'}`}
    >
      {children}
    </a>
  )
}

function HighlightCard({ number, label, delay }) {
  const { ref, visible } = useSlideAnimation(delay)
  return (
    <div
      ref={ref}
      className={`about__highlight-card card ${visible ? 'slide-right-visible' : 'slide-right-hidden'}`}
    >
      <span className="about__highlight-number">{number}</span>
      <span className="about__highlight-label">{label}</span>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <SectionHeader
          label="About"
          title="Turning operational data into"
          accent="decisions that ship"
        />
        <div className="about__grid">
          <div className="about__text">
            <AnimatedParagraph delay={0}>
              I'm a Software Engineer with 4+ years of experience at the intersection
              of data engineering and analytics. At Siemens, I work directly with
              large-scale operational datasets — 100,000+ daily records from
              electricity consumption systems — building the pipelines, models,
              and dashboards that operations teams rely on every day.
            </AnimatedParagraph>
            <AnimatedParagraph delay={150}>
              My focus is applied: I've deployed production ARIMA and LSTM forecasting
              models that improved forecast accuracy by 15%, and built the Tableau
              dashboards that reduced manual reporting effort by 30% across the team.
              I care about the full stack of a data problem — from raw data quality
              to the final recommendation a stakeholder acts on.
            </AnimatedParagraph>
            <AnimatedParagraph delay={300}>
              Outside of production work I build portfolio projects that go deeper
              into the machine learning and statistical inference side — time-series
              demand forecasting, price elasticity estimation, and pricing strategy
              systems. I'm particularly interested in roles where analytics
              connects directly to business decisions.
            </AnimatedParagraph>
            <div className="about__links">
              <AnimatedLink href="https://github.com/shreyashtm" delay={450}>
                GitHub
              </AnimatedLink>
              <AnimatedLink href="https://www.linkedin.com/in/shreyash-tembhurne/" delay={600}>
                LinkedIn
              </AnimatedLink>
            </div>
            </div>

          <div className="about__highlights">
            {[
              { number: '4+',    label: 'Years in production data systems' },
              { number: '100k+', label: 'Daily records processed at Siemens' },
              { number: '6–8',   label: 'Production Tableau dashboards deployed' },
              { number: '2',     label: 'Forecasting models in live production' },
            ].map(({ number, label }, i) => (
              <HighlightCard key={label} number={number} label={label} delay={i * 150} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
