import { useState, useEffect, useId, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { resources, categories, platformLabels, costModelLabels } from '../data/resources'
import type { Platform, CostModel } from '../data/resources'
import { filterResources, paramsToFilters, filtersToParams } from '../utils/filters'
import { ToolCard } from '../components/ToolCard'
import { EmptyState } from '../components/EmptyState'

const platforms: Platform[] = ['ios', 'android', 'windows', 'macos', 'chrome', 'firefox', 'edge']
const costModels: CostModel[] = ['free', 'freemium', 'paid', 'open_source']

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = paramsToFilters(searchParams)
  const [compareList, setCompareList] = useState<string[]>([])
  const liveRef = useRef<HTMLDivElement>(null)
  const searchId = useId()

  const filtered = filterResources(resources, filters)
  const hasFilters = filters.search || filters.categories.length || filters.platforms.length || filters.costModels.length || filters.noAccount

  function update(partial: Partial<typeof filters>) {
    const next = { ...filters, ...partial }
    setSearchParams(filtersToParams(next))
  }

  function toggleArray<T>(arr: T[], value: T): T[] {
    return arr.includes(value) ? arr.filter(x => x !== value) : [...arr, value]
  }

  function clearAll() {
    setSearchParams(new URLSearchParams())
  }

  function toggleCompare(id: string) {
    setCompareList(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 4 ? [...prev, id] : prev
    )
  }

  useEffect(() => {
    document.title = `Explore Tools — Digital Wellness Hub`
  }, [])

  return (
    <div className="container section">
      <h1 className="text-3xl font-semibold text-ink mb-2">Explore tools</h1>
      <p className="text-ink-lighter mb-8">
        {resources.length} tools verified against official sources. Filter by your platform, budget, and concern.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="lg:w-64 shrink-0" aria-label="Filter tools">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-ink">Filters</h2>
              {hasFilters && (
                <button onClick={clearAll} className="text-xs text-teal-600 hover:text-teal-700 font-medium">
                  Clear all
                </button>
              )}
            </div>

            {/* Search */}
            <div className="mb-5">
              <label htmlFor={searchId} className="block text-xs font-medium text-ink-lighter mb-1.5 uppercase tracking-wide">
                Search
              </label>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-lighter" aria-hidden="true" />
                <input
                  id={searchId}
                  type="search"
                  placeholder="Tool name or feature…"
                  value={filters.search}
                  onChange={e => update({ search: e.target.value })}
                  className="input pl-9"
                />
                {filters.search && (
                  <button
                    onClick={() => update({ search: '' })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-lighter hover:text-ink"
                    aria-label="Clear search"
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>

            {/* Category */}
            <fieldset className="mb-5">
              <legend className="text-xs font-medium text-ink-lighter uppercase tracking-wide mb-2">Category</legend>
              <div className="space-y-1.5">
                {categories.map(cat => (
                  <label key={cat.id} className="flex items-start gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="checkbox shrink-0 mt-0.5"
                      checked={filters.categories.includes(cat.id)}
                      onChange={() => update({ categories: toggleArray(filters.categories, cat.id) })}
                    />
                    <span className="text-sm text-ink-light group-hover:text-ink transition-colors">{cat.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Platform */}
            <fieldset className="mb-5">
              <legend className="text-xs font-medium text-ink-lighter uppercase tracking-wide mb-2">Platform</legend>
              <div className="space-y-1.5">
                {platforms.map(p => (
                  <label key={p} className="flex items-start gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="checkbox shrink-0 mt-0.5"
                      checked={filters.platforms.includes(p)}
                      onChange={() => update({ platforms: toggleArray(filters.platforms, p) })}
                    />
                    <span className="text-sm text-ink-light group-hover:text-ink transition-colors">{platformLabels[p]}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Cost */}
            <fieldset className="mb-5">
              <legend className="text-xs font-medium text-ink-lighter uppercase tracking-wide mb-2">Cost</legend>
              <div className="space-y-1.5">
                {costModels.map(m => (
                  <label key={m} className="flex items-start gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="checkbox shrink-0 mt-0.5"
                      checked={filters.costModels.includes(m)}
                      onChange={() => update({ costModels: toggleArray(filters.costModels, m) })}
                    />
                    <span className="text-sm text-ink-light group-hover:text-ink transition-colors">{costModelLabels[m]}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* No account */}
            <fieldset>
              <legend className="sr-only">Account requirements</legend>
              <label className="flex items-start gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="checkbox shrink-0 mt-0.5"
                  checked={filters.noAccount}
                  onChange={() => update({ noAccount: !filters.noAccount })}
                />
                <span className="text-sm text-ink-light group-hover:text-ink transition-colors">No account required</span>
              </label>
            </fieldset>
          </div>

          {/* Compare tray */}
          {compareList.length > 0 && (
            <div className="card mt-4 bg-teal-50 border-teal-200">
              <h2 className="text-sm font-semibold text-teal-800 mb-2">Comparing ({compareList.length}/4)</h2>
              <ul className="space-y-1 mb-3">
                {compareList.map(id => {
                  const r = resources.find(x => x.id === id)
                  return r ? (
                    <li key={id} className="flex items-center justify-between gap-2 text-xs text-teal-800">
                      <span className="truncate">{r.name}</span>
                      <button onClick={() => toggleCompare(id)} aria-label={`Remove ${r.name} from comparison`}>
                        <X size={12} />
                      </button>
                    </li>
                  ) : null
                })}
              </ul>
              <a
                href={`#/compare?ids=${compareList.join(',')}`}
                className="btn-primary text-xs py-1.5 w-full justify-center no-underline"
              >
                Compare these tools
              </a>
            </div>
          )}
        </aside>

        {/* Results */}
        <div className="flex-1">
          {/* Result count - aria-live for screen readers */}
          <div
            ref={liveRef}
            aria-live="polite"
            aria-atomic="true"
            className="mb-5 flex items-center justify-between gap-4"
          >
            <p className="text-sm text-ink-lighter">
              <strong className="text-ink">{filtered.length}</strong>{' '}
              {filtered.length === 1 ? 'tool' : 'tools'} found
              {hasFilters && ` (of ${resources.length} total)`}
            </p>
            {hasFilters && (
              <button onClick={clearAll} className="text-xs text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1">
                <X size={12} aria-hidden="true" /> Clear filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title="No tools match your filters"
              description="Try broadening your search by removing some filters, or browse all tools."
              action={{ label: 'Clear all filters', onClick: clearAll }}
              secondaryAction={{ label: 'Browse all tools', to: '/explore' }}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(resource => (
                <ToolCard
                  key={resource.id}
                  resource={resource}
                  onCompareToggle={toggleCompare}
                  isInCompare={compareList.includes(resource.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

