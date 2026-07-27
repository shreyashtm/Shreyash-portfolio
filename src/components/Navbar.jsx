import { useEffect, useRef, useState } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ onResumeOpen, bootComplete }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [logoVisible, setLogoVisible] = useState(false)
  const initialized = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      if (window.scrollY < 100) setActive('')

      const landing = document.querySelector('#landing')
      if (landing) {
        setLogoVisible(window.scrollY > landing.offsetHeight * 0.6)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    initialized.current = bootComplete
  }, [bootComplete])

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-20% 0px -40% 0px', threshold: [0.05, 0.15, 0.4] }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a
          className={`navbar__logo ${logoVisible ? 'navbar__logo--visible' : ''}`}
          href="#landing"
          onClick={closeMenu}
        >
          ST.
        </a>

        <div className={`navbar__panel ${menuOpen ? 'navbar__panel--open' : ''}`}>
          <ul className="navbar__links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`navbar__link ${active === link.href ? 'navbar__link--active' : ''}`}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
            {/* <li>
              <button
                type="button"
                className="navbar__link"
                onClick={() => {
                  closeMenu()
                  onResumeOpen?.()
                }}
              >
                Resume
              </button>
            </li> */}
          </ul>
        </div>

        <button
          className={`navbar__toggle ${menuOpen ? 'navbar__toggle--open' : ''}`}
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}
