import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, RefreshCw, Info } from 'lucide-react'
import { resources, concernLabels, platformLabels } from '../data/resources'
import type { Concern, Platform } from '../data/resources'
import { scoreResources, inputsToParams, paramsToInputs } from '../utils/scoring'
import type { FinderInputs } from '../utils/scoring'
import { EmptyState } from '../components/EmptyState'

const concerns: Concern[] = ['scrolling', 'focus', 'notifications', 'sleep', 'privacy']
const platforms: Platform[] = ['ios', 'android', 'windows', 'macos', 'chrome', 'firefox', 'edge']

function Step({ number, label, active, done }: { number: number; label: string; active: boolean; done: boolean }) {
  return (
    <div className={`flex items-center gap-2 text-sm ${active ? 'text-teal-600 font-semibold' : done ? 'text-teal-400' : 'text-ink-lighter'}`}>
      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${active ? 'bg-teal-600 text-white' : done ? 'bg-teal-100 text-teal-600' : 'bg-sand-100 text-ink-lighter'}`}>
        {done && !active ? '✓' : number}
      </span>
      {label}
    </div>
  )
}

export default function FindMyTool() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [step, setStep] = useState(1)
  const [inputs, setInputs] = useState<FinderInputs>(() => paramsToInputs(searchParams))
  const [showResults, setShowResults] = useState(() => {
    return Boolean(searchParams.get('concern') || searchParams.get('platforms'))
  })

  useEffect(() => {
    document.title = 'Find My Tool — Digital Wellness Hub'
  }, [])

  function updateConcern(c: Concern | '') {
    setInputs(prev => ({ ...prev, concern: c }))
  }

  function togglePlatform(p: Platform) {
    setInputs(prev => ({
      ...prev,
      platforms: prev.platforms.includes(p)
        ? prev.platforms.filter(x => x !== p)
        : [...prev.platforms, p]
    }))
  }

  function handleShowResults() {
    setShowResults(true)
    setSearchParams(inputsToParams(inputs))
  }

  function reset() {
    setInputs({ concern: '', platforms: [], budgetFreeOnly: false, preferOpenSource: false })
    setShowResults(false)
    setStep(1)
    setSearchParams(new URLSearchParams())
  }

  const result = scoreResources(resources, inputs)

  if (showResults) {
    return (
      <div className="container section">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-ink mb-1">Your recommendations</h1>
            <p className="text-ink-lighter text-sm">
              Based on your answers — {result.matches.length} tools match, {result.excluded.length} excluded.
            </p>
          </div>
          <button onClick={reset} className="btn-secondary text-sm flex items-center gap-2">
            <RefreshCw size={14} aria-hidden="true" /> Start over
          </button>
        </div>

        {/* Inputs summary */}
        <div className="card bg-sand-50 mb-8">
          <div className="flex flex-wrap gap-4 text-sm">
            {inputs.concern && (
              <span>Concern: <strong>{concernLabels[inputs.concern]}</strong></span>
            )}
            {inputs.platforms.length > 0 && (
              <span>Platforms: <strong>{inputs.platforms.map(p => platformLabels[p]).join(', ')}</strong></span>
            )}
            {inputs.budgetFreeOnly && <span className="text-teal-700">Free only</span>}
            {inputs.preferOpenSource && <span className="text-teal-700">Prefers open source</span>}
          </div>
        </div>

        {result.matches.length === 0 ? (
          <EmptyState
            title="No tools match all your criteria"
            description="Try expanding your search — remove the platform or budget filter. You can also explore built-in OS features (iOS Screen Time, Android Digital Wellbeing) which are free on all matching devices."
            action={{ label: 'Adjust filters', onClick: reset }}
            secondaryAction={{ label: 'Browse all tools', to: '/explore' }}
          />
        ) : (
          <div className="space-y-5 mb-10">
            {result.matches.map((scored, i) => (
              <article key={scored.resource.id} className="card-hover">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-teal-100 text-teal-700 text-sm font-bold flex items-center justify-center" aria-hidden="true">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-base font-semibold text-ink mb-1">{scored.resource.name}</h2>
                    <p className="text-sm text-teal-700 bg-teal-50 rounded px-3 py-2 mb-3 leading-relaxed">
                      <strong>Why this fits you:</strong> {scored.whyThisFits}
                    </p>
                    <p className="text-xs text-amber-700 bg-amber-50 rounded px-3 py-2 mb-3 leading-relaxed flex items-start gap-1">
                      <Info size={12} className="shrink-0 mt-0.5" aria-hidden="true" />
                      <span><strong>Trade-off:</strong> {scored.tradeoffNote}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Link to={`/explore/${scored.resource.slug}`} className="btn-primary text-xs py-1.5 px-4 no-underline">
                        View full details <ArrowRight size={12} aria-hidden="true" />
                      </Link>
                      {scored.resource.relatedGuides.length > 0 && (
                        <Link to={`/guides/${scored.resource.relatedGuides[0]}`} className="btn-secondary text-xs py-1.5 px-4 no-underline">
                          Setup guide
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Excluded tools */}
        {result.excluded.length > 0 && (
          <details className="card bg-sand-50">
            <summary className="cursor-pointer text-sm font-medium text-ink-lighter select-none">
              {result.excluded.length} tool{result.excluded.length !== 1 ? 's' : ''} hidden — tap to see why
            </summary>
            <ul className="mt-3 space-y-2">
              {result.excluded.map(({ resource: r, reasons }) => (
                <li key={r.id} className="text-xs text-ink-lighter">
                  <strong className="text-ink">{r.name}:</strong> {reasons.join('; ')}
                </li>
              ))}
            </ul>
          </details>
        )}

        <p className="text-xs text-ink-lighter mt-6 text-center">
          💡 Share your recommendations — the URL updates to reflect your selections.
        </p>
      </div>
    )
  }

  return (
    <div className="container section max-w-2xl">
      <h1 className="text-3xl font-semibold text-ink mb-2">Find the right tool</h1>
      <p className="text-ink-lighter mb-8">Answer 2–3 quick questions and we'll recommend the best-matched tools with plain-language explanations.</p>

      {/* Step indicators */}
      <div className="flex flex-wrap gap-4 mb-10" role="list" aria-label="Finder steps">
        <div role="listitem"><Step number={1} label="Your concern" active={step === 1} done={step > 1} /></div>
        <div role="listitem"><Step number={2} label="Your platform" active={step === 2} done={step > 2} /></div>
        <div role="listitem"><Step number={3} label="Budget (optional)" active={step === 3} done={step > 3} /></div>
      </div>

      {/* Step 1 — Concern */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-semibold text-ink mb-5">What's your main digital wellness concern?</h2>
          <div className="space-y-3 mb-8" role="group" aria-label="Select your primary concern">
            {concerns.map(c => (
              <button
                key={c}
                onClick={() => updateConcern(c)}
                className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-teal-600
                  ${inputs.concern === c
                    ? 'bg-teal-50 border-teal-400 text-teal-800 shadow-card'
                    : 'bg-white border-ink/15 text-ink hover:border-teal-300 hover:bg-teal-50/50'
                  }`}
                aria-pressed={inputs.concern === c}
              >
                {concernLabels[c]}
              </button>
            ))}
          </div>
          <div className="flex justify-between gap-3">
            <div />
            <button
              onClick={() => setStep(2)}
              disabled={!inputs.concern}
              className="btn-primary"
            >
              Next: Your platform <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2 — Platform */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold text-ink mb-2">Which platforms do you use?</h2>
          <p className="text-sm text-ink-lighter mb-5">Select all that apply. Tools will be filtered to only those supporting your devices.</p>
          <div className="grid grid-cols-2 gap-3 mb-8" role="group" aria-label="Select your platforms">
            {platforms.map(p => (
              <button
                key={p}
                onClick={() => togglePlatform(p)}
                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-teal-600
                  ${inputs.platforms.includes(p)
                    ? 'bg-teal-50 border-teal-400 text-teal-800'
                    : 'bg-white border-ink/15 text-ink hover:border-teal-300 hover:bg-teal-50/50'
                  }`}
                aria-pressed={inputs.platforms.includes(p)}
              >
                {platformLabels[p]}
              </button>
            ))}
          </div>
          <div className="flex justify-between gap-3">
            <button onClick={() => setStep(1)} className="btn-secondary flex items-center gap-2">
              <ChevronLeft size={16} aria-hidden="true" /> Back
            </button>
            <button onClick={() => setStep(3)} className="btn-primary">
              Next: Budget <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Budget */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold text-ink mb-2">Budget preference <span className="text-ink-lighter font-normal text-base">(optional)</span></h2>
          <div className="space-y-3 mb-8">
            <label className="flex items-center gap-3 p-4 bg-white rounded-xl border border-ink/15 cursor-pointer hover:border-teal-300 hover:bg-teal-50/50 transition-all">
              <input
                type="checkbox"
                className="checkbox shrink-0"
                checked={inputs.budgetFreeOnly}
                onChange={() => setInputs(prev => ({ ...prev, budgetFreeOnly: !prev.budgetFreeOnly }))}
              />
              <div>
                <p className="text-sm font-medium text-ink">Free only</p>
                <p className="text-xs text-ink-lighter">Show only tools with no cost (free or open source)</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-4 bg-white rounded-xl border border-ink/15 cursor-pointer hover:border-teal-300 hover:bg-teal-50/50 transition-all">
              <input
                type="checkbox"
                className="checkbox shrink-0"
                checked={inputs.preferOpenSource}
                onChange={() => setInputs(prev => ({ ...prev, preferOpenSource: !prev.preferOpenSource }))}
              />
              <div>
                <p className="text-sm font-medium text-ink">Prefer open source</p>
                <p className="text-xs text-ink-lighter">Prioritise tools with publicly auditable source code</p>
              </div>
            </label>
          </div>
          <div className="flex justify-between gap-3">
            <button onClick={() => setStep(2)} className="btn-secondary flex items-center gap-2">
              <ChevronLeft size={16} aria-hidden="true" /> Back
            </button>
            <button onClick={handleShowResults} className="btn-primary">
              Show my recommendations <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

