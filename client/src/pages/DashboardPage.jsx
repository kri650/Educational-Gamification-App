import { useCallback, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, LabelList } from 'recharts'
import { useAuth } from '../context/AuthContext'
import Card from '../components/ui/Card'
import Skeleton from '../components/ui/Skeleton'
import Button from '../components/ui/Button'
import api from '../utils/api'
import './DashboardPage.css'

function ScoreTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const value = payload[0]?.value
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip__label">{label}</div>
      <div className="chart-tooltip__value">{typeof value === 'number' ? `${value}%` : value}</div>
    </div>
  )
}

function timeAgo(dateString) {
  const t = Date.parse(dateString)
  if (Number.isNaN(t)) return ''
  const diffSeconds = Math.max(0, Math.floor((Date.now() - t) / 1000))
  if (diffSeconds < 10) return 'just now'
  if (diffSeconds < 60) return `${diffSeconds}s ago`
  const diffMinutes = Math.floor(diffSeconds / 60)
  if (diffMinutes < 60) return `${diffMinutes}m ago`
  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays}d ago`
}

function getGradeTone(score) {
  if (score >= 90) return 'var(--success)'
  if (score >= 75) return 'var(--primary)'
  if (score >= 60) return 'var(--warning)'
  return 'var(--danger)'
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [animated, setAnimated] = useState({ totalPoints: 0, quizzesCompleted: 0, currentStreak: 0, badgesEarned: 0 })

  const fetchStats = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const r = await api.get('/api/users/me/stats')
      setStats(r.data.data)
    } catch (e) {
      setStats(null)
      setError(e.response?.data?.message || 'Failed to load your dashboard.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchStats() }, [fetchStats])

  const totalPoints = user?.totalPoints ?? stats?.totalPoints ?? 0
  const quizzesCompleted = stats?.quizzesCompleted ?? 0
  const currentStreak = stats?.currentStreak ?? 0
  const badgesEarned = stats?.badgesEarned ?? 0

  useEffect(() => {
    if (loading) return
    const to = { totalPoints, quizzesCompleted, currentStreak, badgesEarned }
    const start = performance.now()
    const duration = 1200

    let raf = 0
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setAnimated({
        totalPoints: Math.round(to.totalPoints * eased),
        quizzesCompleted: Math.round(to.quizzesCompleted * eased),
        currentStreak: Math.round(to.currentStreak * eased),
        badgesEarned: Math.round(to.badgesEarned * eased),
      })
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [loading, totalPoints, quizzesCompleted, currentStreak, badgesEarned])

  const subjectColors = useMemo(() => ({
    Math: 'var(--primary)',
    Science: 'var(--success)',
    English: 'var(--gold)',
    History: 'var(--warning)',
  }), [])

  const scoresByDate = stats?.scoresByDate || []
  const scoresBySubjectData = useMemo(() => {
    const raw = stats?.scoresBySubject || {}
    return Object.entries(raw).map(([subject, score]) => ({ subject, score }))
  }, [stats])

  const streakWindow = useMemo(() => {
    const today = new Date()
    const windowDays = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today)
      d.setDate(today.getDate() - (6 - i))
      return {
        key: d.toISOString().slice(0, 10),
        label: d.toLocaleDateString('en-US', { weekday: 'short' }),
        completed: false,
      }
    })

    const cal = stats?.streakCalendar
    if (Array.isArray(cal) && cal.length) {
      const last = cal.slice(-7)
      for (let i = 0; i < windowDays.length; i++) {
        const v = last[i]
        windowDays[i].completed = Boolean(v?.completed ?? v?.didQuiz ?? v)
      }
      return windowDays
    }

    const streakCount = Math.max(0, Math.min(7, Number(currentStreak) || 0))
    for (let i = 7 - streakCount; i < 7; i++) {
      if (i >= 0) windowDays[i].completed = true
    }
    return windowDays
  }, [stats, currentStreak])

  const recentAttempts = (stats?.recentAttempts || []).slice(0, 5)

  if (loading) return (
    <div className="dashboard">
      <Helmet>
        <title>LearnQuest — Dashboard</title>
      </Helmet>
      <h1>Dashboard</h1>
      <div className="dashboard__metrics">
        {[1, 2, 3, 4].map(i => (
          <Card key={i}>
            <Skeleton height="14px" width="60%" />
            <div style={{ marginTop: 10 }}><Skeleton height="36px" width="70%" /></div>
          </Card>
        ))}
      </div>
      <div className="dashboard__charts">
        {[1, 2].map(i => (
          <Card key={i}>
            <Skeleton height="14px" width="55%" />
            <div style={{ marginTop: 14 }}><Skeleton height="200px" /></div>
          </Card>
        ))}
      </div>
      <div className="dashboard__secondary">
        {[1, 2].map(i => (
          <Card key={i}>
            <Skeleton height="14px" width="45%" />
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Skeleton height="18px" />
              <Skeleton height="18px" width="80%" />
              <Skeleton height="18px" width="65%" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  return (
    <div className="dashboard">
      <Helmet>
        <title>LearnQuest — Dashboard</title>
      </Helmet>
      <div className="dashboard__header">
        <div>
          <h1>Dashboard</h1>
          <p className="dashboard__headerSub">Welcome back, {user?.name || 'Learner'}! Track your progress and keep the streak alive.</p>
        </div>
      </div>
      {/* AI motivation slot — Harshdeep fills this */}
      <div id="ai-motivation-slot" />

      {error && (
        <Card className="dashboard__error">
          <div className="dashboard__errorTitle">Couldn’t load dashboard</div>
          <div className="dashboard__errorMsg">{error}</div>
          <Button variant="ghost" onClick={fetchStats}>Retry</Button>
        </Card>
      )}

      <div className="dashboard__metrics">
        {[
          { label: 'Total XP',          value: animated.totalPoints, suffix: ' XP', accent: true },
          { label: 'Quizzes Done',       value: animated.quizzesCompleted, accent: true },
          { label: 'Current Streak',     value: animated.currentStreak, suffix: ' days', accent: true },
          { label: 'Badges Earned',      value: animated.badgesEarned, accent: true },
        ].map(m => (
          <Card key={m.label} className="metric__card">
            <div className="metric__label">{m.label}</div>
            <div className="metric__value">
              {m.value}
              {m.accent && <span className="metric__suffix">{m.suffix || ''}</span>}
              {!m.accent && (m.suffix || '')}
            </div>
          </Card>
        ))}
      </div>

      <div className="dashboard__charts">
        <Card>
          <h3>Score Over Time (7 days)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={scoresByDate}>
              <XAxis dataKey="date" stroke="var(--text-muted)" />
              <YAxis domain={[0,100]} stroke="var(--text-muted)" />
              <Tooltip content={<ScoreTooltip />} />
              <Line type="monotone" dataKey="score" stroke="var(--primary)" dot={{ fill: 'var(--text-primary)' }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3>Performance by Subject</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={scoresBySubjectData}>
              <XAxis dataKey="subject" stroke="var(--text-muted)" />
              <YAxis domain={[0,100]} stroke="var(--text-muted)" />
              <Tooltip content={<ScoreTooltip />} />
              <Bar dataKey="score">
                {scoresBySubjectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={subjectColors[entry.subject] || 'var(--primary)'} />
                ))}
                <LabelList dataKey="score" position="top" fill="var(--text-muted)" formatter={(v) => `${v}%`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="dashboard__secondary">
        <Card>
          <h3>📅 Streak Calendar</h3>
          <div className="streak-calendar" aria-label="Last 7 days streak calendar">
            {streakWindow.map(d => (
              <div
                key={d.key}
                className={`streak-day ${d.completed ? 'streak-day--on' : ''} ${d.label === new Date().toLocaleDateString('en-US', { weekday: 'short' }) ? 'streak-day--today' : ''}`}
                title={`${d.label}: ${d.completed ? 'Quiz completed' : 'No quiz'}`}
                aria-label={`${d.label}: ${d.completed ? 'Completed' : 'Missed'}`}
              >
                {d.completed ? '✓' : d.label === new Date().toLocaleDateString('en-US', { weekday: 'short' }) ? 'T' : d.label.charAt(0)}
              </div>
            ))}
          </div>
          {currentStreak > 0 && (
            <p style={{ marginTop: 12, color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>
              🔥 <strong>{currentStreak} day{currentStreak > 1 ? 's' : ''}</strong> streak going strong!
            </p>
          )}
        </Card>

        <Card>
          <h3>📊 Recent Activity</h3>
          <div className="recent-list">
            {recentAttempts.length === 0 ? (
              <div className="recent-empty">No recent attempts yet. Start a quiz to see your progress!</div>
            ) : recentAttempts.map((a, idx) => {
              const subject = a.subject || a.quizSubject || a.quiz?.subject || '—'
              const title = a.quizTitle || a.title || a.quiz?.title || 'Quiz'
              const score = Number(a.score ?? a.percentage ?? a.percent ?? 0)
              const when = timeAgo(a.createdAt || a.attemptedAt || a.date)
              const tone = getGradeTone(score)
              return (
                <div key={a._id || `${subject}-${idx}`} className="recent-row">
                  <span className="pill" style={{ borderColor: tone, color: tone }}>{subject}</span>
                  <span className="recent-title" title={title}>{title}</span>
                  <span className="recent-score" style={{ color: tone }}>{Number.isFinite(score) ? `${score}%` : '—'}</span>
                  <span className="recent-ago">{when}</span>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Weak area chart slot — Harshdeep fills this */}
      <div id="weak-area-slot" />
      {/* Next badge slot — Tanisha fills this */}
      <div id="next-badge-slot" />
    </div>
  )
}
