import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import './HomePage.css'

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const tiltRef = useRef(null)
  const [activeStat, setActiveStat] = useState(0)

  useEffect(() => {
    const el = tiltRef.current
    if (!el) return
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (reduceMotion) return

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))
      const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height))
      const ry = (px - 0.5) * 18
      const rx = (0.5 - py) * 14
      el.style.setProperty('--rx', `${rx}deg`)
      el.style.setProperty('--ry', `${ry}deg`)
      el.style.setProperty('--mx', `${Math.round(px * 100)}%`)
      el.style.setProperty('--my', `${Math.round(py * 100)}%`)
    }

    const onLeave = () => {
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
      el.style.setProperty('--mx', '50%')
      el.style.setProperty('--my', '50%')
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  // Auto-rotate stats highlight
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat(prev => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const stats = [
    { k: 'XP Points', v: 'Level Up', d: 'Earn XP for every correct answer and climb the ranks', icon: '⭐' },
    { k: 'Fast Rounds', v: 'Stay Focused', d: 'Time-boxed quizzes keep you sharp and engaged', icon: '⚡' },
    { k: 'Badges', v: 'Unlock Rewards', d: 'Collect achievement badges for milestones reached', icon: '🏆' },
  ]

  const subjects = [
    { name: 'Mathematics', icon: '➕', color: 'var(--primary)', quizzes: 45 },
    { name: 'Science', icon: '🔬', color: 'var(--success)', quizzes: 38 },
    { name: 'English', icon: '📖', color: 'var(--gold)', quizzes: 52 },
    { name: 'History', icon: '🏛️', color: 'var(--warning)', quizzes: 31 },
  ]

  return (
    <main className="home">
      <Helmet>
        <title>LearnQuest — Home</title>
      </Helmet>

      <section className="home__hero">
        <div className="home__heroInner">
          <div className="home__copy">
            <div className="home__eyebrow">Gamified learning, real progress</div>
            <h1 className="home__title">
              Turn Learning into a <span className="home__title--accent">Game</span>
            </h1>
            <p className="home__subtitle">
              Fast quizzes, instant feedback, XP progression, and badge unlocks — designed to keep you consistent and motivated every single day.
            </p>

            <div className="home__cta">
              {isAuthenticated && (
                <p className="home__quickStart">Welcome back! <Link to="/quiz">Continue where you left off</Link></p>
              )}
              <Link to={isAuthenticated ? '/quiz' : '/register'}>
                <Button size="lg">{isAuthenticated ? 'Start Quizzing' : 'Start Learning'}</Button>
              </Link>
              <Link to="/leaderboard">
                <Button variant="ghost" size="lg">View Leaderboard</Button>
              </Link>
            </div>

            <div className="home__miniStats" aria-label="Key highlights">
              {stats.map((s, idx) => (
                <div
                  key={s.k}
                  className={`home__miniStat ${idx === activeStat ? 'home__miniStat--active' : ''}`}
                  onMouseEnter={() => setActiveStat(idx)}
                >
                  <div className="home__miniIcon">{s.icon}</div>
                  <div className="home__miniK">{s.k}</div>
                  <div className="home__miniV">{s.v}</div>
                  <div className="home__miniD">{s.d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="home__visual" aria-hidden="true">
            <div className="home__tilt" ref={tiltRef}>
              <div className="holo">
                <div className="holo__top">
                  <div className="holo__tag">Today's Mission</div>
                  <div className="holo__title">Beat your streak</div>
                </div>
                <div className="holo__progress">
                  <div className="holo__progressRow">
                    <span>XP</span>
                    <span className="holo__gold">+120</span>
                  </div>
                  <div className="holo__bar"><div className="holo__barFill" /></div>
                </div>
                <div className="holo__grid">
                  {[
                    { label: 'Quiz', value: '05:00', tone: 'var(--warning)' },
                    { label: 'Accuracy', value: '92%', tone: 'var(--success)' },
                    { label: 'Badge', value: 'Unlocked', tone: 'var(--gold)' },
                  ].map(i => (
                    <div key={i.label} className="holo__cell">
                      <div className="holo__cellLabel">{i.label}</div>
                      <div className="holo__cellValue" style={{ color: i.tone }}>{i.value}</div>
                    </div>
                  ))}
                </div>
                <div className="holo__glow" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home__subjects">
        <div className="home__sectionHeader">
          <h2>Subjects Available</h2>
          <p>Choose from a wide range of topics to test your knowledge</p>
        </div>
        <div className="home__subjectsGrid">
          {subjects.map(s => (
            <Card key={s.name} hover className="home__subjectCard">
              <div className="home__subjectIcon" style={{ color: s.color }}>{s.icon}</div>
              <h3>{s.name}</h3>
              <p className="home__subjectCount">{s.quizzes} quizzes available</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="home__features">
        <div className="home__sectionHeader">
          <h2>Why LearnQuest?</h2>
          <p>Everything you need to master your subjects and track progress</p>
        </div>
        {[
          {
            title: 'Timed Quizzes',
            desc: 'Beat the clock on every question. Instant green/red feedback keeps you sharp and helps you learn from mistakes in real-time.',
            icon: (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 22a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" stroke="currentColor" strokeWidth="2" />
                <path d="M9 2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ),
          },
          {
            title: 'Leaderboard',
            desc: 'Compete with peers and see where you rank. Filter by subject and time period to track your improvement.',
            icon: (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 21V10M12 21V3M17 21v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ),
          },
          {
            title: 'Badges & XP',
            desc: 'Unlock achievement badges and watch your XP climb. Build daily streaks and become a top learner.',
            icon: (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2l2.8 6.1 6.7.6-5 4.4 1.5 6.6L12 16.9 6 19.7l1.5-6.6-5-4.4 6.7-.6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            ),
          },
        ].map(f => (
          <Card key={f.title} hover className="home__featureCard">
            <div className="home__featureIcon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p className="home__featureDesc">{f.desc}</p>
          </Card>
        ))}
      </section>

      <section className="home__ctaSection">
        <div className="home__ctaContent">
          <h2>Ready to Start Learning?</h2>
          <p>Join thousands of students who are mastering their subjects with LearnQuest</p>
          <div className="home__ctaButtons">
            <Link to={isAuthenticated ? '/quiz' : '/register'}>
              <Button size="lg">{isAuthenticated ? 'Start Quizzing Now' : 'Get Started Free'}</Button>
            </Link>
            {!isAuthenticated && (
              <Link to="/login">
                <Button variant="ghost" size="lg">Already have an account? Login</Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
