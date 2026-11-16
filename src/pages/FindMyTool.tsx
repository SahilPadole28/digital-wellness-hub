import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, RefreshCw, Info, CheckCircle, HelpCircle } from 'lucide-react'
import { resources, concernLabels, platformLabels } from '../data/resources'
import type { Concern, Platform } from '../data/resources'
import { scoreResources, inputsToParams, paramsToInputs } from '../utils/scoring'
import type { FinderInputs, DailyUsage, InterventionType } from '../utils/scoring'
import { EmptyState } from '../components/EmptyState'

const concerns: { id: Concern; desc: string }[] = [
  { id: 'scrolling', desc: 'Mindless infinite scrolling across social feeds and short videos' },
  { id: 'focus', desc: 'Difficulty concentrating and staying on task during study sessions' },
  { id: 'notifications', desc: 'Constant pings and badge alerts fragmenting attention' },
  { id: 'sleep', desc: 'Late-night phone use and screen glare delaying bedtime' },
  { id: 'privacy', desc: 'Online tracking, invasive ad profiling, and digital surveillance' },
]

const usageOptions: { id: DailyUsage; label: string; subtext: string }[] = [
  { id: 'gt-10h', label: 'More than 10 hours', subtext: 'Continuous heavy device use (needs strict friction)' },
  { id: '6-8h', label: '6 to 8 hours', subtext: 'Substantial daily screen time during study & leisure' },
  { id: '4-6h', label: '4 to 6 hours', subtext: 'Moderate-to-heavy usage across phone & laptop' },
  { id: '2-4h', label: '2 to 4 hours', subtext: 'Average daily academic and communication use' },
  { id: 'lt-2h', label: 'Less than 2 hours', subtext: 'Light, intentional usage (gentle awareness fit)' },
]

const interventionOptions: { id: InterventionType; label: string; desc: string }[] = [
  { id: 'friction', label: 'Gentle Friction & Pauses', desc: 'Breathing delays or app-opening pauses to break automatic habits' },
  { id: 'blocking', label: 'Strict Website / App Blocking', desc: 'Scheduled lockouts and blacklist enforcement during study hours' },
  { id: 'scheduling', label: 'Downtime & Bedtime Modes', desc: 'Automated evening cutoffs that silence notifications and dim icons' },
  { id: 'environment', label: 'Display & Sensory Shifts', desc: 'Warm color temperatures (f.lux) or grayscale to reduce stimulation' },
]

const platforms: Platform[] = ['ios', 'android', 'windows', 'macos', 'chrome', 'firefox', 'edge']

