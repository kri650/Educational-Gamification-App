import './Button.css'

export default function Button({ variant = 'primary', size = 'md', loading = false, disabled = false, onClick, children, className = '', type = 'button' }) {
  return (
    <button
      type={type}
      className={`btn btn--${variant} btn--${size} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading
        ? <svg className="btn__spinner" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31" strokeDashoffset="10"/></svg>
        : children}
    </button>
  )
}
