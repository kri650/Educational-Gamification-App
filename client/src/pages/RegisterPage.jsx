import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, Link } from 'react-router-dom'
import useForm from '../hooks/useForm'
import Button from '../components/ui/Button'
import api from '../utils/api'
import './AuthPage.css'

function getPasswordStrength(password) {
  if (!password) return { label: '—', percent: 0, color: 'var(--border)' }

  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { label: 'Weak', percent: 33, color: 'var(--danger)' }
  if (score <= 3) return { label: 'Medium', percent: 66, color: 'var(--warning)' }
  return { label: 'Strong', percent: 100, color: 'var(--success)' }
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { values, errors, handleChange, handleSubmit, isSubmitting, setErrors } = useForm(
    { name: '', email: '', password: '', confirm: '' },
    {
      name: { required: true },
      email: { required: true, pattern: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
      password: { required: true, minLength: 6 },
      confirm: { required: true },
    }
  )

  const strength = useMemo(() => getPasswordStrength(values.password), [values.password])
  const confirmTouched = values.confirm.length > 0
  const passwordsMatch = confirmTouched && values.password === values.confirm
  const passwordsMismatch = confirmTouched && values.password !== values.confirm

  const onSubmit = handleSubmit(async (vals) => {
    if (vals.password !== vals.confirm) { setErrors({ confirm: 'Passwords do not match' }); return }
    try {
      await api.post('/api/auth/register', { name: vals.name, email: vals.email, password: vals.password })
      navigate('/login?registered=true')
    } catch (err) {
      setErrors({ _form: err.response?.data?.message || 'Registration failed' })
    }
  })

  return (
    <div className="auth-page">
      <Helmet>
        <title>LearnQuest — Register</title>
      </Helmet>

      {/* Left Panel - Branding */}
      <div className="auth-panel auth-panel--left">
        <div className="auth-illustration">
          <svg viewBox="0 0 240 240" fill="none" aria-hidden="true">
            {/* Background glow */}
            <circle cx="120" cy="120" r="110" fill="url(#registerGlow)" />

            {/* Trophy base with shadow */}
            <rect x="85" y="155" width="70" height="22" rx="6" fill="rgba(0,0,0,0.2)" />
            <rect x="80" y="150" width="80" height="25" rx="6" fill="url(#trophyBase)" />
            <rect x="85" y="130" width="70" height="20" rx="3" fill="url(#trophyMid)" />

            {/* Trophy cup */}
            <path d="M90 130V80c0-16.569 13.431-30 30-30s30 13.431 30 30v50"
              stroke="#FFD700" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M90 130h60" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />

            {/* Star on trophy */}
            <path d="M120 95l2.47 4.91L128 100.82l-5 4.87 1.18 6.91L120 110.18l-4.18 2.42L117 105.69l-5-4.87 6.53-1.91L120 95z"
              fill="#FFD700" stroke="#FFD700" strokeWidth="1" />

            {/* Badge - top left */}
            <circle cx="60" cy="55" r="24" fill="url(#badgeGlow)" />
            <circle cx="60" cy="55" r="22" fill="#6C63FF" opacity="0.2" stroke="#6C63FF" strokeWidth="2" />
            <path d="M60 42l4.41 8.94L74 52l-7 6.82 1.64 9.56L60 64.18l-8.64 4.38 1.64-9.56-7-6.82 9.59-1.06L60 42z"
              fill="#6C63FF" />

            {/* Checkmark circle - top right */}
            <circle cx="180" cy="55" r="24" fill="url(#checkGlow)" />
            <circle cx="180" cy="55" r="22" fill="#10B981" opacity="0.2" stroke="#10B981" strokeWidth="2" />
            <path d="M172 55l6 6 12-12" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

            {/* Decorative elements */}
            <circle cx="40" cy="140" r="6" fill="#6C63FF" opacity="0.3" />
            <circle cx="200" cy="140" r="6" fill="#FFD700" opacity="0.3" />
            <path d="M50 180l10-5 10 5-10 5z" fill="#10B981" opacity="0.3" />
            <path d="M170 180l10-5 10 5-10 5z" fill="#6C63FF" opacity="0.3" />

            {/* Progress indicators */}
            <circle cx="90" cy="200" r="5" fill="#6C63FF" opacity="0.4" />
            <circle cx="105" cy="200" r="5" fill="#6C63FF" opacity="0.6" />
            <circle cx="120" cy="200" r="5" fill="#6C63FF" opacity="0.8" />
            <circle cx="135" cy="200" r="5" fill="#6C63FF" opacity="1" />
            <circle cx="150" cy="200" r="5" fill="#6C63FF" opacity="0.5" />

            {/* Gradients */}
            <defs>
              <radialGradient id="registerGlow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="trophyBase" x1="80" y1="150" x2="160" y2="175" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FFD700" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="trophyMid" x1="85" y1="130" x2="155" y2="150" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#FFD700" stopOpacity="0.1" />
              </linearGradient>
              <radialGradient id="badgeGlow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#6C63FF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#6C63FF" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="checkGlow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <h2>Join LearnQuest Today</h2>
        <p>Create your account to start earning XP, unlock badges, and compete with learners worldwide.</p>

        {/* Feature highlights */}
        <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '280px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: '#FFD700', flexShrink: 0 }}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />
            </svg>
            <span>Earn badges and achievements</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--primary)', flexShrink: 0 }}>
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" fill="currentColor" />
            </svg>
            <span>Personalized quizzes</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: '#10B981', flexShrink: 0 }}>
              <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" fill="currentColor" />
            </svg>
            <span>Track progress & streaks</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: '#F59E0B', flexShrink: 0 }}>
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14c-3.87 0-7-3.13-7-7h2c0 2.76 2.24 5 5 5s5-2.24 5-5h2c0 3.87-3.13 7-7 7z" fill="currentColor" />
              <circle cx="12" cy="10" r="2" fill="currentColor" />
            </svg>
            <span>AI-powered insights</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Registration Form */}
      <div className="auth-panel auth-panel--right">
        <form className="auth-form" onSubmit={onSubmit}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '-8px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--primary)' }}>
              <path d="M15.5 12.5c0 1.38-1.12 2.5-2.5 2.5S10.5 13.88 10.5 12.5 11.62 10 13 10s2.5 1.12 2.5 2.5zM8.5 12.5c0 3.58 2.92 6.5 6.5 6.5s6.5-2.92 6.5-6.5S18.58 6 15 6s-6.5 2.92-6.5 6.5z" fill="currentColor" opacity="0.3" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor" />
            </svg>
            <h1>Create Account</h1>
          </div>

          {errors._form && <div className="auth-error">{errors._form}</div>}

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              autoComplete="name"
              placeholder="Enter your full name"
              className={errors.name ? 'input--error' : ''}
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="you@example.com"
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
                autoComplete="new-password"
                placeholder="Create a strong password"
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

            {/* Password strength indicator */}
            <div className="strength">
              <div className="strength__track">
                <div
                  className="strength__fill"
                  style={{ width: `${strength.percent}%`, background: strength.color }}
                />
              </div>
              <div className="strength__label">
                Strength: <span style={{ color: strength.color }}>{strength.label}</span>
              </div>
            </div>

            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <div className="input-wrap">
              <input
                type="password"
                name="confirm"
                value={values.confirm}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="Re-enter your password"
                className={(errors.confirm || passwordsMismatch) ? 'input--error' : ''}
              />
              {confirmTouched && (
                <div
                  className={`input-status ${passwordsMatch ? 'input-status--ok' : ''} ${passwordsMismatch ? 'input-status--bad' : ''}`}
                  aria-hidden="true"
                >
                  {passwordsMatch && (
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {passwordsMismatch && (
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
              )}
            </div>
            {errors.confirm && <span className="form-error">{errors.confirm}</span>}
          </div>

          <Button type="submit" size="lg" loading={isSubmitting} style={{ width: '100%' }}>
            Create Account
          </Button>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in instead</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