function Step({ number, label, active, done }: { number: number; label: string; active: boolean; done: boolean }) {
  return (
    <div className={`flex items-center gap-2 text-sm ${active ? 'text-teal-600 font-semibold' : done ? 'text-teal-500' : 'text-ink-lighter'}`}>
      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${active ? 'bg-teal-600 text-white' : done ? 'bg-teal-100 text-teal-700' : 'bg-sand-100 text-ink-lighter'}`}>
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
    return Boolean(searchParams.get('concern') || searchParams.get('platforms') || searchParams.get('usage'))
  })

  useEffect(() => {
    document.title = 'Find My Tool — Digital Wellness Hub'
  }, [])

  function updateConcern(c: Concern | '') {
    setInputs(prev => ({ ...prev, concern: c }))
  }

  function updateDailyUsage(u: DailyUsage) {
    setInputs(prev => ({ ...prev, dailyUsage: prev.dailyUsage === u ? '' : u }))
  }

  function updateIntervention(i: InterventionType) {
    setInputs(prev => ({ ...prev, interventionType: prev.interventionType === i ? '' : i }))
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
    setInputs({
      concern: '',
      platforms: [],
      budgetFreeOnly: false,
      preferOpenSource: false,
      dailyUsage: '',
      interventionType: '',
    })
    setShowResults(false)
    setStep(1)
    setSearchParams(new URLSearchParams())
  }

  const result = scoreResources(resources, inputs)

  if (showResults) {
    return (
      <div className="container section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-ink mb-1">Your recommendations</h1>
            <p className="text-ink-lighter text-sm">
              Ranked by psychological and device fit — {result.matches.length} tools match, {result.excluded.length} excluded.
            </p>
          </div>
          <button onClick={reset} className="btn-secondary text-sm flex items-center gap-2 self-start">
            <RefreshCw size={14} aria-hidden="true" /> Adjust answers
          </button>
        </div>

        {/* Inputs summary */}
        <div className="card bg-sand-50 mb-8 border-ink/10">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="font-semibold text-ink uppercase tracking-wide">Your Profile:</span>
            {inputs.concern && (
              <span className="px-2.5 py-1 bg-white border border-ink/10 rounded-full text-ink">
                Concern: <strong>{concernLabels[inputs.concern]}</strong>
              </span>
            )}
            {inputs.dailyUsage && (
              <span className="px-2.5 py-1 bg-white border border-ink/10 rounded-full text-ink">
                Usage: <strong>{usageOptions.find(u => u.id === inputs.dailyUsage)?.label}</strong>
              </span>
            )}
            {inputs.interventionType && (
              <span className="px-2.5 py-1 bg-white border border-ink/10 rounded-full text-ink">
                Intervention: <strong>{interventionOptions.find(i => i.id === inputs.interventionType)?.label}</strong>
              </span>
            )}
            {inputs.platforms.length > 0 && (
              <span className="px-2.5 py-1 bg-white border border-ink/10 rounded-full text-ink">
                Devices: <strong>{inputs.platforms.map(p => platformLabels[p]).join(', ')}</strong>
              </span>
            )}
            {inputs.budgetFreeOnly && (
              <span className="px-2.5 py-1 bg-green-50 border border-green-200 text-green-800 rounded-full font-medium">
                100% Free Only
              </span>
            )}
            {inputs.preferOpenSource && (
              <span className="px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-800 rounded-full font-medium">
                Open Source
              </span>
            )}
          </div>
        </div>

        {result.matches.length === 0 ? (
          <EmptyState
            title="No tools match all your criteria"
            description="Try expanding your search by unchecking the platform filter or free-only filter. Native built-in OS tools (iOS Screen Time, Android Digital Wellbeing) are available free on all corresponding devices."
            action={{ label: 'Reset filters', onClick: reset }}
            secondaryAction={{ label: 'Browse full catalogue', to: '/explore' }}
          />
        ) : (
          <div className="space-y-6 mb-12">
            {result.matches.map((scored, i) => (
              <article key={scored.resource.id} className="card border-ink/10 shadow-card hover:shadow-card-hover transition-all">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-teal-600 text-white text-sm font-bold flex items-center justify-center" aria-hidden="true">
                    #{i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div>
                        <h2 className="text-lg font-semibold text-ink inline-block mr-2">{scored.resource.name}</h2>
                        <span className="text-xs text-ink-lighter italic">({scored.resource.tagline})</span>
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                        Match Score: {scored.score} pts
                      </span>
                    </div>

                    {/* 1. Why selected & Problem addressed */}
                    <div className="p-3 bg-teal-50/70 border border-teal-100 rounded-lg text-xs leading-relaxed mb-3 text-ink">
                      <p className="mb-1 text-teal-900 font-medium">
                        <strong>Why this fits you:</strong> {scored.whyThisFits}
                      </p>
                      <p className="text-ink-light">
                        <strong>Problem it addresses:</strong> {scored.problemAddressed}
                      </p>
                    </div>

                    {/* 2. Key relevant features & Cost status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 text-xs">
                      <div className="p-2.5 bg-white border border-ink/10 rounded-lg">
                        <span className="font-semibold text-ink block mb-1">Key Relevant Features:</span>
                        <ul className="space-y-1 text-ink-light">
                          {scored.relevantFeatures.map((feat, fi) => (
                            <li key={fi} className="flex items-start gap-1.5">
                              <CheckCircle size={12} className="text-teal-600 mt-0.5 shrink-0" aria-hidden="true" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-2.5 bg-white border border-ink/10 rounded-lg">
                        <span className="font-semibold text-ink block mb-1">Pricing & Inclusions:</span>
                        <p className="text-ink-light leading-relaxed">{scored.pricingNote}</p>
                        <div className="mt-2 text-[11px] text-ink-lighter">
                          <strong>Privacy:</strong> {scored.resource.privacy.summary}
                        </div>
                      </div>
                    </div>

                    {/* 3. Trade-offs / Limitations */}
                    <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 mb-3 flex items-start gap-2">
                      <Info size={14} className="shrink-0 mt-0.5 text-amber-700" aria-hidden="true" />
                      <span>{scored.tradeoffNote}</span>
                    </div>

                    {/* 4. Alternative consideration */}
                    <div className="p-2.5 bg-sand-50 border border-ink/10 rounded-lg text-xs text-ink-lighter mb-4 flex items-start gap-2">
                      <HelpCircle size={14} className="shrink-0 mt-0.5 text-ink-lighter" aria-hidden="true" />
                      <span><strong>Alternative consideration:</strong> {scored.alternativeSuggestion}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <Link to={`/explore/${scored.resource.slug}`} className="btn-primary text-xs py-2 px-4 no-underline !text-white hover:!text-white">
                        Inspect full tool details <ArrowRight size={13} aria-hidden="true" />
                      </Link>
                      {scored.resource.relatedGuides.length > 0 && (
                        <Link to={`/guides/${scored.resource.relatedGuides[0]}`} className="btn-secondary text-xs py-2 px-4 no-underline">
                          Open setup guide
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
          <details className="card bg-sand-50 border-ink/10">
            <summary className="cursor-pointer text-sm font-medium text-ink select-none flex items-center justify-between">
              <span>{result.excluded.length} tool{result.excluded.length !== 1 ? 's' : ''} not recommended for this search</span>
              <span className="text-xs text-teal-600 font-normal">Tap to inspect reasons</span>
            </summary>
            <ul className="mt-3 space-y-2 border-t border-ink/10 pt-3">
              {result.excluded.map(({ resource: r, reasons }) => (
                <li key={r.id} className="text-xs text-ink-lighter">
                  <strong className="text-ink">{r.name}:</strong> {reasons.join('; ')}
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    )
  }

  return (
    <div className="container section max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-ink mb-2">Find the right tool</h1>
        <p className="text-ink-lighter text-sm leading-relaxed">
          Answer 3 quick questions about your distraction problem, daily screen time habits, and devices.
          We provide transparent recommendations grounded in habit theory and verified product data.
        </p>
      </div>

      {/* Step indicators */}
      <div className="flex flex-wrap gap-4 mb-8 pb-4 border-b border-ink/10" role="list" aria-label="Finder steps">
        <div role="listitem"><Step number={1} label="Problem & Habits" active={step === 1} done={step > 1} /></div>
        <div role="listitem"><Step number={2} label="Your Devices" active={step === 2} done={step > 2} /></div>
        <div role="listitem"><Step number={3} label="Intervention & Budget" active={step === 3} done={step > 3} /></div>
      </div>

      {/* Step 1 — Concern & Daily Screen Time */}
      {step === 1 && (
        <div className="animate-fade-in">
          <h2 className="text-xl font-semibold text-ink mb-2">1. What is your primary digital wellness concern?</h2>
          <p className="text-xs text-ink-lighter mb-4">Choose the issue causing the most friction during your college study sessions.</p>
          <div className="space-y-2.5 mb-8" role="group" aria-label="Select your primary concern">
            {concerns.map(c => (
              <button
                key={c.id}
                onClick={() => updateConcern(c.id)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all focus-visible:outline-2 focus-visible:outline-teal-600
                  ${inputs.concern === c.id
                    ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-card'
                    : 'bg-white border-ink/15 text-ink hover:border-teal-300 hover:bg-teal-50/40'
                  }`}
                aria-pressed={inputs.concern === c.id}
              >
                <div className="font-semibold">{concernLabels[c.id]}</div>
                <div className="text-xs text-ink-lighter mt-0.5">{c.desc}</div>
              </button>
            ))}
          </div>

          <h2 className="text-xl font-semibold text-ink mb-2">How much time do you spend on devices daily?</h2>
          <p className="text-xs text-ink-lighter mb-4">Informed by our 12-student study (41.7% spend &gt;10 hrs daily). High screen-time users need stronger friction mechanisms.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
            {usageOptions.map(u => (
              <button
                key={u.id}
                onClick={() => updateDailyUsage(u.id)}
                className={`text-left p-3 rounded-xl border text-xs transition-all focus-visible:outline-2 focus-visible:outline-teal-600
                  ${inputs.dailyUsage === u.id
                    ? 'bg-teal-50 border-teal-500 text-teal-900 font-medium'
                    : 'bg-white border-ink/15 text-ink hover:border-teal-300'
                  }`}
                aria-pressed={inputs.dailyUsage === u.id}
              >
                <div className="font-semibold text-sm">{u.label}</div>
                <div className="text-ink-lighter mt-0.5">{u.subtext}</div>
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={!inputs.concern}
              className="btn-primary !text-white hover:!text-white"
            >
              Next: Select your devices <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2 — Platform */}
      {step === 2 && (
        <div className="animate-fade-in">
          <h2 className="text-xl font-semibold text-ink mb-2">2. Which devices and browsers do you use?</h2>
          <p className="text-sm text-ink-lighter mb-5">Select all that apply. We filter out resources that do not support your setup.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8" role="group" aria-label="Select your platforms">
            {platforms.map(p => (
              <button
                key={p}
                onClick={() => togglePlatform(p)}
                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-teal-600 text-center
                  ${inputs.platforms.includes(p)
                    ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-card'
                    : 'bg-white border-ink/15 text-ink hover:border-teal-300 hover:bg-teal-50/40'
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
            <button onClick={() => setStep(3)} className="btn-primary !text-white hover:!text-white">
              Next: Preferences <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Intervention & Budget */}
      {step === 3 && (
        <div className="animate-fade-in">
          <h2 className="text-xl font-semibold text-ink mb-2">3. Preferred intervention type <span className="text-ink-lighter font-normal text-sm">(optional)</span></h2>
          <p className="text-xs text-ink-lighter mb-4">How do you prefer the tool to interact with your habits?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
            {interventionOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => updateIntervention(opt.id)}
                className={`text-left p-3 rounded-xl border text-xs transition-all focus-visible:outline-2 focus-visible:outline-teal-600
                  ${inputs.interventionType === opt.id
                    ? 'bg-teal-50 border-teal-500 text-teal-900 font-medium'
                    : 'bg-white border-ink/15 text-ink hover:border-teal-300'
                  }`}
                aria-pressed={inputs.interventionType === opt.id}
              >
                <div className="font-semibold text-sm">{opt.label}</div>
                <div className="text-ink-lighter mt-0.5">{opt.desc}</div>
              </button>
            ))}
          </div>

          <h2 className="text-xl font-semibold text-ink mb-2">Budget & Licensing Preferences</h2>
          <div className="space-y-3 mb-8">
            <label className="flex items-center gap-3 p-4 bg-white rounded-xl border border-ink/15 cursor-pointer hover:border-teal-300 hover:bg-teal-50/40 transition-all">
              <input
                type="checkbox"
                className="checkbox shrink-0"
                checked={inputs.budgetFreeOnly}
                onChange={() => setInputs(prev => ({ ...prev, budgetFreeOnly: !prev.budgetFreeOnly }))}
              />
              <div>
                <p className="text-sm font-medium text-ink">Free only (No cost)</p>
                <p className="text-xs text-ink-lighter">Show only 100% free or open-source tools with no paywalled essentials</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-4 bg-white rounded-xl border border-ink/15 cursor-pointer hover:border-teal-300 hover:bg-teal-50/40 transition-all">
              <input
                type="checkbox"
                className="checkbox shrink-0"
                checked={inputs.preferOpenSource}
                onChange={() => setInputs(prev => ({ ...prev, preferOpenSource: !prev.preferOpenSource }))}
              />
              <div>
                <p className="text-sm font-medium text-ink">Prefer open source</p>
                <p className="text-xs text-ink-lighter">Prioritise tools whose source code is publicly auditable and transparent</p>
              </div>
            </label>
          </div>

          <div className="flex justify-between gap-3">
            <button onClick={() => setStep(2)} className="btn-secondary flex items-center gap-2">
              <ChevronLeft size={16} aria-hidden="true" /> Back
            </button>
            <button onClick={handleShowResults} className="btn-primary !text-white hover:!text-white">
              Show my recommendations <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
