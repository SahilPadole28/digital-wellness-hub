import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { resources } from '../data/resources'
import { guides } from '../data/guides'
import { CheckCircle, AlertTriangle } from 'lucide-react'

export default function ProjectEvidence() {
  useEffect(() => {
    document.title = 'Project Evidence — Digital Wellness Hub'
  }, [])

  return (
    <div className="container section max-w-4xl">
      <h1 className="text-3xl font-semibold text-ink mb-3">Project Evidence</h1>
      <p className="text-ink-lighter mb-2">
        Submission evidence items for Project 3 — Digital Wellness Resource Hub.
        Generated 2026-11-09. Items marked 🔲 require student action before submission.
      </p>
      <p className="text-sm text-ink-lighter mb-10">
        See <code>/docs/</code> in the project repository for all template files.
      </p>

      {/* Evidence item list */}
      <div className="space-y-6">

        {/* R10a: Website link */}
        <section className="card" aria-labelledby="ev-website">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} aria-hidden="true" />
            <div>
              <h2 id="ev-website" className="text-base font-semibold text-ink mb-1">Website link</h2>
              <p className="text-sm text-ink-lighter mb-2">🔲 Needs student action: deploy this site to GitHub Pages, Netlify or Vercel using the README instructions, then record the URL here.</p>
              <p className="text-xs text-ink-lighter">Deploy command: <code>npm run build</code> then follow <code>/README.md</code> deploy instructions.</p>
            </div>
          </div>
        </section>

        {/* R10b: Resource comparison */}
        <section className="card" aria-labelledby="ev-compare">
          <div className="flex items-start gap-3">
            <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={18} aria-hidden="true" />
            <div className="flex-1">
              <h2 id="ev-compare" className="text-base font-semibold text-ink mb-1">Resource comparison matrix</h2>
              <p className="text-sm text-ink-lighter mb-3">✅ All {resources.length} tools with full comparison criteria. Live on the Compare page.</p>
              <div className="overflow-x-auto">
                <table className="text-xs w-full border-collapse">
                  <caption className="sr-only">Resource comparison summary</caption>
                  <thead>
                    <tr className="bg-sand-100">
                      <th className="text-left p-2 font-semibold text-ink border border-ink/10">Tool</th>
                      <th className="text-left p-2 font-semibold text-ink border border-ink/10">Category</th>
                      <th className="text-left p-2 font-semibold text-ink border border-ink/10">Cost</th>
                      <th className="text-left p-2 font-semibold text-ink border border-ink/10">Platforms</th>
                      <th className="text-left p-2 font-semibold text-ink border border-ink/10">Acct?</th>
                      <th className="text-left p-2 font-semibold text-ink border border-ink/10">Verified</th>
                      <th className="text-left p-2 font-semibold text-ink border border-ink/10">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resources.map(r => {
                      const models = Array.isArray(r.cost.model) ? r.cost.model : [r.cost.model]
                      return (
                        <tr key={r.id} className="border-b border-ink/5 hover:bg-sand-50">
                          <td className="p-2 border border-ink/5 font-medium text-ink">
                            <Link to={`/explore/${r.slug}`} className="text-teal-600 no-underline hover:underline">{r.name}</Link>
                          </td>
                          <td className="p-2 border border-ink/5 text-ink-lighter capitalize">{r.category}</td>
                          <td className="p-2 border border-ink/5 text-ink-lighter">{models.join(', ')}</td>
                          <td className="p-2 border border-ink/5 text-ink-lighter">{r.platforms.slice(0,3).join(', ')}{r.platforms.length > 3 ? '…' : ''}</td>
                          <td className="p-2 border border-ink/5 text-ink-lighter">{r.privacy.accountRequired ? 'Yes' : 'No'}</td>
                          <td className="p-2 border border-ink/5 text-ink-lighter">{r.verifiedOn}</td>
                          <td className="p-2 border border-ink/5">
                            {r.verificationStatus.overall === 'verified'
                              ? <span className="text-green-600">✓</span>
                              : <span className="text-amber-600">⚠</span>
                            }
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* R10c: Sources log */}
        <section className="card" aria-labelledby="ev-sources">
          <div className="flex items-start gap-3">
            <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={18} aria-hidden="true" />
            <div className="flex-1">
              <h2 id="ev-sources" className="text-base font-semibold text-ink mb-1">Source links & verification dates</h2>
              <p className="text-sm text-ink-lighter mb-3">✅ All sources documented in resource data with dates. Summary below.</p>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {resources.flatMap(r =>
                  r.sources.map(s => (
                    <div key={s.url} className="flex items-start gap-2 text-xs">
                      <span className="text-ink-lighter shrink-0 w-24">{s.checkedOn}</span>
                      <span className="text-ink font-medium shrink-0 w-32 truncate">{r.name}</span>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 truncate"
                        aria-label={`${s.title} for ${r.name} (opens in new tab)`}
                      >
                        {s.title}
                      </a>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* R10d: Guides */}
        <section className="card" aria-labelledby="ev-guides">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} aria-hidden="true" />
            <div>
              <h2 id="ev-guides" className="text-base font-semibold text-ink mb-1">Setup guides ({guides.length} of 3 required)</h2>
              <p className="text-sm text-ink-lighter mb-3">⚠️ Structure complete. Screenshots and final authorship need student action.</p>
              <div className="space-y-2">
                {guides.map(g => (
                  <div key={g.id} className="flex items-center gap-3 text-sm">
                    <AlertTriangle size={14} className="text-amber-500 shrink-0" aria-hidden="true" />
                    <span className="text-ink">{g.title}</span>
                    <Link to={`/guides/${g.slug}`} className="text-teal-600 text-xs ml-auto no-underline hover:underline">View draft →</Link>
                  </div>
                ))}
              </div>
              <p className="text-xs text-ink-lighter mt-3">See <code>/docs/SCREENSHOT_GUIDE.md</code> for how to capture privacy-safe screenshots.</p>
            </div>
          </div>
        </section>

        {/* R10e: Link test */}
        <section className="card" aria-labelledby="ev-links">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} aria-hidden="true" />
            <div>
              <h2 id="ev-links" className="text-base font-semibold text-ink mb-1">Link test record</h2>
              <p className="text-sm text-ink-lighter mb-2">⚠️ Script ready. Run <code>npm run check:links</code> to generate <code>/docs/LINK_TEST_RECORD.md</code>. Manual confirmation column needs student review.</p>
              <p className="text-xs text-ink-lighter">External links in this site: {resources.length * 2 + guides.length} approximately (resource official URLs + source URLs).</p>
            </div>
          </div>
        </section>

        {/* R10f: Accessibility checklist */}
        <section className="card" aria-labelledby="ev-a11y">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} aria-hidden="true" />
            <div>
              <h2 id="ev-a11y" className="text-base font-semibold text-ink mb-1">Accessibility checklist</h2>
              <p className="text-sm text-ink-lighter mb-2">⚠️ Template ready in <code>/docs/ACCESSIBILITY_CHECKLIST.md</code>. Students must complete the manual testing columns.</p>
              <p className="text-xs text-ink-lighter">Built-in: skip link, aria-live announcements, focus-visible styles, semantic landmarks, alt text framework, keyboard navigation, 44px touch targets, reduced-motion support.</p>
            </div>
          </div>
        </section>

        {/* R10g: User feedback */}
        <section className="card" aria-labelledby="ev-feedback">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} aria-hidden="true" />
            <div>
              <h2 id="ev-feedback" className="text-base font-semibold text-ink mb-1">Anonymised user feedback</h2>
              <p className="text-sm text-ink-lighter">🔲 Needs student action: conduct usability testing with 3–5 students. Template: <code>/docs/USER_FEEDBACK_TEMPLATE.md</code> and <code>/docs/USABILITY_TESTING_PROTOCOL.md</code>.</p>
            </div>
          </div>
        </section>

        {/* R10h: Revisions */}
        <section className="card" aria-labelledby="ev-changes">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} aria-hidden="true" />
            <div>
              <h2 id="ev-changes" className="text-base font-semibold text-ink mb-1">Revisions log</h2>
              <p className="text-sm text-ink-lighter">🔲 Needs student action: record issues found during testing and revisions made. Template: <code>/docs/CHANGE_LOG_TEMPLATE.md</code>.</p>
            </div>
          </div>
        </section>

        {/* R10i: Report */}
        <section className="card" aria-labelledby="ev-report">
          <div className="flex items-start gap-3">
            <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={18} aria-hidden="true" />
            <div>
              <h2 id="ev-report" className="text-base font-semibold text-ink mb-1">Report</h2>
              <p className="text-sm text-ink-lighter">✅ Outline ready in <code>/docs/REPORT_OUTLINE.md</code>. 🔲 Students must write the actual report.</p>
            </div>
          </div>
        </section>

        {/* R10j: Presentation */}
        <section className="card" aria-labelledby="ev-pres">
          <div className="flex items-start gap-3">
            <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={18} aria-hidden="true" />
            <div>
              <h2 id="ev-pres" className="text-base font-semibold text-ink mb-1">Presentation</h2>
              <p className="text-sm text-ink-lighter">✅ Slide outline ready in <code>/docs/PRESENTATION_OUTLINE.md</code>. 🔲 Students must create the actual slides.</p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-10 pt-6 border-t border-ink/10">
        <Link to="/about" className="text-sm text-teal-600 hover:text-teal-700">← Back to About</Link>
      </div>
    </div>
  )
}

