import { Link } from 'react-router-dom'
import type { Concept } from '../data/concepts'
import { EvidenceBadge } from './EvidenceBadge'
import { ArrowRight } from 'lucide-react'

interface ConceptCardProps {
  concept: Concept
}

export function ConceptCard({ concept }: ConceptCardProps) {
  return (
    <article className="card-hover flex flex-col h-full">
      <div className="mb-3">
        <EvidenceBadge level={concept.evidenceLabel} />
      </div>
      <h3 className="text-base font-semibold text-ink mb-2">{concept.title}</h3>
      <p className="text-sm text-ink-lighter leading-relaxed mb-4 flex-1">{concept.tagline}</p>
      <Link
        to={`/learn/${concept.slug}`}
        className="inline-flex items-center gap-1 text-sm text-teal-600 font-medium no-underline hover:text-teal-700 mt-auto"
        aria-label={`Learn about ${concept.title}`}
      >
        Read more <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </article>
  )
}

