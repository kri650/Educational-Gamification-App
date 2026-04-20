import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import useForm from '../hooks/useForm'
import Button from '../components/ui/Button'
import api from '../utils/api'
import './AuthPage.css'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const { values, errors, handleChange, handleSubmit, isSubmitting, setErrors } = useForm(
    { email: '', password: '' },
    { email: { required: true }, password: { required: true } }
  )

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
      <div className="auth-panel auth-panel--left">
        <h2>Welcome back to LearnQuest</h2>
        <p>Keep your streak going. Your leaderboard rank is waiting.</p>
      </div>
      <div className="auth-panel auth-panel--right">
        <form className="auth-form" onSubmit={onSubmit}>
          <h1>Log In</h1>
          {errors._form && <div className="auth-error">{errors._form}</div>}
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={values.email} onChange={handleChange} autoFocus />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={values.password} onChange={handleChange} />
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>
          <Button type="submit" size="lg" loading={isSubmitting} style={{ width: '100%' }}>Log In</Button>
          <p className="auth-switch">No account? <Link to="/register">Register</Link></p>
        </form>
      </div>
    </div>
  )
}
