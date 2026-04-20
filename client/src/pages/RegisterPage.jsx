import { useNavigate, Link } from 'react-router-dom'
import useForm from '../hooks/useForm'
import Button from '../components/ui/Button'
import api from '../utils/api'
import './AuthPage.css'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { values, errors, handleChange, handleSubmit, isSubmitting, setErrors } = useForm(
    { name: '', email: '', password: '', confirm: '' },
    { name: { required: true }, email: { required: true }, password: { required: true, minLength: 6 } }
  )

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
      <div className="auth-panel auth-panel--left">
        <h2>Join LearnQuest</h2>
        <p>Create an account to track your progress, earn badges, and compete on the leaderboard.</p>
      </div>
      <div className="auth-panel auth-panel--right">
        <form className="auth-form" onSubmit={onSubmit}>
          <h1>Create Account</h1>
          {errors._form && <div className="auth-error">{errors._form}</div>}
          {['name','email','password','confirm'].map(field => (
            <div key={field} className="form-group">
              <label>{field === 'confirm' ? 'Confirm Password' : field.charAt(0).toUpperCase()+field.slice(1)}</label>
              <input type={field.includes('pass') || field === 'confirm' ? 'password' : field === 'email' ? 'email' : 'text'} name={field} value={values[field]} onChange={handleChange} />
              {errors[field] && <span className="form-error">{errors[field]}</span>}
            </div>
          ))}
          <Button type="submit" size="lg" loading={isSubmitting} style={{ width: '100%' }}>Create Account</Button>
          <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
        </form>
      </div>
    </div>
  )
}
