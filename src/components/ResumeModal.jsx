import { useEffect, useState } from 'react'
import { FiDownload, FiX } from 'react-icons/fi'
import './ResumeModal.css'

export default function ResumeModal({ isOpen, onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true))
      })
    } else {
      setVisible(false)
    }
  }, [isOpen])

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
      aria-hidden={!isOpen}
    >
      <div
        className={`modal ${visible ? 'modal--open' : ''}`}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Resume preview"
      >
        <div className="modal__header">
          <span className="modal__title">Shreyash Tembhurne Resume</span>
          <div className="modal__actions">
            <a
              href="/ShreyashTembhurneResume.pdf"
              download
              className="btn btn-primary modal__download"
            >
              Download
              <FiDownload aria-hidden="true" />
            </a>
            <button className="modal__close" onClick={onClose} aria-label="Close resume preview">
              <FiX aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="modal__body">
            {isOpen && (
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
            )}
        </div>
      </div>
    </div>
  )
}
