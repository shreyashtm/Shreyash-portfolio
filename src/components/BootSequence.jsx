import './BootSequence.css'

export default function BootSequence() {
  return (
    <div className="boot" aria-hidden="true">
      <div className="boot__progress">
        <div className="boot__bar-track">
          <div className="boot__bar-fill" />
        </div>
        <span className="boot__counter">000</span>
      </div>
    </div>
  )
}
