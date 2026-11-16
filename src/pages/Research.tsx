import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  CheckCircle2,
  Clock,
  Bell,
  Smartphone,
  HelpCircle,
  Filter,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import {
  studentResponses,
  habitStatistics,
  implementedImprovements
} from '../data/studentResearch'

export default function Research() {
  const [filterStruggle, setFilterStruggle] = useState<string>('all')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)

  useEffect(() => {
    document.title = 'Student Research & Usability Testing — Digital Wellness Hub'
  }, [])

  const filteredResponses = studentResponses.filter(s => {
    if (filterStruggle === 'all') return true
    return s.struggleScreenTime.toLowerCase() === filterStruggle.toLowerCase()
  })

  const faqs = [
    {
      q: 'Why can students easily bypass built-in Screen Time and Digital Wellbeing limits?',
      a: 'Both Apple Screen Time and Android Digital Wellbeing are designed for self-regulation rather than coercive blocking. By default, iOS provides an "Ignore Limit (15 minutes)" prompt, and Android offers "Ignore for today." To create genuine friction, students can set a Screen Time Passcode known only to an accountability partner, or use third-party tools like LeechBlock NG or one sec that introduce conscious breathing delays or strict password-protected lockouts.',
    },
    {
      q: 'Does blue light from laptops and phones actually destroy sleep quality?',
      a: 'The scientific evidence shows blue light modestly suppresses nighttime melatonin release, but the effect is often overstated. Psychological arousal from engaging, stressful, or algorithmically engaging content (social media arguments, endless video feeds) has a far greater impact on sleep onset latency than screen color temperature alone. Using Night Shift or f.lux helps eye comfort, but setting a scheduled Wind Down and putting the device face down remains the primary intervention.',
    },
    {
      q: 'Which tool is best for uninterrupted study sessions?',
      a: 'For desktop browser studying, LeechBlock NG is the most powerful free, open-source tool for scheduling strict site blocks without subscription paywalls. For mobile studying, Forest provides a tangible visual commitment mechanism (growing a tree that withers if you exit the app), while Focus Mode in Android Digital Wellbeing or iOS Sleep Focus silences distracting app notifications with one tap.',
    },
    {
      q: 'Is a paid app like Forest worth it over free built-in Screen Time controls?',
      a: 'Forest costs $3.99 on iOS (free with ads on Android). Built-in iOS Screen Time is 100% free and native, but lacks gamification or loss aversion. Students who need active psychological commitment often find Forest\'s tree-withering mechanic motivating, whereas students who need passive structural rules benefit more from built-in App Limits combined with a Screen Time passcode.',
    },
    {
      q: 'How can I stop notification disruptions during study without missing emergency family calls?',
      a: 'Use Focus Mode (iOS) or Do Not Disturb (Android). Navigate to Settings → Focus/DND → People → Allow Calls From, and select "Starred Contacts" or "Favorites" only. Also enable "Allow Repeated Calls." This allows urgent phone calls to ring through while permanently silencing routine social media pings, group chats, and email previews.',
    },
    {
      q: 'What is the difference between tracker blocking (uBlock Origin) and private search (DuckDuckGo)?',
      a: 'uBlock Origin is a browser extension that actively strips tracking scripts, ads, and telemetry beacon requests embedded inside web pages you visit. DuckDuckGo is a private search engine and privacy-first browser that does not record your search queries or tie your search history to an advertising identity. Combining both provides defense-in-depth against corporate behavioral profiling.',
    },
    {
      q: 'How does habit inversion (from the course syllabus) relate to these digital tools?',
      a: 'Patanjali\'s concept of Chitta Bhumi describes minds shifting from Kshipta (scattered, hyper-reactive) toward Ekagra (one-pointed concentration). Habit inversion theory (cue control) operationalizes this: rather than fighting temptation with willpower, you make distracting cues invisible (Feed Eradicators, ad blockers) or difficult (app timers, breathing delays via one sec), clearing cognitive load for deep work.',
    },
    {
      q: 'Can these tools track my progress over time?',
      a: 'Yes. Built-in iOS Screen Time and Android Digital Wellbeing maintain weekly usage reports, pickup frequencies, and notification counts stored strictly on your local device. Forest provides detailed productivity graphs by tag (e.g. Study, Work, Reading) without uploading private browsing history to external cloud servers.',
    },
  ]

  return (
    <div className="container section">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 rounded-full text-xs text-teal-700 font-medium mb-4">
          <Users size={14} aria-hidden="true" />
          Primary Research & Usability Testing (R1, R9, R10)
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-ink mb-4">
          Student Research & Usability Testing
        </h1>
        <p className="text-lg text-ink-light leading-relaxed">
          To fulfill R1 and R9 requirements, our team gathered empirical data from{' '}
          <strong>12 university students</strong> via an extensive pre-testing habits survey and hands-on
          testing of the Digital Wellness Hub. Below is the unvarnished analysis, verbatim student feedback,
          and the direct enhancements implemented as a result.
        </p>
      </div>

      {/* Methodology Card */}
      <section className="card mb-12 border-teal-100 bg-gradient-to-br from-white to-teal-50/30" aria-labelledby="method-heading">
        <h2 id="method-heading" className="text-xl font-semibold text-ink mb-3 flex items-center gap-2">
          <Layers className="text-teal-600" size={20} aria-hidden="true" />
          Research Methodology & Protocol
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-ink-light leading-relaxed">
          <div>
            <h3 className="font-semibold text-ink mb-1 text-xs uppercase tracking-wide">1. Participants</h3>
            <p>
              12 undergraduate and postgraduate college students representing diverse majors. Fully anonymized as
              <strong> Student 1 through Student 12</strong> to guarantee complete privacy.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-ink mb-1 text-xs uppercase tracking-wide">2. Instruments</h3>
            <p>
              A 17-question Google Form instrument assessing pre-test device habits, study distractions, notification
              disruptions, and hands-on website task performance (finding a tool, comparing tools, following a guide).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-ink mb-1 text-xs uppercase tracking-wide">3. Evidence Standards</h3>
            <p>
              Preserves authentic responses without fabrication or assumptions. Unanswered cells are computed with
              accurate denominators. Direct quotes are reproduced verbatim from the response ledger.
            </p>
          </div>
        </div>
      </section>

      {/* Part B: Digital Habits Findings */}
      <section className="mb-14" aria-labelledby="habits-heading">
        <h2 id="habits-heading" className="text-2xl font-semibold text-ink mb-2">
          Part A: Digital Habits Analysis (Pre-Testing)
        </h2>
        <p className="text-sm text-ink-lighter mb-8">
          Empirical baseline of how college students currently interact with their phones and laptops during academic study.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Daily Screen Time */}
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-ink text-sm">Daily Device Usage</h3>
              <Clock size={16} className="text-teal-600" aria-hidden="true" />
            </div>
            <p className="text-xs text-ink-lighter mb-4">Total hours spent on phone and laptop combined</p>
            <div className="space-y-3">
              {habitStatistics.dailyUsage.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ink-light font-medium">{item.label}</span>
                    <span className="text-ink font-semibold">{item.count}/12 ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-sand-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-teal-600 h-2 rounded-full transition-all"
                      style={{ width: `${item.percentage}%` }}
                      role="progressbar"
                      aria-valuenow={item.percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-teal-800 bg-teal-50 rounded p-2 mt-4 font-medium">
              Key finding: Over 50% spend 6+ hours daily, and 41.7% spend more than 10 hours daily on devices.
            </p>
          </div>

          {/* Card 2: Main Distractions */}
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-ink text-sm">Main Study Distractions</h3>
              <Smartphone size={16} className="text-teal-600" aria-hidden="true" />
            </div>
            <p className="text-xs text-ink-lighter mb-4">Primary interruption sources reported during study sessions</p>
            <div className="space-y-3">
              {habitStatistics.distractions.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ink-light font-medium">{item.label}</span>
                    <span className="text-ink font-semibold">{item.count}/11 ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-sand-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${item.percentage}%` }}
                      role="progressbar"
                      aria-valuenow={item.percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-blue-900 bg-blue-50 rounded p-2 mt-4 font-medium">
              Social media (63.6%) and Notifications (45.5%) are the overwhelming primary vectors of academic distraction.
            </p>
          </div>

          {/* Card 3: Screen Time Struggles */}
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-ink text-sm">Control Difficulty & Tool Usage</h3>
              <Bell size={16} className="text-teal-600" aria-hidden="true" />
            </div>
            <p className="text-xs text-ink-lighter mb-4">Do students struggle to regulate their screen time?</p>
            <div className="space-y-3 mb-5">
              {habitStatistics.struggleWithScreenTime.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ink-light font-medium">{item.label}</span>
                    <span className="text-ink font-semibold">{item.count}/12 ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-sand-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all ${idx === 0 ? 'bg-amber-600' : idx === 1 ? 'bg-amber-400' : 'bg-green-600'}`}
                      style={{ width: `${item.percentage}%` }}
                      role="progressbar"
                      aria-valuenow={item.percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-ink/10 pt-3">
              <p className="text-xs text-ink-light">
                <strong>Prior tool usage:</strong> 58.3% (7/12) had <em>never used</em> any digital wellness or screen-time tool prior to this study.
              </p>
              <p className="text-xs text-ink-light mt-1">
                <strong>Notification disturbance:</strong> 75.0% (9/12) report notifications always or sometimes disrupt study sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part C: Usability Evaluation Findings */}
      <section className="mb-14" aria-labelledby="usability-heading">
        <h2 id="usability-heading" className="text-2xl font-semibold text-ink mb-2">
          Part B: Website Usability & Evaluation (Post-Testing)
        </h2>
        <p className="text-sm text-ink-lighter mb-8">
          Quantitative assessment from students who navigated the live hub, tested the Finder wizard, compared resources, and reviewed setup guides.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="card text-center p-4">
            <span className="text-2xl font-bold text-teal-600 block">66.7%</span>
            <span className="text-xs text-ink-lighter">Found Navigation Easy (8/12)</span>
          </div>
          <div className="card text-center p-4">
            <span className="text-2xl font-bold text-teal-600 block">75.0%</span>
            <span className="text-xs text-ink-lighter">Discovered Useful Tool (9/12)</span>
          </div>
          <div className="card text-center p-4">
            <span className="text-2xl font-bold text-teal-600 block">91.7%</span>
            <span className="text-xs text-ink-lighter">Comparisons Understandable (11/12)</span>
          </div>
          <div className="card text-center p-4">
            <span className="text-2xl font-bold text-teal-600 block">83.3%</span>
            <span className="text-xs text-ink-lighter">Trade-offs Clear (10/12)</span>
          </div>
          <div className="card text-center p-4">
            <span className="text-2xl font-bold text-teal-600 block">83.3%</span>
            <span className="text-xs text-ink-lighter">Could Follow Guides (10/12)</span>
          </div>
          <div className="card text-center p-4">
            <span className="text-2xl font-bold text-teal-600 block">83.3%</span>
            <span className="text-xs text-ink-lighter">Setup Steps Clear (10/12)</span>
          </div>
        </div>

        {/* Tools Selected in Usability Test */}
        <div className="card bg-sand-50/60 mb-6">
          <h3 className="text-sm font-semibold text-ink mb-2">Tools Selected by Students During Hands-on Testing</h3>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2.5 py-1 bg-white border border-ink/10 rounded-full font-medium text-teal-800">
              Android Digital Wellbeing (5 students)
            </span>
            <span className="px-2.5 py-1 bg-white border border-ink/10 rounded-full font-medium text-teal-800">
              LeechBlock NG (1 student)
            </span>
            <span className="px-2.5 py-1 bg-white border border-ink/10 rounded-full font-medium text-teal-800">
              Forest (1 student)
            </span>
            <span className="px-2.5 py-1 bg-white border border-ink/10 rounded-full font-medium text-teal-800">
              Signal (1 student)
            </span>
            <span className="px-2.5 py-1 bg-white border border-ink/10 rounded-full font-medium text-teal-800">
              DuckDuckGo (1 student)
            </span>
            <span className="px-2.5 py-1 bg-white border border-ink/10 rounded-full font-medium text-ink-lighter">
              Unspecified / Exploring (3 students)
            </span>
          </div>
        </div>
      </section>

      {/* Part D: Feedback to Improvement Action Map */}
      <section className="mb-14" aria-labelledby="improvements-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 id="improvements-heading" className="text-2xl font-semibold text-ink">
              Part C: How Student Feedback Changed the Website
            </h2>
            <p className="text-sm text-ink-lighter">
              Every design and architectural update directly traced back to participant requests (R9, R10).
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {implementedImprovements.map(imp => (
            <div key={imp.id} className="card border-l-4 border-l-teal-600 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">{imp.id}</span>
                  <span className="text-xs font-semibold text-ink">{imp.feedbackSource} Feedback</span>
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-green-100 text-green-800 flex items-center gap-1">
                  <CheckCircle2 size={12} aria-hidden="true" />
                  {imp.status}
                </span>
              </div>
              <blockquote className="text-xs italic text-ink-light bg-sand-50 rounded p-2.5 mb-3 border-l-2 border-teal-400">
                "{imp.studentQuote}"
              </blockquote>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="font-semibold text-ink block mb-0.5">Identified Need:</span>
                  <p className="text-ink-lighter">{imp.identifiedIssue}</p>
                </div>
                <div>
                  <span className="font-semibold text-ink block mb-0.5">Implemented Solution:</span>
                  <p className="text-teal-900 font-medium">{imp.changeImplemented}</p>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-ink/5 flex items-center gap-2 text-[11px] text-ink-lighter">
                <span>Updated pages:</span>
                {imp.affectedPages.map((pg, i) => (
                  <Link key={i} to={pg} className="text-teal-600 hover:text-teal-700 underline font-medium">
                    {pg}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Q&A Section (Directly addressing Student 6's feedback) */}
      <section className="mb-14 card bg-teal-50/50 border-teal-200" aria-labelledby="faq-heading">
        <div className="max-w-2xl mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-wide mb-1">
            <Sparkles size={14} className="text-teal-600" aria-hidden="true" />
            Addressing Student 6 Request: "Give option for Q&A"
          </div>
          <h2 id="faq-heading" className="text-xl font-semibold text-ink">
            Frequently Asked Student Questions (Digital Wellness Q&A)
          </h2>
          <p className="text-xs text-ink-lighter mt-1">
            Practical answers to common beginner dilemmas on bypass prevention, blue light, alarm safety, and study blocking.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = expandedFaq === index
            return (
              <div key={index} className="bg-white rounded-lg border border-teal-100 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : index)}
                  className="w-full text-left p-4 flex items-center justify-between gap-3 text-sm font-semibold text-ink hover:text-teal-700 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle size={16} className="text-teal-600 shrink-0" aria-hidden="true" />
                    {faq.q}
                  </span>
                  {isOpen ? <ChevronUp size={16} className="text-ink-lighter shrink-0" /> : <ChevronDown size={16} className="text-ink-lighter shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-ink-light leading-relaxed border-t border-ink/5">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Part E: Complete Raw Anonymized Responses Table */}
      <section className="mb-14" aria-labelledby="raw-data-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 id="raw-data-heading" className="text-2xl font-semibold text-ink">
              Part D: Complete Participant Ledger (Anonymized)
            </h2>
            <p className="text-xs text-ink-lighter">
              All 12 individual student records preserved without fabrication or alteration.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-ink-lighter" aria-hidden="true" />
            <span className="text-xs text-ink-lighter">Filter by Screen Time Struggle:</span>
            <select
              value={filterStruggle}
              onChange={e => setFilterStruggle(e.target.value)}
              className="text-xs border border-ink/20 rounded px-2.5 py-1 bg-white text-ink"
            >
              <option value="all">All Students (12)</option>
              <option value="yes">Struggles: Yes (5)</option>
              <option value="sometimes">Struggles: Sometimes (6)</option>
              <option value="no">Struggles: No (1)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-ink/10 rounded-xl bg-white shadow-card">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-sand-100/70 border-b border-ink/10 text-ink-lighter">
                <th className="p-3 font-semibold">Participant</th>
                <th className="p-3 font-semibold">Daily Usage</th>
                <th className="p-3 font-semibold">Main Distractions</th>
                <th className="p-3 font-semibold">Struggle</th>
                <th className="p-3 font-semibold">Notifications</th>
                <th className="p-3 font-semibold">Tool Selected</th>
                <th className="p-3 font-semibold">Nav Easy?</th>
                <th className="p-3 font-semibold">Clear Steps?</th>
                <th className="p-3 font-semibold min-w-[200px]">Suggestions / Comments</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5 text-ink-light">
              {filteredResponses.map(s => (
                <tr key={s.id} className="hover:bg-sand-50/50 transition-colors">
                  <td className="p-3 font-semibold text-ink">{s.id}</td>
                  <td className="p-3 whitespace-nowrap">{s.dailyDeviceUsage}</td>
                  <td className="p-3">{s.mainDistractions.length ? s.mainDistractions.join(', ') : '—'}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                      s.struggleScreenTime === 'Yes' ? 'bg-amber-100 text-amber-800' :
                      s.struggleScreenTime === 'Sometimes' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {s.struggleScreenTime}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap">{s.notificationsDisturb}</td>
                  <td className="p-3 font-medium text-teal-800">{s.selectedTool}</td>
                  <td className="p-3">{s.easyToNavigate}</td>
                  <td className="p-3">{s.instructionsClear}</td>
                  <td className="p-3 italic text-ink-lighter">
                    {s.improvementSuggestion || s.problemsEncountered
                      ? `"${s.improvementSuggestion || s.problemsEncountered}"`
                      : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Part F: Scientific & Methodological Limitations */}
      <section className="card bg-sand-100/50 border-ink/10" aria-labelledby="limits-heading">
        <h2 id="limits-heading" className="text-base font-semibold text-ink mb-2">
          Methodological Scope & Research Limitations (Scientific Accuracy)
        </h2>
        <ul className="space-y-1.5 text-xs text-ink-light leading-relaxed list-disc list-inside">
          <li>
            <strong>Sample Size & Convenience Sampling:</strong> This study is based on a localized cohort of 12 college students.
            Findings reflect university-level academic workflow pressures and should not be statistically generalized to the broader adult public.
          </li>
          <li>
            <strong>Self-Report Bias:</strong> Daily screen-time hours were self-reported rather than instrumented via passive OS telemetry;
            actual usage may vary from reported figures.
          </li>
          <li>
            <strong>Evaluation Context:</strong> Website usability feedback was conducted during a single testing session; longitudinal
            habit adherence over several weeks was beyond the project timeline (evaluation date: 12–13 Nov 2026).
          </li>
        </ul>
      </section>
    </div>
  )
}
