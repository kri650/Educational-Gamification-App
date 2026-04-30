import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import useForm from '../hooks/useForm'
import Button from '../components/ui/Button'
import api from '../utils/api'
import './AuthPage.css'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const registered = searchParams.get('registered') === 'true'
  const [showRegisteredToast, setShowRegisteredToast] = useState(registered)
  const { values, errors, handleChange, handleSubmit, isSubmitting, setErrors } = useForm(
    { email: '', password: '' },
    { email: { required: true }, password: { required: true } }
  )

  useEffect(() => {
    if (!registered) return
    setShowRegisteredToast(true)
    const t = window.setTimeout(() => setShowRegisteredToast(false), 3500)
    return () => window.clearTimeout(t)
  }, [registered])

  const onSubmit = handleSubmit(async (vals) => {
    try {
      const { data } = await api.post('/api/auth/login', vals)
      login(data.data.token, data.data.user)
      navigate('/dashboard')
    } catch (err) {
      setErrors({ _form: err.response?.data?.message || 'Login failed' })
    }
  })

  return (
    <div className="auth-page">
      <Helmet>
        <title>LearnQuest — Login</title>
      </Helmet>

      {/* Left Panel - Branding */}
      <div className="auth-panel auth-panel--left">
        <div className="auth-illustration">
          <svg viewBox="0 0 240 240" fill="none" aria-hidden="true">
            {/* Background glow */}
            <circle cx="120" cy="120" r="100" fill="url(#loginGlow)" />

            {/* Book base with shadow */}
            <rect x="55" y="75" width="130" height="90" rx="12" fill="rgba(0,0,0,0.2)" />
            <rect x="50" y="70" width="130" height="90" rx="12" fill="#1A1A2E" stroke="#6C63FF" strokeWidth="2.5" />

            {/* Book pages detail */}
            <line x1="115" y1="75" x2="115" y2="155" stroke="#6C63FF" strokeWidth="1.5" opacity="0.6" />
            <line x1="120" y1="75" x2="120" y2="155" stroke="#6C63FF" strokeWidth="1" opacity="0.3" />

            {/* Left pages */}
            <path d="M60 90h50 M60 102h50 M60 114h50 M60 126h50 M60 138h50" stroke="#E8E8F0" strokeWidth="1.2" opacity="0.25" />
            {/* Right pages */}
            <path d="M125 90h50 M125 102h50 M125 114h50 M125 126h50 M125 138h50" stroke="#E8E8F0" strokeWidth="1.2" opacity="0.25" />

            {/* Bookmark */}
            <path d="M135 70v-15l5 5 5-5v15" fill="#FFD700" opacity="0.8" />

            {/* Star badge - top right */}
            <circle cx="175" cy="55" r="22" fill="url(#starGlow)" />
            <circle cx="175" cy="55" r="20" fill="#FFD700" opacity="0.2" />
            <path d="M175 42l4.41 8.94L189 53.82l-7 6.82 1.64 9.56L175 62.18l-8.64 4.38 1.64-9.56-7-6.82 9.59-1.06L175 42z"
              fill="#FFD700" stroke="#FFD700" strokeWidth="1" />

            {/* Lightbulb - top left */}
            <circle cx="55" cy="55" r="18" fill="url(#bulbGlow)" />
            <circle cx="55" cy="55" r="16" fill="#F59E0B" opacity="0.2" />
            <path d="M55 45v-2a6 6 0 0 1 12 0v2h2v8h-16v-8h2zm2-2a4 4 0 0 0-4 4v2h8v-2a4 4 0 0 0-4-4z"
              fill="#F59E0B" stroke="#F59E0B" strokeWidth="1" />

            {/* Progress dots at bottom */}
            <circle cx="85" cy="180" r="4" fill="#6C63FF" opacity="0.6" />
            <circle cx="100" cy="180" r="4" fill="#6C63FF" opacity="0.8" />
            <circle cx="115" cy="180" r="4" fill="#6C63FF" />
            <circle cx="130" cy="180" r="4" fill="#6C63FF" opacity="0.4" />
            <circle cx="145" cy="180" r="4" fill="#6C63FF" opacity="0.2" />

            {/* Decorative elements */}
            <path d="M40 140l8-4 8 4-8 4z" fill="#6C63FF" opacity="0.3" />
            <path d="M190 140l8-4 8 4-8 4z" fill="#FFD700" opacity="0.3" />

            {/* Gradients */}
            <defs>
              <radialGradient id="loginGlow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#6C63FF" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#6C63FF" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="starGlow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="bulbGlow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <h2>Welcome Back to LearnQuest</h2>
        <p>Continue your learning journey. Your streak is waiting to be maintained and your leaderboard rank awaits.</p>

        {/* Feature highlights */}
        <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '280px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--primary)', flexShrink: 0 }}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />
            </svg>
            <span>Earn XP and unlock achievements</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--gold, #FFD700)', flexShrink: 0 }}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
            </svg>
            <span>Compete on leaderboards</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: '#10B981', flexShrink: 0 }}>
              <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" fill="currentColor" />
            </svg>
            <span>Track your progress daily</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="auth-panel auth-panel--right">
        <form className="auth-form" onSubmit={onSubmit}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '-8px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--primary)' }}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor" />
            </svg>
            <h1>Log In</h1>
          </div>

          {showRegisteredToast && (
            <div className="auth-success">
              Account created successfully! Please log in to continue.
            </div>
          )}
          {errors._form && <div className="auth-error">{errors._form}</div>}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="you@example.com"
              autoFocus
              className={errors.email ? 'input--error' : ''}
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={values.password}
                onChange={handleChange}
                autoComplete="current-password"
                placeholder="••••••••"
                className={errors.password ? 'input--error' : ''}
              />
              <button
                type="button"
                className="input-action"
                onClick={() => setShowPassword(p => !p)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M4 4l16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <Button type="submit" size="lg" loading={isSubmitting} style={{ width: '100%' }}>
            Log In
          </Button>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one now</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
