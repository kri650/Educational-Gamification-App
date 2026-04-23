import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import './ai.css'

const weakAreaData = [
  { topic: 'Probability', score: 42 },
  { topic: 'Respiration', score: 48 },
  { topic: 'Motion', score: 39 },
  { topic: 'Acids', score: 51 },
]

function WeakAreaChart() {
  return (
    <section className="chart-card" aria-label="Weak area chart">
      <div className="chart-head">
        <h2>Weak Topic Snapshot</h2>
        <p>Lower score means higher review priority.</p>
      </div>

      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weakAreaData}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis dataKey="topic" stroke="var(--text-muted)" />
            <YAxis stroke="var(--text-muted)" />
            <Tooltip
              contentStyle={{
                background: 'var(--surface-raised)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
              }}
            />
            <Bar dataKey="score" fill="var(--primary)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default WeakAreaChart
