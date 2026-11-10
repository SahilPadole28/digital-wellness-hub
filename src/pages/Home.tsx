import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Target, Moon, Shield, Search, ChevronRight } from 'lucide-react'
import { resources, categories } from '../data/resources'
import { ToolCard } from '../components/ToolCard'

const featuredIds = ['ios-screen-time', 'leechblock-ng', 'ios-sleep-focus', 'ublock-origin']
const featuredResources = resources.filter(r => featuredIds.includes(r.id))

const categoryIcons = { 'screen-time': Clock, focus: Target, sleep: Moon, privacy: Shield }

export default function Home() {
  useEffect(() => {
    document.title = 'Digital Wellness Hub — Find Tools for Healthier Digital Habits'
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-ink/5">
        <div className="container section">
          <div className="max-w-2xl">
            {/* Disclaimer pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 rounded-full text-xs text-teal-700 font-medium mb-6">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" aria-hidden="true" />
              Educational resource — not medical advice
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold text-ink mb-6 text-balance">
              Take back your attention.{' '}
              <span className="text-teal-600">One tool at a time.</span>
            </h1>
            <p className="text-lg text-ink-lighter mb-8 max-w-prose">
              A curated guide for college students dealing with smartphone distraction, trouble
              concentrating, notification overload, poor sleep habits, and privacy concerns.
              We help you <strong>choose</strong> the right tool and <strong>set it up</strong> —
              not just show you a list of links.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/find" className="btn-primary text-base px-6 py-3 !text-white hover:!text-white">
                Find the right tool <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/explore" className="btn-secondary text-base px-6 py-3">
                Browse all tools
              </Link>
            </div>

            {/* Privacy note */}
            <p className="text-xs text-ink-lighter">
              🔒 No accounts. No tracking. No cookies. Your choices stay on your device.{' '}
              <Link to="/privacy">Learn more about how this site works.</Link>
            </p>
          </div>
        </div>
      </section>

      {/* How this hub works */}
      <section className="bg-sand-50 border-b border-ink/5">
        <div className="container py-14">
          <h2 className="text-2xl font-semibold text-ink mb-2">How this hub works</h2>
          <p className="text-ink-lighter mb-10">Three steps to healthier digital habits.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Tell us your problem',
                desc: 'Answer a few questions about what\'s bothering you — too much scrolling, trouble focusing, poor sleep, privacy worries.',
                cta: { to: '/find', label: 'Start the finder' },
              },
              {
                step: '2',
                title: 'Compare your options',
                desc: 'See purpose, cost, platform support, privacy requirements and limitations side by side. No surprises.',
                cta: { to: '/compare', label: 'Open Compare' },
              },
              {
                step: '3',
                title: 'Follow a setup guide',
                desc: 'Student-written, step-by-step guides with numbered instructions and screenshot slots for each key step.',
                cta: { to: '/guides', label: 'View guides' },
              },
            ].map(({ step, title, desc, cta }) => (
              <div key={step} className="card flex flex-col gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white text-sm font-bold flex items-center justify-center shrink-0" aria-hidden="true">
                  {step}
                </div>
                <h3 className="text-base font-semibold text-ink">{title}</h3>
                <p className="text-sm text-ink-lighter flex-1">{desc}</p>
                <Link to={cta.to} className="inline-flex items-center gap-1 text-sm text-teal-600 font-medium no-underline hover:text-teal-700 mt-2">
                  {cta.label} <ChevronRight size={14} aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b border-ink/5">
        <div className="container section">
          <h2 className="text-2xl font-semibold text-ink mb-2">Four areas of digital wellness</h2>
          <p className="text-ink-lighter mb-10">
            We cover {resources.length} tools across four categories — all verified, all honest about cost and limitations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.id]
              const count = resources.filter(r => r.category === cat.id).length
              return (
                <Link
                  key={cat.id}
                  to={`/explore?cat=${cat.id}`}
                  className="card-hover flex flex-col gap-3 no-underline group"
                  aria-label={`${cat.label}: ${cat.description} — ${count} tools`}
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                    <Icon size={18} className="text-teal-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-ink mb-1">{cat.label}</h3>
                    <p className="text-xs text-ink-lighter leading-relaxed">{cat.description}</p>
                  </div>
                  <span className="text-xs font-medium text-teal-600 mt-auto">{count} tools →</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured tools */}
      <section className="bg-sand-50">
        <div className="container section">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl font-semibold text-ink mb-2">Featured tools</h2>
              <p className="text-ink-lighter">One pick from each category — verified and annotated.</p>
            </div>
            <Link to="/explore" className="btn-secondary text-sm shrink-0">
              <Search size={14} aria-hidden="true" />
              Browse all {resources.length}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {featuredResources.map((resource) => (
              <ToolCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </section>

      {/* Educational disclaimer */}
      <section className="bg-white border-t border-ink/5">
        <div className="container py-10">
          <div className="max-w-reading bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h2 className="text-base font-semibold text-amber-800 mb-2">A note about evidence and advice</h2>
            <p className="text-sm text-amber-700 leading-relaxed">
              This hub is an educational resource for a Digital Wellness college project. Tool
              information is verified against official sources as of the dates shown. Scientific
              claims are labelled with evidence levels. <strong>This is not medical advice.</strong>{' '}
              If you have serious concerns about sleep, mental health, or technology addiction, please
              consult a qualified healthcare professional.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

