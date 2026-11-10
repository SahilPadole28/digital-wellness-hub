import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { BookOpen, Clock, ArrowRight } from 'lucide-react'
import { guides } from '../data/guides'

export default function Guides() {
  useEffect(() => {
    document.title = 'Setup Guides — Digital Wellness Hub'
  }, [])

  return (
    <div className="container section">
      <div className="max-w-2xl mb-10">
        <h1 className="text-3xl font-semibold text-ink mb-3">Student setup guides</h1>
        <p className="text-ink-lighter leading-relaxed">
          Step-by-step instructions written for college students. Each guide explains what
          you're setting up, why it helps (with an evidence label), and what the trade-offs are.
          Screenshots are pending — to be captured by student authors on real devices.
        </p>
      </div>

      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {guides.map((guide, i) => (
          <article key={guide.id} className="card-hover flex flex-col h-full">
            <div className="flex items-center gap-2 text-xs text-teal-600 font-medium mb-3">
              <BookOpen size={12} aria-hidden="true" />
              Guide {i + 1} of {guides.length}
            </div>
            <h2 className="text-base font-semibold text-ink mb-2">{guide.title}</h2>
            <p className="text-sm text-ink-lighter leading-relaxed mb-4 flex-1">{guide.tagline}</p>

            <div className="flex items-center gap-4 text-xs text-ink-lighter mb-4">
              <span className="flex items-center gap-1">
                <Clock size={12} aria-hidden="true" />
                {guide.estimatedTime}
              </span>
              <span className="text-amber-600 font-medium">DRAFT</span>
            </div>

            <div className="mb-4">
              <p className="text-xs font-medium text-ink-lighter uppercase tracking-wide mb-1.5">Platforms covered</p>
              <div className="flex flex-wrap gap-1">
                {guide.platforms.map(p => (
                  <span key={p.platform} className="badge bg-sand-100 text-ink border-ink/10 text-xs">
                    {p.platform}
                  </span>
                ))}
              </div>
            </div>

            <Link
              to={`/guides/${guide.slug}`}
              className="btn-primary text-sm py-2 w-full justify-center no-underline mt-auto"
              aria-label={`Read the guide: ${guide.title}`}
            >
              Read guide <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

