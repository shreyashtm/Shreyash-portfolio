import useCardAnimation from '../hooks/useCardAnimation'
import useSlideAnimation from '../hooks/useSlideAnimation'
import SectionHeader from '../components/SectionHeader'
import './Contact.css'

function AnimatedContactLink({ href, icon, label, value, index }) {
  const { ref, visible } = useCardAnimation(index * 150)
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`contact__link card ${visible ? 'card-visible' : 'card-hidden'}`}
    >
      <span className="contact__link-icon">{icon}</span>
      <div>
        <span className="contact__link-label">{label}</span>
        <span className="contact__link-value">{value}</span>
      </div>
      <span className="contact__link-arrow">→</span>
    </a>
  )
}

function AnimatedText({ children, delay }) {
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

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <SectionHeader
          label="Contact"
          title="Let's work"
          accent="together"
        />

        <div className="contact__inner">
          <div className="contact__text">
            <AnimatedText delay={0}>
              I'm open to full-time roles and freelance engagements in data
              engineering, analytics, and forecasting. If you're working on
              something interesting or want to talk through a data problem,
              reach out.
            </AnimatedText>
          </div>

          <div className="contact__links">
            <AnimatedContactLink
              href="mailto:shreyash13.tm@gmail.com"
              icon="✉"
              label="Email"
              value="shreyash13.tm@gmail.com"
              index={0}
            />
            <AnimatedContactLink
              href="https://www.linkedin.com/in/shreyash-tembhurne/"
              icon="in"
              label="LinkedIn"
              value="shreyash tembhurne"
              index={1}
            />
            <AnimatedContactLink
              href="https://github.com/shreyashtm"
              icon="⌥"
              label="GitHub"
              value="shreyashtm"
              index={2}
            />
          </div>
        </div>
      </div>

      <div className="contact__footer">
        <span>Shreyash Tembhurne · {new Date().getFullYear()}</span>
      </div>
    </section>
  )
}