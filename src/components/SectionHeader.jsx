import useScrollAnimation from "../hooks/useScrollAnimation";
import './SectionHeader.css'

export default function SectionHeader({ label, title, accent}) {
    const { ref, state } = useScrollAnimation()

      console.log('SectionHeader state:', state)
    return (
        <div className={`section-header section-header--${state}`} ref={ref}>
                <span className="section-label">{label}</span>
                <h2 className="section-title">
                    {title} {accent && <span>{accent}</span>}
                </h2>
                <div className="section-divider"/>
        </div>
    )
}