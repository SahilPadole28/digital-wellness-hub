import { useEffect } from 'react'
import { concepts } from '../data/concepts'
import { ConceptCard } from '../components/ConceptCard'

export default function Learn() {
  useEffect(() => {
    document.title = 'Learn — Digital Wellness Hub'
  }, [])

  return (
    <div className="container section">
      <div className="max-w-2xl mb-10">
        <h1 className="text-3xl font-semibold text-ink mb-3">Learn: the concepts behind digital wellness</h1>
        <p className="text-ink-lighter leading-relaxed mb-4">
          Understanding <em>why</em> digital habits are hard to change makes tools more effective.
          Each concept is explained in plain language and labelled with an evidence level so you
          know the strength of the underlying science.
        </p>
        <div className="bg-sand-100 rounded-lg p-4 text-sm text-ink-lighter">
          <p className="font-medium text-ink mb-1">Evidence labels explained</p>
          <ul className="space-y-1">
            <li><span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2" aria-hidden="true"></span><strong>Well supported</strong> — robust, replicated research</li>
            <li><span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2" aria-hidden="true"></span><strong>Supported, simplified here</strong> — real but complex; we've simplified</li>
            <li><span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-2" aria-hidden="true"></span><strong>Mixed or limited evidence</strong> — real but debated</li>
            <li><span className="inline-block w-3 h-3 rounded-full bg-purple-500 mr-2" aria-hidden="true"></span><strong>Philosophical framework</strong> — not neuroscience; useful metaphor</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {concepts.map(concept => (
          <ConceptCard key={concept.id} concept={concept} />
        ))}
      </div>
    </div>
  )
}

