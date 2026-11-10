import { Link } from 'react-router-dom'
import { Leaf } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-ink text-white/70 mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-white font-semibold mb-3 no-underline hover:text-teal-400">
              <Leaf className="text-teal-400" size={20} aria-hidden="true" />
              Digital Wellness Hub
            </Link>
            <p className="text-sm leading-relaxed">
              A curated resource hub helping college students choose and use digital wellness tools.
            </p>
            <p className="text-xs mt-3 text-white/40">
              Educational resource — not medical advice.
            </p>
          </div>

          {/* Find tools */}
          <div>
            <h2 className="text-white text-sm font-semibold mb-3 uppercase tracking-wide">Find Tools</h2>
            <ul className="space-y-2 text-sm">
              <li><Link to="/find" className="text-white/60 hover:text-white no-underline transition-colors">Find My Tool</Link></li>
              <li><Link to="/explore" className="text-white/60 hover:text-white no-underline transition-colors">Browse All</Link></li>
              <li><Link to="/compare" className="text-white/60 hover:text-white no-underline transition-colors">Compare Tools</Link></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h2 className="text-white text-sm font-semibold mb-3 uppercase tracking-wide">Learn</h2>
            <ul className="space-y-2 text-sm">
              <li><Link to="/guides" className="text-white/60 hover:text-white no-underline transition-colors">Setup Guides</Link></li>
              <li><Link to="/learn" className="text-white/60 hover:text-white no-underline transition-colors">Concepts</Link></li>
              <li><Link to="/learn/sleep-hygiene" className="text-white/60 hover:text-white no-underline transition-colors">Sleep & Screen Time</Link></li>
            </ul>
          </div>

          {/* Project */}
          <div>
            <h2 className="text-white text-sm font-semibold mb-3 uppercase tracking-wide">Project</h2>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-white/60 hover:text-white no-underline transition-colors">About</Link></li>
              <li><Link to="/privacy" className="text-white/60 hover:text-white no-underline transition-colors">Privacy</Link></li>
              <li><Link to="/project-evidence" className="text-white/60 hover:text-white no-underline transition-colors">Project Evidence</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/40">
          <p>Digital Wellness Resource Hub · 2026</p>
          <p>No accounts. No tracking. No cookies. <Link to="/privacy" className="text-white/60 hover:text-white no-underline">Learn more</Link></p>
        </div>
      </div>
    </footer>
  )
}

