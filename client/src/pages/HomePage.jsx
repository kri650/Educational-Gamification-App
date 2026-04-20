import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import './HomePage.css'

export default function HomePage() {
  return (
    <main className="home">
      <section className="home__hero">
        <h1 className="home__title">Turn Learning<br/>into a <span className="home__title--accent">Game</span></h1>
        <p className="home__subtitle">Take quizzes, earn XP, unlock badges, and climb the leaderboard — all while actually learning.</p>
        <div className="home__cta">
          <Link to="/quiz"><Button size="lg">Start Quizzing</Button></Link>
          <Link to="/leaderboard"><Button variant="ghost" size="lg">View Leaderboard</Button></Link>
        </div>
      </section>
      <section className="home__features">
        {[
          { title: 'Timed Quizzes', desc: 'Beat the clock on every question. Instant green/red feedback keeps you sharp.' },
          { title: 'Leaderboard', desc: 'See where you rank against other students. Filter by subject and time period.' },
          { title: 'Badges & XP', desc: 'Unlock achievement badges and level up your XP bar as you learn.' },
        ].map(f => (
          <Card key={f.title} hover>
            <h3>{f.title}</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>{f.desc}</p>
          </Card>
        ))}
      </section>
    </main>
  )
}
