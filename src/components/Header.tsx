import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, Leaf } from 'lucide-react'

const navItems = [
  { to: '/find', label: 'Find My Tool' },
  { to: '/explore', label: 'Explore' },
  { to: '/compare', label: 'Compare' },
  { to: '/guides', label: 'Guides' },
  { to: '/learn', label: 'Learn' },
  { to: '/about', label: 'About' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-ink/10 sticky top-0 z-40">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-ink font-semibold text-lg no-underline hover:no-underline hover:text-teal-600 transition-colors"
            aria-label="Digital Wellness Hub — Home"
          >
            <Leaf className="text-teal-600" size={22} aria-hidden="true" />
            <span>Wellness Hub</span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="nav-link"
                aria-current={undefined}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link to="/find" className="btn-primary hidden md:inline-flex text-xs px-4 py-2 !text-white hover:!text-white">
              Find My Tool
            </Link>
            <button
              className="btn-ghost md:hidden min-touch p-2"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen
                ? <X size={20} aria-hidden="true" />
                : <Menu size={20} aria-hidden="true" />
              }
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            className="md:hidden border-t border-ink/10 py-3 animate-slide-down"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="block px-2 py-2.5 text-sm font-medium text-ink-lighter hover:text-ink hover:bg-sand-100 rounded no-underline hover:no-underline transition-colors aria-[current=page]:text-teal-600 aria-[current=page]:bg-teal-50"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/find"
              className="btn-primary mt-3 w-full justify-center text-sm !text-white hover:!text-white"
              onClick={() => setMenuOpen(false)}
            >
              Find My Tool
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

