import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { getConceptBySlug, concepts } from '../data/concepts'
import { EvidenceBadge } from '../components/EvidenceBadge'
import { resources } from '../data/resources'
import { ToolCard } from '../components/ToolCard'

export default function ConceptDetail() {
  const { slug } = useParams<{ slug: string }>()
  const concept = slug ? getConceptBySlug(slug) : undefined

  useEffect(() => {
    if (concept) document.title = `${concept.title} — Learn — Digital Wellness Hub`
  }, [concept])

  if (!concept) return <Navigate to="/learn" replace />

  const relatedTools = concept.tryItWith
    .map(id => resources.find(r => r.id === id))
    .filter(Boolean) as typeof resources
  const relatedConceptsList = concept.relatedConcepts
    .map(id => concepts.find(c => c.id === id))
    .filter(Boolean) as typeof concepts

  return (
    <div className="container section">
      <Link to="/learn" className="inline-flex items-center gap-2 text-sm text-ink-lighter hover:text-ink mb-6 no-underline group">
        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
        Back to Learn
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main content */}
        <article className="lg:col-span-2 prose-custom">
          <EvidenceBadge level={concept.evidenceLabel} className="mb-4" />
          <h1 className="text-3xl font-semibold text-ink mb-3 max-w-none">{concept.title}</h1>
          <p className="text-lg text-ink-lighter mb-8">{concept.tagline}</p>

          <section aria-labelledby="explanation-heading">
            <h2 id="explanation-heading">Plain explanation</h2>
            {concept.plainExplanation.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </section>

          <section className="bg-green-50 border border-green-100 rounded-xl p-5 my-6 not-prose" aria-labelledby="evidence-heading">
            <h2 id="evidence-heading" className="text-base font-semibold text-green-800 mb-2">Evidence summary</h2>
            <p className="text-sm text-green-700 leading-relaxed">{concept.evidenceSummary}</p>
          </section>

          <section className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6 not-prose" aria-labelledby="limits-heading">
            <h2 id="limits-heading" className="text-base font-semibold text-amber-800 mb-2">Evidence limits & caveats</h2>
            <p className="text-sm text-amber-700 leading-relaxed">{concept.evidenceLimits}</p>
          </section>

          <section aria-labelledby="sources-heading">
            <h2 id="sources-heading">Sources</h2>
            <ul>
              {concept.sources.map((s, i) => (
                <li key={i}>
                  {s.authors && <strong>{s.authors}</strong>}
                  {s.year && ` (${s.year})`}
                  {'. '}
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1"
                    aria-label={`${s.title} (opens in new tab)`}
                  >
                    {s.title}
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                  {s.journal && <em className="text-ink-lighter"> — {s.journal}</em>}
                  {s.note && <span className="text-ink-lighter text-xs block mt-0.5">{s.note}</span>}
                </li>
              ))}
            </ul>
          </section>
        </article>

        {/* Sidebar */}
        <aside aria-label="Related tools and concepts">
          {relatedTools.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-ink-lighter uppercase tracking-wide mb-3">Try it with…</h2>
              <div className="space-y-3">
                {relatedTools.map(r => (
                  <ToolCard key={r.id} resource={r} variant="compact" />
                ))}
              </div>
            </div>
          )}

          {relatedConceptsList.length > 0 && (
            <div className="card">
              <h2 className="text-sm font-semibold text-ink-lighter uppercase tracking-wide mb-3">Related concepts</h2>
              <ul className="space-y-2">
                {relatedConceptsList.map(c => (
                  <li key={c.id}>
                    <Link
                      to={`/learn/${c.slug}`}
                      className="text-sm text-teal-600 hover:text-teal-700 no-underline font-medium"
                    >
                      {c.title}
                    </Link>
                    <p className="text-xs text-ink-lighter">{c.tagline}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="card mt-5 bg-amber-50 border-amber-200">
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>Reminder:</strong> These concept pages are educational summaries for a Digital Wellness
              college project. They are not medical or psychological advice. Seek professional help
              for serious concerns.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

