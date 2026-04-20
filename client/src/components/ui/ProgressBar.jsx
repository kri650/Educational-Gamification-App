import './ProgressBar.css'

export default function ProgressBar({ value = 0, color, showLabel = false }) {
  const clamp = Math.min(100, Math.max(0, value))
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${clamp}%`, background: color || 'var(--primary)' }} />
      {showLabel && <span className="progress-label">{clamp}%</span>}
    </div>
  )
}
