import './RetroBackground.css'

const gridPoints = Array.from({ length: 28 }, (_, index) => ({
  left: `${8 + (index % 7) * 14}%`,
  top: `${14 + Math.floor(index / 7) * 18}%`,
  delay: `${index * 0.04}s`,
}))

const streamLines = [
  { top: '18%', width: '38%', delay: '-1.2s' },
  { top: '38%', width: '50%', delay: '-3.6s' },
  { top: '63%', width: '42%', delay: '-2.4s' },
  { top: '78%', width: '34%', delay: '-4.8s' },
]

export default function RetroBackground() {
  return (
    <div className="data-bg" aria-hidden="true">
      <div className="data-bg__grid" />
      <div className="data-bg__axis data-bg__axis--x" />
      <div className="data-bg__axis data-bg__axis--y" />

      <div className="data-bg__points">
        {gridPoints.map((point, index) => (
          <span
            key={index}
            style={{
              '--point-left': point.left,
              '--point-top': point.top,
              '--point-delay': point.delay,
            }}
          />
        ))}
      </div>

      <div className="data-bg__streams">
        {streamLines.map((line) => (
          <span
            key={line.top}
            style={{
              '--stream-top': line.top,
              '--stream-width': line.width,
              '--stream-delay': line.delay,
            }}
          />
        ))}
      </div>

      <div className="data-bg__forecast">
        <svg viewBox="0 0 680 240" role="presentation" focusable="false">
          <path
            className="data-bg__forecast-base"
            d="M4 188 C88 176 132 152 196 162 C268 174 298 124 360 132 C430 142 452 88 520 96 C586 104 616 62 676 52"
          />
          <path
            className="data-bg__forecast-line"
            d="M4 188 C88 176 132 152 196 162 C268 174 298 124 360 132 C430 142 452 88 520 96 C586 104 616 62 676 52"
          />
        </svg>
      </div>
    </div>
  )
}
