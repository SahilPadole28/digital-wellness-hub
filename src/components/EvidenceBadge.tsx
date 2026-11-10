import { type EvidenceLevel, evidenceLevelLabels, evidenceLevelColors } from '../data/concepts'
import { Info } from 'lucide-react'

interface EvidenceBadgeProps {
  level: EvidenceLevel
  showIcon?: boolean
  className?: string
}

export function EvidenceBadge({ level, showIcon = true, className = '' }: EvidenceBadgeProps) {
  return (
    <span
      className={`badge ${evidenceLevelColors[level]} ${className}`}
      title={evidenceLevelLabels[level]}
    >
      {showIcon && <Info size={10} aria-hidden="true" />}
      {evidenceLevelLabels[level]}
    </span>
  )
}

