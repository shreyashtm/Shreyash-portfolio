import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'About',      href: '#about',      index: '01' },
  { label: 'Skills',     href: '#skills',     index: '02' },
  { label: 'Projects',   href: '#projects',   index: '03' },
  { label: 'Experience', href: '#experience', index: '04' },
  { label: 'Contact',    href: '#contact',    index: '05' },
];

export default function Navbar({ scrollY }) {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [active, setActive]         = useState('');
  const [pillStyle, setPillStyle]   = useState({});
  const linksRef                    = useRef({});

  const heroHeight  = typeof window !== 'undefined' ? window.innerHeight : 800;
  const progress    = Math.min(scrollY / (heroHeight * 0.25), 1);
  const logoOpacity = progress >= 1 ? 1 : 0;
  const scrolled    = scrollY > 40;

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive('#' + entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Move the pill to sit under the active link
  useEffect(() => {
    const el = linksRef.current[active];
    if (el) {
      const { offsetLeft, offsetWidth } = el;
      setPillStyle({ left: offsetLeft, width: offsetWidth, opacity: 1 });
    }
  }, [active]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">

        {/* Logo */}
        <a
          href="#hero"
          className="navbar__logo"
          style={{ opacity: logoOpacity, transition: 'opacity 0.4s ease' }}
        >
          <span className="navbar__logo-bracket">[</span>
          ST
          <span className="navbar__logo-bracket">]</span>
        </a>

        {/* Desktop links */}
        <div className="navbar__links-wrap">
          <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
            {NAV_LINKS.map(({ label, href, index }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`navbar__link ${active === href ? 'navbar__link--active' : ''}`}
                  ref={el => { linksRef.current[href] = el; }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="navbar__link-index">{index}</span>
                  <span className="navbar__link-label">{label}</span>
                </a>
              </li>
            ))}
          </ul>
          {/* Sliding pill indicator — desktop only */}
          <span className="navbar__pill" style={pillStyle} aria-hidden="true" />
        </div>

        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}