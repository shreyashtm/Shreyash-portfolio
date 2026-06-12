import { useEffect, useRef, useState } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('#hero')
  const [scrolled, setScrolled] = useState(false)
  const scrolledRef = useRef(false)

  useEffect(() => {
    let frameId

    const handleScroll = () => {
      if (frameId) return

      frameId = requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 24
        if (nextScrolled !== scrolledRef.current) {
          scrolledRef.current = nextScrolled
          setScrolled(nextScrolled)
        }
        frameId = null
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (frameId) cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const sections = ['#hero', ...NAV_LINKS.map((link) => link.href)]
      .map((href) => document.querySelector(href))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-34% 0px -58% 0px', threshold: [0.08, 0.2, 0.5] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a className="navbar__logo" href="#hero" onClick={closeMenu} aria-label="Go to hero">
          <span className="navbar__mark">ST</span>
          <span className="navbar__identity">
            <span>Shreyash</span>
            <span>Data Systems</span>
          </span>
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
          </ul>
        </div>

        <button
          className={`navbar__toggle ${menuOpen ? 'navbar__toggle--open' : ''}`}
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}
