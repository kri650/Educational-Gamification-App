import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { useAuth } from '../context/AuthContext'
import Card from '../components/ui/Card'
import Skeleton from '../components/ui/Skeleton'
import api from '../utils/api'
import './DashboardPage.css'

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/users/me/stats')
      .then(r => setStats(r.data.data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="dashboard">
      <div className="dashboard__metrics">
        {[1,2,3,4].map(i => <Card key={i}><Skeleton height="60px" /></Card>)}
      </div>
    </div>
  )

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {/* AI motivation slot — Harshdeep fills this */}
      <div id="ai-motivation-slot" />
      <div className="dashboard__metrics">
        {[
          { label: 'Total XP',          value: user?.totalPoints ?? 0 },
          { label: 'Quizzes Done',       value: stats?.quizzesCompleted ?? 0 },
          { label: 'Current Streak',     value: `${stats?.currentStreak ?? 0} days` },
          { label: 'Badges Earned',      value: stats?.badgesEarned ?? 0 },
        ].map(m => (
          <Card key={m.label}>
            <div className="metric__label">{m.label}</div>
            <div className="metric__value">{m.value}</div>
          </Card>
        ))}
      </div>
      <div className="dashboard__charts">
        <Card>
          <h3>Score Over Time (7 days)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={stats?.scoresByDate || []}>
              <XAxis dataKey="date" stroke="var(--text-muted)" />
              <YAxis domain={[0,100]} stroke="var(--text-muted)" />
              <Tooltip contentStyle={{ background: 'var(--surface-raised)', border: 'none' }} />
              <Line type="monotone" dataKey="score" stroke="var(--primary)" dot={{ fill: '#fff' }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3>Performance by Subject</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={Object.entries(stats?.scoresBySubject || {}).map(([s,v]) => ({ subject: s, score: v }))}>
              <XAxis dataKey="subject" stroke="var(--text-muted)" />
              <YAxis domain={[0,100]} stroke="var(--text-muted)" />
              <Tooltip contentStyle={{ background: 'var(--surface-raised)', border: 'none' }} />
              <Bar dataKey="score" fill="var(--primary)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      {/* Weak area chart slot — Harshdeep fills this */}
      <div id="weak-area-slot" />
      {/* Next badge slot — Tanisha fills this */}
      <div id="next-badge-slot" />
    </div>
  )
}
