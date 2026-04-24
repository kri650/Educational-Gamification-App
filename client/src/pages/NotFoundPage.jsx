import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Button from '../components/ui/Button'
import './NotFoundPage.css'

export default function NotFoundPage() {
  return (
    <div className="notfound">
      <Helmet>
        <title>LearnQuest — 404</title>
      </Helmet>
      <div className="notfound__art" aria-hidden="true">
        <svg className="notfound__svg" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="68" stroke="var(--primary)" strokeWidth="10" opacity="0.9" />
          <circle cx="100" cy="100" r="52" stroke="var(--border)" strokeWidth="2" />
          <path d="M80 85l14 14-18 18 22 22-10 10" stroke="var(--gold)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M75 112l14-14M89 112 75 98" stroke="var(--text-primary)" strokeWidth="5" strokeLinecap="round" />
          <path d="M111 112l14-14M125 112l-14-14" stroke="var(--text-primary)" strokeWidth="5" strokeLinecap="round" />
          <path d="M80 132c10 10 30 10 40 0" stroke="var(--text-muted)" strokeWidth="5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="notfound__number">404</div>
      <h1>Page Not Found</h1>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/"><Button size="lg">Go Home</Button></Link>
    </div>
  )
}
