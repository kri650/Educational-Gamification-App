import { Link } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <nav className="sidebar__nav" onClick={onClose}>
          <Link to="/quiz">Quizzes</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/badges">Badges</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
      </aside>
    </>
  )
}
