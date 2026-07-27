import { FiArrowUpRight } from 'react-icons/fi'
import './Contact.css'

const links = [
  {
    href: 'mailto:shreyash13.tm@gmail.com',
    label: 'Email',
    value: 'shreyash13.tm@gmail.com',
  },
  {
    href: 'https://www.linkedin.com/in/shreyash-tembhurne/',
    label: 'LinkedIn',
    value: 'shreyash-tembhurne',
  },
  {
    href: 'https://github.com/shreyashtm',
    label: 'GitHub',
    value: 'shreyashtm',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <span className="section-label" data-reveal>Contact</span>
        <h2 className="contact__title" data-reveal>
          Let's build something{' '}
          <span className="serif gradient-text">together</span>
        </h2>

        <p className="contact__desc" data-reveal>
          I am open to full-time roles and selected freelance work across data
          engineering, analytics engineering, forecasting, and BI systems.
        </p>

        <div className="contact__links" data-reveal>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="contact__link"
            >
              <div>
                <span className="contact__link-label">{link.label}</span>
                <span className="contact__link-value">{link.value}</span>
              </div>
              <FiArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </div>

        <footer className="contact__footer">
          <span>Shreyash Tembhurne</span>
          <span>{new Date().getFullYear()}</span>
        </footer>
      </div>
    </section>
  )
}
