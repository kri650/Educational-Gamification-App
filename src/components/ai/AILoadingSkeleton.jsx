import './ai.css'

function AILoadingSkeleton() {
  return (
    <div className="ai-skeleton" aria-label="Loading AI suggestions">
      <div className="skeleton-line lg" />
      <div className="skeleton-line" />
      <div className="skeleton-line" />
      <div className="skeleton-line sm" />
    </div>
  )
}

export default AILoadingSkeleton
