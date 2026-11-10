import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArrowLeft, Clock, AlertTriangle, CheckCircle } from 'lucide-react'
import { getGuideBySlug } from '../data/guides'
import { EvidenceBadge } from '../components/EvidenceBadge'
import { ScreenshotSlot } from '../components/ScreenshotSlot'
import { concepts } from '../data/concepts'
import type { EvidenceLevel } from '../data/concepts'

function mapEvidenceLabel(label: string): EvidenceLevel {
  if (label.includes('Well')) return 'well_supported'
  if (label.includes('simplified')) return 'supported_simplified'
  if (label.includes('Mixed')) return 'mixed_limited'
  return 'philosophical_framework'
}

export default function GuideDetail() {
  const { slug } = useParams<{ slug: string }>()
  const guide = slug ? getGuideBySlug(slug) : undefined
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    if (guide) document.title = `${guide.title} — Digital Wellness Hub`
  }, [guide])

  if (!guide) return <Navigate to="/guides" replace />

  const relatedConcepts = guide.courseConceptIds.map(id => concepts.find(c => c.id === id)).filter(Boolean)
  const activePlatform = guide.platforms[activeTab]

  return (
    <div className="container section max-w-3xl">
      {/* Back */}
      <Link to="/guides" className="inline-flex items-center gap-2 text-sm text-ink-lighter hover:text-ink mb-6 no-underline group">
        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
        Back to Guides
      </Link>

      {/* Draft banner */}
      {guide.status === 'draft' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-sm font-medium text-amber-800 mb-1">🚧 Draft guide — student review required</p>
          <p className="text-sm text-amber-700">{guide.draftNote}</p>
        </div>
      )}

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-ink mb-3">{guide.title}</h1>
        <p className="text-lg text-ink-lighter mb-4">{guide.tagline}</p>

        <div className="flex flex-wrap gap-3 text-xs text-ink-lighter">
          <span className="flex items-center gap-1">
            <Clock size={12} aria-hidden="true" /> {guide.estimatedTime}
          </span>
          <EvidenceBadge level={mapEvidenceLabel(guide.evidenceLabel)} />
          <span>Written by: <strong>{guide.writtenBy}</strong></span>
        </div>
      </header>

      {/* What it accomplishes */}
      <section className="mb-8" aria-labelledby="accomplish-heading">
        <h2 id="accomplish-heading" className="text-xl font-semibold text-ink mb-3">What this guide accomplishes</h2>
        <p className="text-ink-light leading-relaxed">{guide.whatItAccomplishes}</p>
      </section>

      {/* Why it matters */}
      <section className="mb-8 bg-teal-50 rounded-xl p-6 border border-teal-100" aria-labelledby="why-matters-heading">
        <h2 id="why-matters-heading" className="text-base font-semibold text-ink mb-2">Why this matters</h2>
        <p className="text-sm text-ink-light leading-relaxed mb-4">{guide.whyItMatters}</p>
        {relatedConcepts.length > 0 && (
          <div>
            <p className="text-xs font-medium text-ink-lighter mb-2">Related concepts:</p>
            <div className="flex flex-wrap gap-2">
              {relatedConcepts.map(c => c && (
                <Link
                  key={c.id}
                  to={`/learn/${c.slug}`}
                  className="text-xs text-teal-700 bg-white border border-teal-200 rounded px-2 py-1 no-underline hover:bg-teal-100 transition-colors"
                >
                  {c.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Platform tabs */}
      {guide.platforms.length > 1 && (
        <div className="mb-6">
          <div className="flex border-b border-ink/10" role="tablist" aria-label="Choose your platform">
            {guide.platforms.map((p, i) => (
              <button
                key={p.platform}
                role="tab"
                aria-selected={activeTab === i}
                aria-controls={`panel-${p.platform}`}
                id={`tab-${p.platform}`}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px
                  ${activeTab === i
                    ? 'border-teal-600 text-teal-600'
                    : 'border-transparent text-ink-lighter hover:text-ink hover:border-ink/20'
                  }`}
              >
                {p.platform}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active platform content */}
      <div
        id={`panel-${activePlatform.platform}`}
        role={guide.platforms.length > 1 ? 'tabpanel' : undefined}
        aria-labelledby={guide.platforms.length > 1 ? `tab-${activePlatform.platform}` : undefined}
      >
        <div className="mb-6">
          <p className="text-sm font-medium text-ink mb-1">Platform: {activePlatform.platform} {activePlatform.osVersion}</p>
        </div>

        {/* Prerequisites */}
        <section className="mb-8" aria-labelledby="prereq-heading">
          <h2 id="prereq-heading" className="text-lg font-semibold text-ink mb-3">Prerequisites</h2>
          <ul className="space-y-2">
            {activePlatform.prerequisites.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink-light">
                <CheckCircle size={16} className="text-teal-500 mt-0.5 shrink-0" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </section>

        {/* Steps */}
        <section className="mb-8" aria-labelledby="steps-heading">
          <h2 id="steps-heading" className="text-lg font-semibold text-ink mb-5">Step-by-step instructions</h2>
          <ol className="space-y-10" aria-label="Setup steps">
            {activePlatform.steps.map((step) => (
              <li key={step.stepNumber} className="flex gap-5">
                <div className="shrink-0">
                  <div
                    className="w-8 h-8 rounded-full bg-teal-600 text-white text-sm font-bold flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {step.stepNumber}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-ink mb-2">
                    Step {step.stepNumber}: {step.title}
                  </h3>
                  <p className="text-sm text-ink-light leading-relaxed mb-4">{step.description}</p>
                  <ScreenshotSlot
                    guideId={guide.id}
                    stepFile={step.screenshotFile}
                    alt={step.screenshotAlt}
                    stepNumber={step.stepNumber}
                  />
                  {step.note && (
                    <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2 mt-2">
                      ⚠ {step.note}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Expected outcome */}
        <section className="mb-8 bg-green-50 rounded-xl p-5 border border-green-100" aria-labelledby="outcome-heading">
          <h2 id="outcome-heading" className="text-base font-semibold text-green-800 mb-2">Expected outcome</h2>
          <p className="text-sm text-green-700 leading-relaxed">{guide.expectedOutcome}</p>
        </section>

        {/* Troubleshooting */}
        <section className="mb-8" aria-labelledby="trouble-heading">
          <h2 id="trouble-heading" className="text-lg font-semibold text-ink mb-3">Troubleshooting</h2>
          <ul className="space-y-3">
            {activePlatform.troubleshooting.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink-light bg-sand-50 rounded-lg p-3">
                <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </section>

        {/* Limitations */}
        <section className="mb-8" aria-labelledby="limits-heading">
          <h2 id="limits-heading" className="text-lg font-semibold text-ink mb-3">Limitations & exceptions</h2>
          <ul className="space-y-2">
            {guide.limitations.map((l, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink-light">
                <AlertTriangle size={14} className="text-amber-500 mt-1 shrink-0" aria-hidden="true" />
                {l}
              </li>
            ))}
          </ul>
        </section>

        {/* Metadata */}
        <section className="bg-sand-100 rounded-xl p-5 text-xs text-ink-lighter space-y-1" aria-label="Guide metadata">
          <p><strong>Last tested on:</strong> {activePlatform.lastTestedOn}</p>
          <p><strong>Device/OS:</strong> {activePlatform.lastTestedDevice}</p>
          <p><strong>Written by:</strong> {guide.writtenBy}</p>
          <p className="mt-2 text-amber-700">
            ⚠ If "DRAFT" fields appear above, the student author must complete them before submission.
          </p>
        </section>
      </div>

      {/* Not medical advice reminder */}
      <div className="mt-10 bg-amber-50 border border-amber-200 rounded-xl p-5">
        <p className="text-xs text-amber-800">
          <strong>Reminder:</strong> This guide is an educational resource. If you have ongoing sleep difficulties,
          concentration problems or concerns about technology addiction that significantly affect your daily life,
          please consult a qualified healthcare professional.
        </p>
      </div>
    </div>
  )
}

