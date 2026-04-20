import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import './NotFoundPage.css'

export default function NotFoundPage() {
  return (
    <div className="notfound">
      <div className="notfound__number">404</div>
      <h1>Page Not Found</h1>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/"><Button size="lg">Go Home</Button></Link>
    </div>
  )
}
