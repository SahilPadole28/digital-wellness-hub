import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { concepts } from '../data/concepts'

export default function About() {
  useEffect(() => {
    document.title = 'About — Digital Wellness Hub'
  }, [])

  return (
    <div className="container section max-w-3xl">
      <h1 className="text-3xl font-semibold text-ink mb-3">About this hub</h1>
      <p className="text-lg text-ink-lighter mb-10">
        A curated digital wellness resource hub built as Project 3 of the Digital Wellness course.
      </p>

      {/* Purpose */}
      <section className="mb-12" aria-labelledby="purpose-heading">
        <h2 id="purpose-heading" className="text-2xl font-semibold text-ink mb-4">Purpose & educational objectives</h2>
        <div className="prose-custom">
          <p>
            This hub is designed to help college students make <em>informed choices</em> about digital
            wellness tools — not just provide a list of links. For each tool, we document purpose,
            cost, platform support, privacy requirements, accessibility notes, limitations, and
            the evidence-based rationale connecting the tool to course concepts.
          </p>
          <p>
            Educational objectives:
          </p>
        </div>
        <ul className="list-disc list-inside space-y-1 text-sm text-ink-light mt-3">
          <li>Help students identify digital wellness tools suited to their specific problems</li>
          <li>Teach critical evaluation of tool claims (cost, privacy, effectiveness)</li>
          <li>Connect practical tools to course concepts (habit inversion, attention economy, sleep hygiene)</li>
          <li>Build research and verification skills through the tool-research methodology</li>
        </ul>
      </section>

      {/* Audience needs placeholder */}
      <section className="mb-12 bg-amber-50 border border-amber-200 rounded-xl p-6" aria-labelledby="audience-heading">
        <h2 id="audience-heading" className="text-xl font-semibold text-amber-800 mb-3">Student audience & needs</h2>
        <p className="text-sm text-amber-700 mb-3">
          <strong>🔲 Needs student action:</strong> This section is a placeholder. The team should conduct the
          student needs discussion activity (see <code>/docs/STUDENT_NEEDS_DISCUSSION_TEMPLATE.md</code>)
          and replace this block with real findings before submission.
        </p>
        <div className="bg-white rounded-lg p-4 text-sm text-ink-light space-y-2">
          <p><strong>Audience:</strong> College students (undergraduate/postgraduate) in a Digital Wellness course.</p>
          <p><strong>Draft identified needs</strong> (to be confirmed by student discussion activity):</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Difficulty limiting screen time and social media scrolling</li>
            <li>Trouble concentrating during study sessions due to notifications</li>
            <li>Poor pre-sleep device habits affecting sleep quality</li>
            <li>Privacy concerns about data collection by apps and platforms</li>
            <li>Difficulty finding trustworthy, clearly-explained tool information</li>
          </ul>
          <p className="text-amber-700 text-xs mt-3">Replace this block with real discussion findings before evaluation.</p>
        </div>
      </section>

      {/* Methodology */}
      <section className="mb-12" aria-labelledby="method-heading">
        <h2 id="method-heading" className="text-2xl font-semibold text-ink mb-4">Methodology: how tools were chosen and verified</h2>
        <div className="prose-custom">
          <p>
            Tools were selected from the course shortlist and supplemented by research to reach
            12 tools across 4 categories, with a mix of free, freemium, paid, and open-source options.
            Each tool was verified against its official website and documentation on <strong>2026-11-09</strong>.
          </p>
          <p>Verification process for each tool:</p>
        </div>
        <ol className="list-decimal list-inside space-y-1 text-sm text-ink-light mt-3">
          <li>Official URL confirmed active and correct</li>
          <li>Platform support verified against official download/documentation pages</li>
          <li>Cost model verified — free-tier limitations and paid features explicitly documented</li>
          <li>Privacy policy URL recorded; account requirements confirmed</li>
          <li>Accessibility notes sourced from official accessibility documentation where available</li>
          <li>Limitations sourced from official documentation, known issues, or verified third-party reviews</li>
          <li>Items not confirmable within the verification window marked <code>needs_manual_verification</code></li>
        </ol>
      </section>

      {/* Sources */}
      <section className="mb-12" aria-labelledby="sources-heading">
        <h2 id="sources-heading" className="text-2xl font-semibold text-ink mb-4">Key sources & references</h2>
        <div className="prose-custom">
          <p>Scientific sources used in the Learn section are cited on individual concept pages with
          evidence-level labels. Tool information sources are documented per-tool on each tool's
          detail page and in <Link to="/project-evidence">the project evidence page</Link>.</p>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {concepts.flatMap(c => c.sources.slice(0,1)).slice(0,6).map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover text-teal-600 hover:text-teal-700 no-underline text-xs p-3 block"
              aria-label={`${s.title} (opens in new tab)`}
            >
              {s.authors && <span className="text-ink-lighter block">{s.authors}{s.year ? ` (${s.year})` : ''}</span>}
              {s.title}
            </a>
          ))}
        </div>
      </section>

      {/* AI Acknowledgement */}
      <section className="mb-12 bg-sand-100 rounded-xl p-6" aria-labelledby="ai-heading">
        <h2 id="ai-heading" className="text-xl font-semibold text-ink mb-3">AI assistance acknowledgement</h2>
        <p className="text-sm text-ink-light leading-relaxed mb-3">
          This website's initial structure, component architecture, data schemas, and documentation
          templates were generated with the assistance of <strong>Antigravity AI (Google DeepMind)</strong>
          as a coding assistant. The AI helped scaffold the codebase and produce initial drafts of
          tool descriptions, guide text, and concept content — all of which were marked as DRAFT
          for student review and verification.
        </p>
        <p className="text-sm text-ink-light leading-relaxed mb-3">
          <strong>What the AI did:</strong> Generated React/TypeScript code, Tailwind CSS design system,
          data files with tool information sourced from official documentation, concept explanations
          based on provided course context, guide step drafts from official Apple/Google/vendor docs.
        </p>
        <p className="text-sm text-ink-light leading-relaxed mb-3">
          <strong>What students must do (and are responsible for):</strong> Verify all tool
          information against official sources, write final guide text from their own device testing,
          capture real screenshots, run the student needs discussion, conduct usability testing,
          complete the accessibility checklist, write the final report and presentation. All submitted
          work represents the team's own understanding and verification.
        </p>
        
      </section>

      {/* Tools & software used */}
      <section className="mb-12" aria-labelledby="tech-heading">
        <h2 id="tech-heading" className="text-2xl font-semibold text-ink mb-4">Tools & software acknowledgements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {[
            { name: 'React 18', role: 'UI framework', url: 'https://react.dev', license: 'MIT' },
            { name: 'Vite 5', role: 'Build tool', url: 'https://vitejs.dev', license: 'MIT' },
            { name: 'TypeScript 5', role: 'Type safety', url: 'https://www.typescriptlang.org', license: 'Apache 2.0' },
            { name: 'Tailwind CSS 3', role: 'Utility CSS', url: 'https://tailwindcss.com', license: 'MIT' },
            { name: 'React Router 6', role: 'Client-side routing', url: 'https://reactrouter.com', license: 'MIT' },
            { name: 'Lucide React', role: 'Icon set', url: 'https://lucide.dev', license: 'ISC' },
            { name: 'Inter (via @fontsource)', role: 'Self-hosted typeface', url: 'https://rsms.me/inter/', license: 'SIL OFL 1.1' },
            { name: 'Vitest', role: 'Unit testing', url: 'https://vitest.dev', license: 'MIT' },
          ].map(t => (
            <div key={t.name} className="card py-3 px-4 flex items-center justify-between gap-2">
              <div>
                <a href={t.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-teal-600 no-underline hover:underline">
                  {t.name}
                </a>
                <p className="text-xs text-ink-lighter">{t.role}</p>
              </div>
              <span className="badge bg-sand-100 text-ink-lighter border-ink/10 text-xs">{t.license}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="pt-6 border-t border-ink/10 flex flex-wrap gap-4 text-sm">
        <Link to="/privacy" className="text-teal-600 hover:text-teal-700">Privacy policy</Link>
        <Link to="/project-evidence" className="text-teal-600 hover:text-teal-700">Project evidence</Link>
        <Link to="/explore" className="text-teal-600 hover:text-teal-700">Browse tools</Link>
      </div>
    </div>
  )
}

