import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import ProgressBar from '../ui/ProgressBar'
import Sidebar from './Sidebar'
import { getLevelInfo } from '../../utils/levels'
import './Navbar.css'

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const menuRef = useRef(null)

  const handleLogout = () => { logout(); navigate('/') }

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setSidebarOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const onClick = (e) => {
      if (!menuRef.current) return
      if (!menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    if (!menuOpen) return
    window.addEventListener('mousedown', onClick)
    return () => window.removeEventListener('mousedown', onClick)
  }, [menuOpen])

  const totalPoints = user?.totalPoints ?? 0
  const levelInfo = useMemo(() => getLevelInfo(totalPoints), [totalPoints])

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar__logo">LearnQuest</Link>

        <div className="navbar__links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/quiz">Quizzes</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/badges">Badges</NavLink>
        </div>

        <div className="navbar__right">
          {isAuthenticated ? (
            <>
              <div className="navbar__xp" title={`${totalPoints} XP • Level ${levelInfo.level} ${levelInfo.levelName}`}>
                <div className="navbar__xpTop">
                  <span className="navbar__xpLvl">Lvl {levelInfo.level}</span>
                  <span className="navbar__xpText">
                    {levelInfo.xpToNext > 0 ? `${levelInfo.currentXP}/${levelInfo.xpToNext} XP` : 'MAX'}
                  </span>
                </div>
                <ProgressBar value={levelInfo.percentage} color="var(--gold)" />
              </div>

              <div className="navbar__user" ref={menuRef}>
                <button
                  type="button"
                  className="navbar__userBtn"
                  onClick={() => setMenuOpen(p => !p)}
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  aria-label="Open user menu"
                >
                  <Avatar name={user?.name || '?'} size="sm" />
                </button>
                {menuOpen && (
                  <div className="navbar__dropdown" role="menu">
                    <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="navbar__auth">
              <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
              <Link to="/register" className="navbar__authHideSm"><Button size="sm">Register</Button></Link>
            </div>
          )}

           <button
            type="button"
            className="navbar__theme"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 3ZM6.75 6.75a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 0 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0ZM3.75 12a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 3.75 12ZM6.75 17.25a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 0 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0ZM12 18.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 12 18.75ZM17.25 17.25a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 0 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0ZM17.25 12a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 17.25 12ZM16.69 6.04a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 0 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0Z" fill="currentColor"/>
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" fill="currentColor"/>
              </svg>
            )}
          </button>

          <button
            type="button"
            className="navbar__hamburger"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}
