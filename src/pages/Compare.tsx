import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { X, ArrowRight } from 'lucide-react'
import { resources, platformLabels, costModelLabels } from '../data/resources'
import type { Resource } from '../data/resources'
import { EmptyState } from '../components/EmptyState'

const MAX_COMPARE = 4

const criteria = [
  { key: 'purpose', label: 'Purpose' },
  { key: 'platforms', label: 'Platforms' },
  { key: 'cost', label: 'Cost' },
  { key: 'paywalled', label: 'What\'s paywalled' },
  { key: 'privacy', label: 'Privacy & data' },
  { key: 'account', label: 'Account required' },
  { key: 'accessibility', label: 'Accessibility' },
  { key: 'limitations', label: 'Key limitations' },
  { key: 'courseConcept', label: 'Course concept' },
  { key: 'verified', label: 'Last verified' },
]

function getCriterionValue(resource: Resource, key: string): string {
  switch (key) {
    case 'purpose': return resource.purpose
    case 'platforms': return resource.platforms.map(p => platformLabels[p]).join(', ')
    case 'cost': {
      const models = Array.isArray(resource.cost.model) ? resource.cost.model : [resource.cost.model]
      return `${models.map(m => costModelLabels[m]).join(' + ')} — ${resource.cost.details}`
    }
    case 'paywalled':
      return resource.cost.paywalledFeatures.length > 0
        ? resource.cost.paywalledFeatures.join('; ')
        : 'Nothing — fully free'
    case 'privacy': return resource.privacy.summary
    case 'account': return resource.privacy.accountRequired ? 'Yes' : 'No'
    case 'accessibility': return resource.accessibility.notes
    case 'limitations': return resource.limitations.slice(0, 3).join('; ')
    case 'courseConcept': return resource.courseConcepts.join(', ')
    case 'verified': return resource.verifiedOn
    default: return '—'
  }
}

export default function Compare() {
  const [searchParams, setSearchParams] = useSearchParams()
  const idsParam = searchParams.get('ids') || ''
  const selectedIds = idsParam ? idsParam.split(',').filter(Boolean).slice(0, MAX_COMPARE) : []
  const [addingId, setAddingId] = useState<string>('')

  useEffect(() => {
    document.title = 'Compare Tools — Digital Wellness Hub'
  }, [])

  const selected = selectedIds
    .map(id => resources.find(r => r.id === id))
    .filter(Boolean) as Resource[]

  function addTool(id: string) {
    if (!id || selectedIds.includes(id) || selectedIds.length >= MAX_COMPARE) return
    const next = [...selectedIds, id]
    setSearchParams({ ids: next.join(',') })
    setAddingId('')
  }

  function removeTool(id: string) {
    const next = selectedIds.filter(x => x !== id)
    setSearchParams(next.length ? { ids: next.join(',') } : {})
  }

  const available = resources.filter(r => !selectedIds.includes(r.id))

  return (
    <div className="container section">
      <h1 className="text-3xl font-semibold text-ink mb-2">Compare tools</h1>
      <p className="text-ink-lighter mb-6">Select 2–4 tools to compare side by side across all criteria. Share this comparison via the URL.</p>

      {/* Tool selector */}
      <div className="card mb-8">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Selected tools */}
          {selected.map(r => (
            <div key={r.id} className="flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-lg px-3 py-2">
              <span className="text-sm font-medium text-teal-800">{r.name}</span>
              <button
                onClick={() => removeTool(r.id)}
                className="text-teal-600 hover:text-teal-800 transition-colors"
                aria-label={`Remove ${r.name} from comparison`}
              >
                <X size={14} aria-hidden="true" />
              </button>
            </div>
          ))}

          {/* Add tool dropdown */}
          {selected.length < MAX_COMPARE && (
            <div className="flex items-center gap-2">
              <select
                value={addingId}
                onChange={e => { setAddingId(e.target.value); addTool(e.target.value) }}
                className="input text-sm py-2 w-auto"
                aria-label="Add a tool to compare"
              >
                <option value="">+ Add a tool…</option>
                {available.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
          )}

          {selected.length === 0 && (
            <p className="text-sm text-ink-lighter">No tools selected. Add tools above to begin comparing.</p>
          )}
        </div>
      </div>

      {/* Not enough tools selected */}
      {selected.length < 2 && (
        <EmptyState
          title="Select at least 2 tools"
          description={
            selected.length === 0
              ? "Use the dropdown above to add tools, or browse the full list."
              : "Add one more tool to start the side-by-side comparison."
          }
          action={{ label: 'Browse all tools', to: '/explore' }}
        />
      )}

      {/* Comparison table — desktop */}
      {selected.length >= 2 && (
        <>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-ink/10 shadow-card">
            <table className="w-full">
              <caption className="sr-only">Side-by-side comparison of selected digital wellness tools</caption>
              <thead>
                <tr>
                  <th className="compare-th w-36" scope="col">Criterion</th>
                  {selected.map(r => (
                    <th key={r.id} className="compare-th" scope="col">
                      <div className="font-semibold text-ink text-sm">{r.name}</div>
                      <div className="text-xs font-normal text-ink-lighter normal-case tracking-normal mt-0.5">{r.tagline.slice(0, 50)}…</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {criteria.map(c => (
                  <tr key={c.key} className="hover:bg-sand-50 transition-colors">
                    <th scope="row" className="compare-th font-medium text-ink text-xs normal-case tracking-normal">{c.label}</th>
                    {selected.map(r => (
                      <td key={r.id} className="compare-td text-xs leading-relaxed">
                        {getCriterionValue(r, c.key)}
                      </td>
                    ))}
                  </tr>
                ))}
                {/* Links row */}
                <tr className="bg-sand-50">
                  <th scope="row" className="compare-th font-medium text-ink text-xs normal-case tracking-normal">Details</th>
                  {selected.map(r => (
                    <td key={r.id} className="compare-td">
                      <Link to={`/explore/${r.slug}`} className="text-xs text-teal-600 font-medium hover:text-teal-700 no-underline inline-flex items-center gap-1">
                        Full details <ArrowRight size={12} aria-hidden="true" />
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile stacked layout */}
          <div className="md:hidden space-y-6">
            {selected.map(r => (
              <div key={r.id} className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-ink">{r.name}</h2>
                  <button
                    onClick={() => removeTool(r.id)}
                    className="btn-ghost text-xs p-1"
                    aria-label={`Remove ${r.name}`}
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                </div>
                <dl className="space-y-3">
                  {criteria.map(c => (
                    <div key={c.key}>
                      <dt className="text-xs font-semibold text-ink-lighter uppercase tracking-wide mb-0.5">{c.label}</dt>
                      <dd className="text-xs text-ink-light leading-relaxed">{getCriterionValue(r, c.key)}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 pt-4 border-t border-ink/5">
                  <Link to={`/explore/${r.slug}`} className="btn-primary text-xs py-1.5 w-full justify-center no-underline">
                    Full details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Share note */}
      {selected.length >= 2 && (
        <p className="text-xs text-ink-lighter mt-6 text-center">
          💡 Share this comparison — the URL contains your selected tools and updates automatically.
        </p>
      )}
    </div>
  )
}

