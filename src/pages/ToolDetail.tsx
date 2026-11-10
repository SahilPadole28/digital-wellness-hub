import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ExternalLink, ArrowLeft, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import { getResourceBySlug, platformLabels, costModelLabels, categories } from '../data/resources'
import { concepts } from '../data/concepts'
import { guides } from '../data/guides'

export default function ToolDetail() {
  const { slug } = useParams<{ slug: string }>()
  const resource = slug ? getResourceBySlug(slug) : undefined

  useEffect(() => {
    if (resource) {
      document.title = `${resource.name} — Digital Wellness Hub`
    }
  }, [resource])

  if (!resource) return <Navigate to="/explore" replace />

  const models = Array.isArray(resource.cost.model) ? resource.cost.model : [resource.cost.model]
  const relatedConcepts = resource.courseConcepts.map(id => concepts.find(c => c.id === id)).filter(Boolean)
  const relatedGuideList = resource.relatedGuides.map(id => guides.find(g => g.id === id)).filter(Boolean)
  const category = categories.find(c => c.id === resource.category)

  return (
    <div className="container section">
      {/* Back link */}
      <Link to="/explore" className="inline-flex items-center gap-2 text-sm text-ink-lighter hover:text-ink mb-6 no-underline group">
        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
        Back to Explore
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs text-teal-600 font-medium mb-3">
              <span>{category?.label}</span>
            </div>
            <h1 className="text-3xl font-semibold text-ink mb-3">{resource.name}</h1>
            <p className="text-lg text-ink-lighter mb-4">{resource.tagline}</p>
            <div className="flex flex-wrap gap-2">
              {models.map(m => (
                <span key={m} className={`badge badge-${m === 'open_source' ? 'open-source' : m}`}>
                  {costModelLabels[m]}
                </span>
              ))}
              {resource.verificationStatus.overall === 'needs_manual_verification' && (
                <span className="badge badge-pending">⚠ Needs manual verification</span>
              )}
            </div>
          </div>

          {/* Purpose */}
          <section className="mb-8" aria-labelledby="purpose-heading">
            <h2 id="purpose-heading" className="text-xl font-semibold text-ink mb-3">What it does</h2>
            <p className="text-ink-light leading-relaxed">{resource.purpose}</p>
          </section>

          {/* Why it helps (course connection) */}
          <section className="mb-8 bg-teal-50 rounded-xl p-6 border border-teal-100" aria-labelledby="why-heading">
            <h2 id="why-heading" className="text-base font-semibold text-ink mb-2">Why this helps</h2>
            <p className="text-sm text-ink-light leading-relaxed mb-3">{resource.whyItHelps}</p>
            {relatedConcepts.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {relatedConcepts.map(c => c && (
                  <Link
                    key={c.id}
                    to={`/learn/${c.slug}`}
                    className="inline-flex items-center gap-1 text-xs text-teal-700 bg-white border border-teal-200 rounded px-2 py-1 no-underline hover:bg-teal-100 transition-colors"
                  >
                    <Info size={10} aria-hidden="true" />
                    {c.title}
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Key features */}
          <section className="mb-8" aria-labelledby="features-heading">
            <h2 id="features-heading" className="text-xl font-semibold text-ink mb-3">Key features</h2>
            <ul className="space-y-2">
              {resource.keyFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-light">
                  <CheckCircle size={16} className="text-teal-500 mt-0.5 shrink-0" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </section>

          {/* Limitations */}
          <section className="mb-8" aria-labelledby="limitations-heading">
            <h2 id="limitations-heading" className="text-xl font-semibold text-ink mb-3">Limitations</h2>
            <ul className="space-y-2">
              {resource.limitations.map((l, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-light">
                  <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" aria-hidden="true" />
                  {l}
                </li>
              ))}
            </ul>
          </section>

          {/* Related guides */}
          {relatedGuideList.length > 0 && (
            <section className="mb-8" aria-labelledby="guides-heading">
              <h2 id="guides-heading" className="text-xl font-semibold text-ink mb-3">Setup guides</h2>
              <div className="space-y-3">
                {relatedGuideList.map(g => g && (
                  <Link
                    key={g.id}
                    to={`/guides/${g.slug}`}
                    className="card-hover flex items-center gap-3 no-underline"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-ink">{g.title}</p>
                      <p className="text-xs text-ink-lighter">{g.tagline}</p>
                    </div>
                    <span className="btn-outline text-xs py-1 px-3 shrink-0">View guide</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar: comparison criteria */}
        <aside className="lg:col-span-1" aria-label="Tool details">
          <div className="card sticky top-24 space-y-5">
            {/* Official link */}
            <div>
              <a
                href={resource.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center text-sm no-underline"
                aria-label={`Official site for ${resource.name} (opens in new tab)`}
              >
                Visit official site <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>

            {/* Platforms */}
            <div>
              <h3 className="text-xs font-semibold text-ink-lighter uppercase tracking-wide mb-2">Platforms</h3>
              <div className="flex flex-wrap gap-1">
                {resource.platforms.map(p => (
                  <span key={p} className="badge bg-sand-100 text-ink border-ink/10">{platformLabels[p]}</span>
                ))}
              </div>
              {resource.platformNotes && (
                <p className="text-xs text-ink-lighter mt-2 leading-relaxed">{resource.platformNotes}</p>
              )}
            </div>

            {/* Cost */}
            <div>
              <h3 className="text-xs font-semibold text-ink-lighter uppercase tracking-wide mb-2">Cost</h3>
              <p className="text-sm text-ink-light">{resource.cost.details}</p>
              {resource.cost.paywalledFeatures.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs font-medium text-amber-700 mb-1">Requires payment:</p>
                  <ul className="space-y-1">
                    {resource.cost.paywalledFeatures.map((f, i) => (
                      <li key={i} className="text-xs text-ink-lighter flex items-start gap-1">
                        <span className="text-amber-500">•</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Privacy */}
            <div>
              <h3 className="text-xs font-semibold text-ink-lighter uppercase tracking-wide mb-2">Privacy & data</h3>
              <p className="text-sm text-ink-light mb-2">{resource.privacy.summary}</p>
              <p className="text-xs text-ink-lighter">
                Account required: <strong>{resource.privacy.accountRequired ? 'Yes' : 'No'}</strong>
              </p>
              <p className="text-xs text-ink-lighter mt-1">{resource.privacy.dataCollected}</p>
              {resource.privacy.policyUrl && (
                <a
                  href={resource.privacy.policyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal-600 mt-1 inline-block"
                  aria-label={`Privacy policy for ${resource.name} (opens in new tab)`}
                >
                  Privacy policy ↗
                </a>
              )}
              {resource.verificationStatus.privacy === 'needs_manual_verification' && (
                <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                  <AlertTriangle size={10} aria-hidden="true" />
                  Verify privacy details on official site
                </p>
              )}
            </div>

            {/* Accessibility */}
            <div>
              <h3 className="text-xs font-semibold text-ink-lighter uppercase tracking-wide mb-2">Accessibility</h3>
              <p className="text-xs text-ink-lighter leading-relaxed">{resource.accessibility.notes}</p>
              {resource.accessibility.sourceUrl !== 'not_documented' && (
                <a
                  href={resource.accessibility.sourceUrl as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal-600 mt-1 inline-block"
                  aria-label={`Accessibility information source for ${resource.name} (opens in new tab)`}
                >
                  Accessibility source ↗
                </a>
              )}
            </div>

            {/* Sources */}
            <div>
              <h3 className="text-xs font-semibold text-ink-lighter uppercase tracking-wide mb-2">Sources & verification</h3>
              <ul className="space-y-1">
                {resource.sources.map((s, i) => (
                  <li key={i} className="text-xs">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:text-teal-700"
                      aria-label={`${s.title} — source for ${resource.name} (opens in new tab)`}
                    >
                      {s.title} ↗
                    </a>
                    <span className="text-ink-lighter ml-1">({s.checkedOn})</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-ink-lighter mt-2">
                Last verified: <strong>{resource.verifiedOn}</strong>
              </p>
            </div>

            {/* Compare */}
            <div className="border-t border-ink/5 pt-4">
              <Link to={`/compare?ids=${resource.id}`} className="btn-secondary w-full justify-center text-sm">
                Add to comparison
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

