import './SectionHeader.css'

export default function SectionHeader({ label, title, accent }) {
  return (
    <div className="section-header" data-reveal>
      <span className="section-label">{label}</span>
      <h2 className="section-title">
        {title} {accent && <span>{accent}</span>}
      </h2>
      <div className="section-divider" />
    </div>
  )
}
