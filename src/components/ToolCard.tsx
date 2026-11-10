import { Link } from 'react-router-dom'
import { type LucideIcon, Clock, Target, Moon, Shield, ExternalLink } from 'lucide-react'
import type { Resource } from '../data/resources'

const categoryIcons: Record<string, LucideIcon> = {
  'screen-time': Clock,
  'focus': Target,
  'sleep': Moon,
  'privacy': Shield,
}

const costBadgeClass: Record<string, string> = {
  free: 'badge-free',
  freemium: 'badge-freemium',
  paid: 'badge-paid',
  open_source: 'badge-open-source',
}

const costLabel: Record<string, string> = {
  free: 'Free',
  freemium: 'Freemium',
  paid: 'Paid',
  open_source: 'Open Source',
}

interface ToolCardProps {
  resource: Resource
  variant?: 'default' | 'featured' | 'compact'
  onCompareToggle?: (id: string) => void
  isInCompare?: boolean
}

export function ToolCard({ resource, variant = 'default', onCompareToggle, isInCompare }: ToolCardProps) {
  const Icon = categoryIcons[resource.category] || Shield
  const models = Array.isArray(resource.cost.model) ? resource.cost.model : [resource.cost.model]

  if (variant === 'compact') {
    return (
      <article className="card-hover flex items-start gap-4 py-4 px-5">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
          <Icon size={18} className="text-teal-600" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-ink mb-0.5 truncate">{resource.name}</h3>
          <p className="text-xs text-ink-lighter line-clamp-2">{resource.tagline}</p>
        </div>
        <Link
          to={`/explore/${resource.slug}`}
          className="shrink-0 btn-ghost text-xs py-1 px-2 no-underline"
          aria-label={`View details for ${resource.name}`}
        >
          View
        </Link>
      </article>
    )
  }

  return (
    <article className="card-hover group flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="shrink-0 w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
          <Icon size={20} className="text-teal-600" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-ink leading-tight mb-1 truncate">{resource.name}</h3>
          <div className="flex flex-wrap gap-1">
            {models.map((m) => (
              <span key={m} className={`badge ${costBadgeClass[m]}`}>
                {costLabel[m]}
              </span>
            ))}
            {resource.verificationStatus.overall === 'needs_manual_verification' && (
              <span className="badge badge-pending" title="Some information needs manual verification">
                Verify
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tagline */}
      <p className="text-sm text-ink-lighter leading-relaxed mb-4 flex-1">
        {resource.tagline}
      </p>

      {/* Platforms */}
      <div className="mb-4">
        <p className="text-xs font-medium text-ink-lighter uppercase tracking-wide mb-1.5">Platforms</p>
        <p className="text-xs text-ink-light">
          {resource.platforms.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' · ')}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-auto pt-4 border-t border-ink/5">
        <Link
          to={`/explore/${resource.slug}`}
          className="btn-primary text-xs py-2 px-4 flex-1 justify-center no-underline"
          aria-label={`View full details for ${resource.name}`}
        >
          View details
        </Link>
        {onCompareToggle && (
          <button
            onClick={() => onCompareToggle(resource.id)}
            className={`btn-secondary text-xs py-2 px-3 ${isInCompare ? 'bg-teal-50 border-teal-200 text-teal-700' : ''}`}
            aria-pressed={isInCompare}
            aria-label={isInCompare ? `Remove ${resource.name} from comparison` : `Add ${resource.name} to comparison`}
          >
            {isInCompare ? 'Remove' : 'Compare'}
          </button>
        )}
        <a
          href={resource.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost text-xs p-2"
          aria-label={`Official site for ${resource.name} (opens in new tab)`}
          title={`Official site for ${resource.name}`}
        >
          <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}

