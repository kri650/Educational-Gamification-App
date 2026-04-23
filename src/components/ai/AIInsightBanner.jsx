import { aiMockInsight } from '../../mocks/aiMock'
import './ai.css'

function AIInsightBanner({ suggestions = [] }) {
  return (
    <section className="ai-banner" aria-label="AI insight banner">
      <strong>Smart Insight:</strong>
      <p>{aiMockInsight.summary}</p>
      <span>{suggestions.length} targeted recommendations ready.</span>
    </section>
  )
}

export default AIInsightBanner
