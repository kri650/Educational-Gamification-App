import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, Link } from 'react-router-dom'
import ScrollToTop from './components/common/ScrollToTop'
import { AuthProvider } from './contexts/AuthContext'
import { QuizProvider } from './contexts/QuizContext'
import { ToastProvider, useToast } from './contexts/ToastContext'
import ToastHost from './components/common/ToastHost'
import LeaderboardPage from './pages/LeaderboardPage'
import AIMotivationMessage from './components/ai/AIMotivationMessage'
import WeakAreaChart from './components/ai/WeakAreaChart'
import AIInsightBanner from './components/ai/AIInsightBanner'
import AIQuizCard from './components/ai/AIQuizCard'
import AILoadingSkeleton from './components/ai/AILoadingSkeleton'
import { getAISuggestions } from './services/aiService'
import { aiMockSuggestions } from './mocks/aiMock'
import './App.css'

function DashboardShell() {
  return (
    <main className="app-page">
      <header className="page-header">
        <h1>Dashboard</h1>
        <p>Live progress and your personal AI guidance.</p>
      </header>

      <div id="ai-motivation-slot" className="slot-wrap">
        <AIMotivationMessage />
      </div>

      <div id="weak-area-slot" className="slot-wrap">
        <WeakAreaChart />
      </div>
    </main>
  )
}

function QuizListShell() {
  const { addToast } = useToast()
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('recommended')

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAISuggestions()
        setSuggestions(Array.isArray(data) ? data : aiMockSuggestions)
      } catch {
        setSuggestions(aiMockSuggestions)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const startQuiz = (topic) => {
    addToast(`Starting ${topic} quiz...`)
  }

  return (
    <main className="app-page">
      <header className="page-header">
        <h1>Quizzes</h1>
        <p>Choose AI-guided challenges or regular sets.</p>
      </header>

      <div className="quiz-tabs" role="tablist" aria-label="Quiz filters">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'recommended'}
          className={`tab ${activeTab === 'recommended' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('recommended')}
        >
          Recommended
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'practice'}
          className={`tab ${activeTab === 'practice' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('practice')}
        >
          Practice
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'recent'}
          className={`tab ${activeTab === 'recent' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('recent')}
        >
          Recent
        </button>
      </div>

      <AIInsightBanner suggestions={suggestions} />

      {loading ? (
        <AILoadingSkeleton />
      ) : (
        <section className="quiz-card-grid" aria-label="AI quiz cards">
          {(() => {
            let visible = suggestions
            if (activeTab === 'practice') {
              visible = suggestions.filter((s) => s.confidence !== 'low')
            } else if (activeTab === 'recent') {
              visible = [...suggestions].reverse()
            }

            return visible.map((item) => (
              <AIQuizCard
                key={item.id}
                suggestion={item}
                onStart={() => startQuiz(item.topic)}
              />
            ))
          })()}
        </section>
      )}
    </main>
  )
}

function AppLayout() {
  return (
    <div className="app-shell">
      <nav className="top-nav" aria-label="Main navigation">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/quizzes">Quizzes</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardShell />} />
        <Route path="/quizzes" element={<QuizListShell />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>

      <ToastHost />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <ToastProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AppLayout />
          </BrowserRouter>
        </ToastProvider>
      </QuizProvider>
    </AuthProvider>
  )
}

export default App
