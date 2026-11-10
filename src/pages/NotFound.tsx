import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  useEffect(() => {
    document.title = '404 — Page Not Found — Digital Wellness Hub'
  }, [])

  return (
    <div className="container section text-center max-w-lg mx-auto">
      <div className="text-6xl font-bold text-teal-600 mb-4" aria-hidden="true">404</div>
      <h1 className="text-2xl font-semibold text-ink mb-3">Page not found</h1>
      <p className="text-ink-lighter mb-8">
        The page you're looking for doesn't exist or may have moved.
        Try searching for a tool, or return to the home page.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link to="/" className="btn-primary">
          <Home size={16} aria-hidden="true" /> Go to Home
        </Link>
        <Link to="/explore" className="btn-secondary">
          <Search size={16} aria-hidden="true" /> Browse tools
        </Link>
      </div>
    </div>
  )
}

