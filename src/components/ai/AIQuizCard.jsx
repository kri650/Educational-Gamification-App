import { useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import './ai.css'

function AIQuizCard({ suggestion, onStart }) {
  const [visible, setVisible] = useState(true)

  if (!suggestion) {
    return null
  }

  const confidenceClass = `confidence-${suggestion.confidence}`

  return (
    <AnimatePresence>
      {visible ? (
        <Motion.article
          className="ai-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: 64 }}
          transition={{ duration: 0.3 }}
          layout
        >
          <span className="ai-badge">AI Recommended</span>
          <span className="subject-pill">{suggestion.subject}</span>
          <h2>{suggestion.topic}</h2>
          <p className="ai-reason">{suggestion.reason}</p>
          <span className={`confidence-pill ${confidenceClass}`}>
            {suggestion.confidence}
          </span>
          <div className="card-actions">
            <button type="button" onClick={onStart}>Start Quiz</button>
            <button type="button" className="ghost" onClick={() => setVisible(false)}>
              Dismiss
            </button>
          </div>
        </Motion.article>
      ) : null}
    </AnimatePresence>
  )
}

export default AIQuizCard
