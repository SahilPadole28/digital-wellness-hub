import { Link } from 'react-router-dom'
import { type LucideIcon, Search, ArrowRight } from 'lucide-react'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    to?: string
    onClick?: () => void
  }
  secondaryAction?: {
    label: string
    to?: string
    onClick?: () => void
  }
}

export function EmptyState({
  icon: Icon = Search,
  title,
  description,
  action,
  secondaryAction,
}: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-4">
      <div className="w-16 h-16 bg-sand-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon size={28} className="text-ink-lighter" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-semibold text-ink mb-2">{title}</h2>
      <p className="text-sm text-ink-lighter max-w-sm mx-auto mb-6">{description}</p>
      <div className="flex flex-wrap gap-3 justify-center">
        {action && (
          action.to ? (
            <Link to={action.to} className="btn-primary">
              {action.label} <ArrowRight size={14} aria-hidden="true" />
            </Link>
          ) : (
            <button onClick={action.onClick} className="btn-primary">
              {action.label}
            </button>
          )
        )}
        {secondaryAction && (
          secondaryAction.to ? (
            <Link to={secondaryAction.to} className="btn-secondary">
              {secondaryAction.label}
            </Link>
          ) : (
            <button onClick={secondaryAction.onClick} className="btn-secondary">
              {secondaryAction.label}
            </button>
          )
        )}
      </div>
    </div>
  )
}

