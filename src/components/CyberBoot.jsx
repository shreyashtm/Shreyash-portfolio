import './CyberBoot.css'

export default function CyberBoot({ active }) {
  return (
    <div className={`cyber-boot ${active ? 'cyber-boot--active' : 'cyber-boot--exit'}`} aria-hidden="true">
      <div className="cyber-boot__frame">
        <span className="cyber-boot__kicker">ST//PORTFOLIO_OS</span>
        <strong>Signal acquired</strong>
        <div className="cyber-boot__bar">
          <span />
        </div>
        <em>forecast systems / production analytics / neon mode</em>
      </div>
    </div>
  )
}
