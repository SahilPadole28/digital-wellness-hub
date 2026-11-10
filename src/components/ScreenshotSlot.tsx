import { useState } from 'react'
import { ImageOff, ExternalLink } from 'lucide-react'
import { getAssetCredit } from '../data/assetCredits'

interface ScreenshotSlotProps {
  guideId: string
  stepFile: string
  alt: string
  stepNumber: number
}

export function ScreenshotSlot({ guideId, stepFile, alt, stepNumber }: ScreenshotSlotProps) {
  const [loadError, setLoadError] = useState(false)
  const src = `/screenshots/${guideId}/${stepFile}`
  const credit = getAssetCredit(guideId, stepFile)

  return (
    <figure className="my-6">
      <div className="screenshot-slot" aria-label={`Screenshot for step ${stepNumber}`}>
        {!loadError ? (
          <img
            src={src}
            alt={alt}
            className="w-full rounded shadow-card object-cover"
            onError={() => setLoadError(true)}
          />
        ) : (
          <div
            className="flex flex-col items-center justify-center gap-2 p-8 text-center"
            role="img"
            aria-label={`Screenshot pending: ${alt}`}
          >
            <ImageOff size={32} className="text-ink-lighter" aria-hidden="true" />
            <p className="text-sm font-medium text-ink-lighter">Screenshot pending</p>
            <p className="text-xs text-ink-lighter max-w-xs">
              To be captured by the student on a real device with no personal information visible.
            </p>
            <p className="text-xs text-teal-600 mt-1">Expected: <code>{stepFile}</code></p>
          </div>
        )}
      </div>

      <figcaption className="text-xs text-ink-lighter mt-2.5 text-center px-2">
        <span className="italic block mb-1 text-ink-light">{alt}</span>
        {credit && (
          <div className="text-[11px] text-ink-lighter/90 flex flex-wrap items-center justify-center gap-1.5 not-italic">
            {credit.type === 'official image' && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 font-medium">
                Official store preview
              </span>
            )}
            {credit.type === 'own capture' && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">
                Live web capture
              </span>
            )}
            {credit.type === 'illustrative diagram' && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-medium">
                Illustrative diagram – not a product screenshot
              </span>
            )}
            <span>· Source:</span>
            <a
              href={credit.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-teal-600 hover:text-teal-700 underline"
            >
              <span>{credit.sourceName}</span>
              <ExternalLink size={10} aria-hidden="true" />
            </a>
            <span>· Checked: {credit.dateAccessed}</span>
          </div>
        )}
      </figcaption>
    </figure>
  )
}
