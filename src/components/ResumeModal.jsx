import { useEffect, useState } from 'react'
import './ResumeModal.css'

export default function ResumeModal({ isOpen, onClose }) {
  const [visible, setVisible] = useState(false)

  // Delay applying visible class by one frame so CSS transition fires
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
    } else {
      setVisible(false)
    // Keep mounted until exit transition finishes
    const timer = setTimeout(() => setMounted(false), 600)
    return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <div
      className={`modal-overlay ${visible ? 'modal-overlay--open' : ''}`}
      onClick={onClose}
    >
      <div
        className={`modal ${visible ? 'modal--open' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal__header">
          <span className="modal__title">Shreyash Tembhurne — Resume</span>
          <div className="modal__actions">
            <a
              href="/ShreyashTembhurneResume.pdf"
              download
              className="btn btn-primary modal__download"
            >
              Download ↓
            </a>
            <button className="modal__close" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="modal__body">
          <object
            data="/ShreyashTembhurneResume.pdf"
            type="application/pdf"
            className="modal__pdf"
          >
            <p style={{ padding: '2rem', color: 'var(--text-secondary)' }}>
              PDF cannot be displayed in this browser.{' '}
              <a href="/ShreyashTembhurneResume.pdf" download className="btn btn-primary">
                Download instead
              </a>
            </p>
          </object>
        </div>
      </div>
    </div>
  )
}