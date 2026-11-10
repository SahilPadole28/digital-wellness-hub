import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Shield, AlertTriangle } from 'lucide-react'

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy — Digital Wellness Hub'
  }, [])

  return (
    <div className="container section max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="text-teal-600" size={28} aria-hidden="true" />
        <h1 className="text-3xl font-semibold text-ink">Privacy</h1>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8">
        <p className="text-green-800 font-medium text-sm mb-1">The short version:</p>
        <p className="text-green-700 text-sm">
          This website collects <strong>no personal data</strong>. No accounts. No cookies.
          No analytics. No third-party scripts. No tracking of any kind.
        </p>
      </div>

      <article className="prose-custom space-y-8">
        <section aria-labelledby="data-heading">
          <h2 id="data-heading" className="text-xl font-semibold text-ink mb-3">What data we collect</h2>
          <p>None. This site does not collect, store, or transmit any personal data.</p>
          <ul className="list-disc list-inside space-y-1 text-ink-light text-sm">
            <li>No registration or login</li>
            <li>No cookies (tracking or functional)</li>
            <li>No analytics scripts (no Google Analytics, no Plausible, no Fathom)</li>
            <li>No third-party embeds (no CDN-loaded scripts, no YouTube embeds, no social widgets)</li>
            <li>No contact forms or feedback forms that transmit data to a server</li>
          </ul>
        </section>

        <section aria-labelledby="how-heading">
          <h2 id="how-heading" className="text-xl font-semibold text-ink mb-3">How the site works</h2>
          <p>
            This is a fully static website. All pages, data and scripts are delivered as plain files
            (HTML, CSS, JavaScript) from a static hosting service. There is no server-side processing,
            no database, and no backend that could receive your data.
          </p>
          <p>
            The Find My Tool wizard and Compare tool use your browser's URL parameters to store
            and share your selections. This data lives entirely in your browser and in the URL
            you share — it is never sent to any server.
          </p>
        </section>

        <section aria-labelledby="fonts-heading">
          <h2 id="fonts-heading" className="text-xl font-semibold text-ink mb-3">Fonts and assets</h2>
          <p>
            The Inter typeface used on this site is served from the same static host as the rest
            of the site — not from Google Fonts or any external CDN. No request is made to
            third-party servers for fonts or icons.
          </p>
        </section>

        <section aria-labelledby="links-heading">
          <h2 id="links-heading" className="text-xl font-semibold text-ink mb-3">External links</h2>
          <p>
            This site links to third-party websites (official tool sites, documentation, research papers).
            When you click those links, you leave this site and are subject to the privacy practices
            of those external sites. All external links are clearly marked and open in a new tab.
          </p>
        </section>

        <section aria-labelledby="hosting-heading">
          <h2 id="hosting-heading" className="text-xl font-semibold text-ink mb-3">Hosting</h2>
          <p>
            This site is intended to be deployed to a static hosting service (GitHub Pages, Netlify,
            or Vercel). Those services may collect server logs (IP addresses, timestamps) for
            infrastructure purposes in accordance with their own privacy policies. No application-level
            data collection is implemented.
          </p>
        </section>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 not-prose">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0" aria-hidden="true" />
            <p className="text-xs text-amber-700">
              <strong>Educational disclaimer:</strong> This hub is a college student project
              for a Digital Wellness course. It is not medical advice, not a commercial product,
              and not affiliated with any of the tools reviewed.
            </p>
          </div>
        </div>
      </article>

      <div className="mt-10 pt-6 border-t border-ink/10">
        <Link to="/about" className="text-sm text-teal-600 hover:text-teal-700">← Back to About</Link>
      </div>
    </div>
  )
}

