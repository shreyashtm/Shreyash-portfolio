import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import SectionHeader from '../components/SectionHeader'
import './Contact.css'

const links = [
  {
    href: 'mailto:shreyash13.tm@gmail.com',
    label: 'Email',
    value: 'shreyash13.tm@gmail.com',
    icon: FiMail,
  },
  {
    href: 'https://www.linkedin.com/in/shreyash-tembhurne/',
    label: 'LinkedIn',
    value: 'shreyash-tembhurne',
    icon: FiLinkedin,
  },
  {
    href: 'https://github.com/shreyashtm',
    label: 'GitHub',
    value: 'shreyashtm',
    icon: FiGithub,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <SectionHeader label="Contact" title="Let’s build something" accent="useful" />

        <div className="contact__panel card" data-reveal>
          <div className="contact__copy">
            <p>
              I am open to full-time roles and selected freelance work across data
              engineering, analytics engineering, forecasting, and BI systems.
            </p>
            <a href="mailto:shreyash13.tm@gmail.com" className="contact__primary">
              Start a conversation
              <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>

          <div className="contact__links">
            {links.map(({ href, label, value, icon: Icon }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer" className="contact__link">
                <span className="contact__icon">
                  <Icon aria-hidden="true" />
                </span>
                <span>
                  <strong>{label}</strong>
                  <em>{value}</em>
                </span>
                <FiArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <footer className="contact__footer">
          <span>Shreyash Tembhurne</span>
          <span>{new Date().getFullYear()}</span>
        </footer>
      </div>
    </section>
  )
}
