import { useMemo } from 'react'
import { useQuiz } from '../../contexts/QuizContext'
import './ai.css'

const messages = [
  'Momentum looks great. One focused session can push your rank higher.',
  'You are building a strong comeback profile this week.',
  'Your consistency curve is rising. Keep the streak alive today.',
]

function AIMotivationMessage() {
  const { weakAreas } = useQuiz()

  const message = useMemo(() => {
    const index = weakAreas.length % messages.length
    return messages[index]
  }, [weakAreas])

  return (
    <section className="motivation-card" aria-label="AI motivation message">
      <p className="motivation-label">AI Motivation</p>
      <h2>{message}</h2>
      <p className="motivation-weak">Focus area: {weakAreas[0]}</p>
    </section>
  )
}

export default AIMotivationMessage
