import { useToast } from '../../contexts/ToastContext'

function ToastHost() {
  const { toasts } = useToast()

  return (
    <div className="toast-host" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-item">
          {toast.message}
        </div>
      ))}
    </div>
  )
}

export default ToastHost
