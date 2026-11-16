import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { X, ArrowRight, Sparkles, AlertTriangle, ShieldCheck, Zap } from 'lucide-react'
import { resources, platformLabels, costModelLabels } from '../data/resources'
import type { Resource } from '../data/resources'
import { EmptyState } from '../components/EmptyState'

const MAX_COMPARE = 4

export const comparisonPresets = [
  { label: 'Built-in OS Controls', ids: ['ios-screen-time', 'android-digital-wellbeing'], desc: 'iOS Screen Time vs Android Digital Wellbeing' },
  { label: 'Study & Focus Blockers', ids: ['forest', 'leechblock-ng', 'news-feed-eradicator'], desc: 'Forest vs LeechBlock NG vs News Feed Eradicator' },
  { label: 'Bedtime & Sleep Routines', ids: ['ios-sleep-focus', 'android-bedtime-mode', 'flux'], desc: 'Sleep Focus vs Bedtime Mode vs f.lux' },
  { label: 'Online Privacy Trio', ids: ['ublock-origin', 'duckduckgo', 'signal'], desc: 'uBlock Origin vs DuckDuckGo vs Signal' },
]

const presets = comparisonPresets

// Visual indicators for tools
function getVisualIndicators(resource: Resource) {
  const frictionMap: Record<string, { label: string; color: string }> = {
    'one-sec': { label: 'Gentle Pause', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    'news-feed-eradicator': { label: 'Feed Removal', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    'forest': { label: 'Gamified Loss Aversion', color: 'bg-green-50 text-green-700 border-green-200' },
    'ios-screen-time': { label: 'Passcode Friction', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    'android-digital-wellbeing': { label: 'Timer Grayscale', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    'leechblock-ng': { label: 'Strict Hard Lockout', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    'ios-sleep-focus': { label: 'Scheduled Silence', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    'android-bedtime-mode': { label: 'Scheduled Silence', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    'flux': { label: 'Color Temperature', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    'ublock-origin': { label: 'Automated Blocking', color: 'bg-teal-50 text-teal-700 border-teal-200' },
    'duckduckgo': { label: 'Private Routing', color: 'bg-teal-50 text-teal-700 border-teal-200' },
    'signal': { label: 'E2E Encryption', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  }

  const setupMap: Record<string, string> = {
    'ublock-origin': '1 min (1-click install)',
    'news-feed-eradicator': '1 min (1-click install)',
    'duckduckgo': '2 mins (Set default engine)',
    'signal': '2 mins (Install & phone verify)',
    'forest': '2 mins (App store install)',
    'flux': '3 mins (Install & set location)',
    'one-sec': '5 mins (Shortcut automation)',
    'ios-screen-time': '4 mins (In Settings)',
    'android-digital-wellbeing': '4 mins (In Settings)',
    'ios-sleep-focus': '5 mins (Health schedule)',
    'android-bedtime-mode': '4 mins (Bedtime schedule)',
    'leechblock-ng': '6 mins (Configure block sets)',
  }

  return {
    friction: frictionMap[resource.id] || { label: 'Moderate', color: 'bg-teal-50 text-teal-700 border-teal-200' },
    setupTime: setupMap[resource.id] || '3–5 mins',
  }
}

const criteria = [
  { key: 'indicators', label: 'Visual Overview' },
  { key: 'purpose', label: 'Purpose & Problem' },
  { key: 'platforms', label: 'Supported Platforms' },
  { key: 'cost', label: 'Cost & Licensing' },
  { key: 'paywalled', label: 'What is Paywalled?' },
  { key: 'privacy', label: 'Privacy & Data Use' },
  { key: 'account', label: 'Account Required?' },
  { key: 'accessibility', label: 'Accessibility Notes' },
  { key: 'limitations', label: 'Known Limitations' },
  { key: 'courseConcept', label: 'Course Concept' },
  { key: 'verified', label: 'Last Verified' },
]

export default function Compare() {
  const [searchParams, setSearchParams] = useSearchParams()
  const idsParam = searchParams.get('ids') || ''
  const selectedIds = idsParam ? idsParam.split(',').filter(Boolean).slice(0, MAX_COMPARE) : []
  const [addingId, setAddingId] = useState<string>('')

  useEffect(() => {
    document.title = 'Compare Tools Side-by-Side — Digital Wellness Hub'
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

  function loadPreset(ids: string[]) {
    setSearchParams({ ids: ids.join(',') })
  }

  const available = resources.filter(r => !selectedIds.includes(r.id))

  function renderCriterionCell(resource: Resource, key: string) {
    const ind = getVisualIndicators(resource)
    const models = Array.isArray(resource.cost.model) ? resource.cost.model : [resource.cost.model]
    const isFree = models.includes('free') || models.includes('open_source')

    switch (key) {
      case 'indicators':
        return (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${ind.friction.color}`}>
                {ind.friction.label}
              </span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${isFree ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                {models.map(m => costModelLabels[m]).join(' + ')}
              </span>
            </div>
            <div className="text-[11px] text-ink-lighter flex items-center gap-1">
              <Zap size={12} className="text-amber-600" aria-hidden="true" />
              <span>Setup: <strong>{ind.setupTime}</strong></span>
            </div>
          </div>
        )
      case 'purpose':
        return <p className="text-xs leading-relaxed text-ink-light">{resource.purpose}</p>
      case 'platforms':
        return (
          <div className="flex flex-wrap gap-1">
            {resource.platforms.map(p => (
              <span key={p} className="px-2 py-0.5 bg-sand-100 text-ink text-[11px] rounded font-medium">
                {platformLabels[p]}
              </span>
            ))}
          </div>
        )
      case 'cost':
        return (
          <div className="text-xs text-ink-light leading-relaxed">
            <span className="font-semibold block text-ink">{models.map(m => costModelLabels[m]).join(' + ')}</span>
            <span>{resource.cost.details}</span>
          </div>
        )
      case 'paywalled':
        return resource.cost.paywalledFeatures.length > 0 ? (
          <span className="text-amber-800 bg-amber-50 border border-amber-200 rounded px-2 py-1 block text-xs">
            {resource.cost.paywalledFeatures.join('; ')}
          </span>
        ) : (
          <span className="text-green-800 bg-green-50 border border-green-200 rounded px-2 py-1 block text-xs font-medium">
            ✓ 100% Free — No paywalled features
          </span>
        )
      case 'privacy':
        return (
          <div className="text-xs text-ink-light leading-relaxed">
            <div className="flex items-center gap-1 font-semibold text-teal-800 mb-0.5">
              <ShieldCheck size={13} className="text-teal-600 shrink-0" aria-hidden="true" />
              <span>{resource.privacy.accountRequired ? 'Account Required' : 'No Account Required'}</span>
            </div>
            <p>{resource.privacy.summary}</p>
          </div>
        )
      case 'account':
        return resource.privacy.accountRequired ? (
          <span className="text-amber-700 font-medium">Yes</span>
        ) : (
          <span className="text-green-700 font-medium">No (Local only)</span>
        )
      case 'accessibility':
        return <p className="text-xs text-ink-light leading-relaxed">{resource.accessibility.notes}</p>
      case 'limitations':
        return (
          <ul className="space-y-1 text-xs text-amber-900 bg-amber-50/70 p-2 rounded border border-amber-100">
            {resource.limitations.slice(0, 2).map((lim, i) => (
              <li key={i} className="flex items-start gap-1">
                <AlertTriangle size={11} className="text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{lim}</span>
              </li>
            ))}
          </ul>
        )
      case 'courseConcept':
        return <p className="text-xs font-medium text-teal-800">{resource.courseConcepts.join(', ')}</p>
      case 'verified':
        return <span className="text-[11px] text-ink-lighter">{resource.verifiedOn}</span>
      default:
        return '—'
    }
  }

  return (
    <div className="container section">
      {/* Title */}
      <div className="max-w-3xl mb-6">
        <h1 className="text-3xl font-semibold text-ink mb-2">Compare tools side-by-side</h1>
        <p className="text-ink-lighter text-sm leading-relaxed">
          Compare up to 4 tools side by side across verified criteria including friction level,
          cost inclusions, privacy terms, accessibility, and known limitations.
        </p>
      </div>

      {/* Preset shortcuts (Addressing Student 8 & Student 3 feedback) */}
      <div className="card bg-sand-50/80 border-ink/10 mb-8 p-4">
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-ink uppercase tracking-wide">
          <Sparkles size={14} className="text-teal-600" aria-hidden="true" />
          Quick Comparison Presets:
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => loadPreset(preset.ids)}
              className="px-3 py-1.5 bg-white border border-ink/15 hover:border-teal-400 hover:bg-teal-50 rounded-lg text-xs font-medium text-ink transition-all shadow-sm"
              title={preset.desc}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tool selector */}
      <div className="card mb-8 border-ink/10">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Selected tools */}
          {selected.map(r => (
            <div key={r.id} className="flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-lg px-3 py-2">
              <span className="text-sm font-semibold text-teal-900">{r.name}</span>
              <button
                onClick={() => removeTool(r.id)}
                className="text-teal-600 hover:text-teal-900 transition-colors"
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
                className="input text-xs py-2 w-auto bg-white border-ink/20"
                aria-label="Add a tool to compare"
              >
                <option value="">+ Add another tool to compare…</option>
                {available.map(r => (
                  <option key={r.id} value={r.id}>{r.name} ({r.category})</option>
                ))}
              </select>
            </div>
          )}

          {selected.length === 0 && (
            <p className="text-xs text-ink-lighter">Select tools above or click a preset shortcut to compare side by side.</p>
          )}
        </div>
      </div>

      {/* Empty State */}
      {selected.length < 2 && (
        <EmptyState
          title="Select at least 2 tools to compare"
          description={
            selected.length === 0
              ? "Choose one of the comparison presets above, or use the dropdown to select tools."
              : "Add at least one more tool to see a comprehensive side-by-side matrix."
          }
          action={{ label: 'Compare built-in OS tools', onClick: () => loadPreset(['ios-screen-time', 'android-digital-wellbeing']) }}
          secondaryAction={{ label: 'Browse full catalogue', to: '/explore' }}
        />
      )}

      {/* Comparison table — desktop */}
      {selected.length >= 2 && (
        <>
          <div className="hidden md:block overflow-x-auto rounded-xl border border-ink/10 shadow-card bg-white">
            <table className="w-full">
              <caption className="sr-only">Side-by-side comparison of selected digital wellness tools</caption>
              <thead>
                <tr className="border-b border-ink/10 bg-sand-100/60">
                  <th className="compare-th w-44" scope="col">Criterion</th>
                  {selected.map(r => (
                    <th key={r.id} className="compare-th" scope="col">
                      <div className="font-semibold text-ink text-sm">{r.name}</div>
                      <div className="text-xs font-normal text-ink-lighter normal-case tracking-normal mt-0.5 line-clamp-1">{r.tagline}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {criteria.map(c => (
                  <tr key={c.key} className="hover:bg-sand-50/50 transition-colors">
                    <th scope="row" className="compare-th font-semibold text-ink text-xs normal-case tracking-normal bg-sand-50/30">
                      {c.label}
                    </th>
                    {selected.map(r => (
                      <td key={r.id} className="compare-td text-xs align-top">
                        {renderCriterionCell(r, c.key)}
                      </td>
                    ))}
                  </tr>
                ))}
                {/* Details link row */}
                <tr className="bg-sand-50">
                  <th scope="row" className="compare-th font-semibold text-ink text-xs normal-case tracking-normal">
                    Actions
                  </th>
                  {selected.map(r => (
                    <td key={r.id} className="compare-td">
                      <div className="flex flex-col gap-1.5">
                        <Link to={`/explore/${r.slug}`} className="text-xs text-teal-600 font-semibold hover:text-teal-700 underline inline-flex items-center gap-1">
                          Full tool breakdown <ArrowRight size={11} aria-hidden="true" />
                        </Link>
                        {r.relatedGuides.length > 0 && (
                          <Link to={`/guides/${r.relatedGuides[0]}`} className="text-xs text-ink-light hover:text-ink underline">
                            Setup guide
                          </Link>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile stacked layout */}
          <div className="md:hidden space-y-6">
            {selected.map(r => (
              <div key={r.id} className="card border-ink/10">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-ink/10">
                  <div>
                    <h2 className="text-base font-semibold text-ink">{r.name}</h2>
                    <span className="text-xs text-ink-lighter">{r.tagline}</span>
                  </div>
                  <button
                    onClick={() => removeTool(r.id)}
                    className="btn-ghost text-xs p-1"
                    aria-label={`Remove ${r.name}`}
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                </div>
                <dl className="space-y-4">
                  {criteria.map(c => (
                    <div key={c.key} className="border-b border-ink/5 pb-2">
                      <dt className="text-[11px] font-bold text-ink-lighter uppercase tracking-wider mb-1">{c.label}</dt>
                      <dd>{renderCriterionCell(r, c.key)}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 pt-3 flex gap-2">
                  <Link to={`/explore/${r.slug}`} className="btn-primary text-xs py-2 flex-1 justify-center no-underline !text-white hover:!text-white">
                    Full breakdown
                  </Link>
                  {r.relatedGuides.length > 0 && (
                    <Link to={`/guides/${r.relatedGuides[0]}`} className="btn-secondary text-xs py-2 flex-1 justify-center no-underline">
                      Setup guide
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Share notice */}
      {selected.length >= 2 && (
        <p className="text-xs text-ink-lighter mt-6 text-center">
          💡 Bookmark or share this comparison — the URL updates dynamically with selected tools.
        </p>
      )}
    </div>
  )
}
