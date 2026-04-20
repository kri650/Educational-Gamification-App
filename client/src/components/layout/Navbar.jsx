import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Avatar from '../ui/Avatar'
import './Navbar.css'

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">LearnQuest</Link>
      {isAuthenticated && (
        <div className="navbar__links">
          <NavLink to="/quiz">Quizzes</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/badges">Badges</NavLink>
        </div>
      )}
      <div className="navbar__right">
        {isAuthenticated ? (
          <div className="navbar__user" onClick={() => setMenuOpen(p => !p)}>
            <span className="navbar__points">{user?.totalPoints ?? 0} XP</span>
            <Avatar name={user?.name || '?'} size="sm" />
            {menuOpen && (
              <div className="navbar__dropdown">
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="navbar__login">Login</Link>
        )}
      </div>
    </nav>
  )
}
