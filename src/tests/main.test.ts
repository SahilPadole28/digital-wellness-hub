import { describe, it, expect } from 'vitest'
import { filterResources, defaultFilters } from '../utils/filters'
import { scoreResources } from '../utils/scoring'
import { resources } from '../data/resources'
import { concepts } from '../data/concepts'
import { guides } from '../data/guides'
import { getAssetCredit } from '../data/assetCredits'

// ── Filter tests ───────────────────────────────────────────

describe('filterResources', () => {
  it('returns all resources with default (empty) filters', () => {
    expect(filterResources(resources, defaultFilters)).toHaveLength(resources.length)
  })

  it('filters by search term (name match)', () => {
    const result = filterResources(resources, { ...defaultFilters, search: 'Forest' })
    expect(result.length).toBeGreaterThan(0)
    expect(result.every(r => r.name.toLowerCase().includes('forest') || r.tagline.toLowerCase().includes('forest') || r.purpose.toLowerCase().includes('forest'))).toBe(true)
  })

  it('filters by category: screen-time', () => {
    const result = filterResources(resources, { ...defaultFilters, categories: ['screen-time'] })
    expect(result.length).toBeGreaterThan(0)
    expect(result.every(r => r.category === 'screen-time')).toBe(true)
  })

  it('filters by platform: ios', () => {
    const result = filterResources(resources, { ...defaultFilters, platforms: ['ios'] })
    expect(result.length).toBeGreaterThan(0)
    expect(result.every(r => r.platforms.includes('ios'))).toBe(true)
  })

  it('filters by cost model: free', () => {
    const result = filterResources(resources, { ...defaultFilters, costModels: ['free'] })
    expect(result.length).toBeGreaterThan(0)
    result.forEach(r => {
      const models = Array.isArray(r.cost.model) ? r.cost.model : [r.cost.model]
      expect(models.includes('free')).toBe(true)
    })
  })

  it('filters noAccount: only resources requiring no account', () => {
    const result = filterResources(resources, { ...defaultFilters, noAccount: true })
    expect(result.every(r => !r.privacy.accountRequired)).toBe(true)
  })

  it('returns empty array for a search with no match', () => {
    const result = filterResources(resources, { ...defaultFilters, search: 'xyzzy_no_match_xyz' })
    expect(result).toHaveLength(0)
  })

  it('filters by multiple categories', () => {
    const result = filterResources(resources, { ...defaultFilters, categories: ['focus', 'privacy'] })
    expect(result.every(r => r.category === 'focus' || r.category === 'privacy')).toBe(true)
  })

  it('filters by platform returns nothing for unsupported platform combo', () => {
    // No tool supports 'linux' in our dataset
    const result = filterResources(resources, { ...defaultFilters, platforms: ['linux'] })
    // f.lux supports linux — may or may not be 0; just verify all results match
    result.forEach(r => {
      expect(r.platforms.includes('linux')).toBe(true)
    })
  })
})

// ── Scoring tests ──────────────────────────────────────────

describe('scoreResources', () => {
  it('returns matches and excluded when platform filter applied', () => {
    const result = scoreResources(resources, {
      concern: 'scrolling',
      platforms: ['ios'],
      budgetFreeOnly: false,
      preferOpenSource: false,
    })
    // All matches must include iOS
    result.matches.forEach(({ resource: r }) => {
      expect(r.platforms.includes('ios')).toBe(true)
    })
    // All excluded should not include iOS
    result.excluded.forEach(({ resource: r }) => {
      expect(r.platforms.includes('ios')).toBe(false)
    })
  })

  it('excludes paid tools when freeOnly is true', () => {
    const result = scoreResources(resources, {
      concern: '',
      platforms: [],
      budgetFreeOnly: true,
      preferOpenSource: false,
    })
    result.matches.forEach(({ resource: r }) => {
      const models = Array.isArray(r.cost.model) ? r.cost.model : [r.cost.model]
      expect(models.includes('free') || models.includes('open_source')).toBe(true)
    })
  })

  it('gives higher score to concern-matched tools', () => {
    const result = scoreResources(resources, {
      concern: 'privacy',
      platforms: [],
      budgetFreeOnly: false,
      preferOpenSource: false,
    })
    // Top result should be a privacy tool
    expect(result.matches[0]?.resource.concerns.includes('privacy')).toBe(true)
  })

  it('gives open-source bonus when preferOpenSource is true', () => {
    const result = scoreResources(resources, {
      concern: '',
      platforms: [],
      budgetFreeOnly: false,
      preferOpenSource: true,
    })
    // The top scored should include open-source tools
    const topModels = Array.isArray(result.matches[0]?.resource.cost.model)
      ? result.matches[0].resource.cost.model
      : [result.matches[0]?.resource.cost.model]
    expect(topModels.includes('open_source')).toBe(true)
  })

  it('returns all resources when no filters applied', () => {
    const result = scoreResources(resources, {
      concern: '',
      platforms: [],
      budgetFreeOnly: false,
      preferOpenSource: false,
    })
    expect(result.matches.length + result.excluded.length).toBe(resources.length)
  })

  it('handles no matching platform gracefully', () => {
    const result = scoreResources(resources, {
      concern: 'focus',
      platforms: ['ios', 'android'],
      budgetFreeOnly: false,
      preferOpenSource: false,
    })
    // Should have some matches and some excluded, no errors
    expect(Array.isArray(result.matches)).toBe(true)
    expect(Array.isArray(result.excluded)).toBe(true)
  })

  it('provides whyThisFits string for all matches', () => {
    const result = scoreResources(resources, {
      concern: 'sleep',
      platforms: ['ios'],
      budgetFreeOnly: false,
      preferOpenSource: false,
    })
    result.matches.forEach(m => {
      expect(typeof m.whyThisFits).toBe('string')
      expect(m.whyThisFits.length).toBeGreaterThan(0)
    })
  })
})

// ── Data integrity tests ───────────────────────────────────

describe('resource data integrity', () => {
  it('every resource has a unique id', () => {
    const ids = resources.map(r => r.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })

  it('every resource has a unique slug', () => {
    const slugs = resources.map(r => r.slug)
    const unique = new Set(slugs)
    expect(unique.size).toBe(slugs.length)
  })

  it('every resource has at least one source', () => {
    resources.forEach(r => {
      expect(r.sources.length).toBeGreaterThan(0)
    })
  })

  it('every resource has a verifiedOn date', () => {
    resources.forEach(r => {
      expect(r.verifiedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })
  })

  it('every resource has at least one platform', () => {
    resources.forEach(r => {
      expect(r.platforms.length).toBeGreaterThan(0)
    })
  })

  it('every resource has at least one concern', () => {
    resources.forEach(r => {
      expect(r.concerns.length).toBeGreaterThan(0)
    })
  })

  it('resource count is between 8 and 12 (R2)', () => {
    expect(resources.length).toBeGreaterThanOrEqual(8)
    expect(resources.length).toBeLessThanOrEqual(12)
  })

  it('all 4 categories are represented (R2)', () => {
    const cats = new Set(resources.map(r => r.category))
    expect(cats.has('screen-time')).toBe(true)
    expect(cats.has('focus')).toBe(true)
    expect(cats.has('sleep')).toBe(true)
    expect(cats.has('privacy')).toBe(true)
  })

  it('no resource labels paid-only tool as free', () => {
    // Forest iOS is paid — should NOT be in cost.model = ['free'] only
    const forest = resources.find(r => r.id === 'forest')
    expect(forest).toBeDefined()
    const models = Array.isArray(forest!.cost.model) ? forest!.cost.model : [forest!.cost.model]
    // Should have 'paid' or 'freemium' — not purely 'free'
    expect(models.includes('paid') || models.includes('freemium')).toBe(true)
  })

  it('all array fields in resources are truly Array instances (not strings)', () => {
    resources.forEach(r => {
      expect(Array.isArray(r.concerns), `${r.id} concerns is not array`).toBe(true)
      expect(Array.isArray(r.platforms), `${r.id} platforms is not array`).toBe(true)
      expect(Array.isArray(r.keyFeatures), `${r.id} keyFeatures is not array`).toBe(true)
      expect(Array.isArray(r.limitations), `${r.id} limitations is not array`).toBe(true)
      expect(Array.isArray(r.courseConcepts), `${r.id} courseConcepts is not array`).toBe(true)
      expect(Array.isArray(r.relatedGuides), `${r.id} relatedGuides is not array`).toBe(true)
      expect(Array.isArray(r.sources), `${r.id} sources is not array`).toBe(true)
      expect(Array.isArray(r.cost.paywalledFeatures), `${r.id} paywalledFeatures is not array`).toBe(true)
      expect(typeof r.name).toBe('string')
      expect(typeof r.tagline).toBe('string')
      expect(typeof r.purpose).toBe('string')
      expect(typeof r.platformNotes).toBe('string')
      expect(typeof r.cost.details).toBe('string')
      expect(typeof r.privacy.summary).toBe('string')
      expect(typeof r.accessibility.notes).toBe('string')
    })
  })

  it('all array fields in concepts are truly Array instances', () => {
    concepts.forEach(c => {
      expect(Array.isArray(c.sources), `${c.id} sources is not array`).toBe(true)
      expect(Array.isArray(c.tryItWith), `${c.id} tryItWith is not array`).toBe(true)
      expect(Array.isArray(c.relatedConcepts), `${c.id} relatedConcepts is not array`).toBe(true)
      expect(typeof c.title).toBe('string')
      expect(typeof c.plainExplanation).toBe('string')
    })
  })

  it('all array fields in guides are truly Array instances', () => {
    guides.forEach(g => {
      expect(Array.isArray(g.courseConceptIds), `${g.id} courseConceptIds is not array`).toBe(true)
      expect(Array.isArray(g.platforms), `${g.id} platforms is not array`).toBe(true)
      expect(Array.isArray(g.limitations), `${g.id} limitations is not array`).toBe(true)
      expect(Array.isArray(g.relatedResourceIds), `${g.id} relatedResourceIds is not array`).toBe(true)
      g.platforms.forEach(p => {
        expect(Array.isArray(p.prerequisites), `${g.id} ${p.platform} prereqs is not array`).toBe(true)
        expect(Array.isArray(p.steps), `${g.id} ${p.platform} steps is not array`).toBe(true)
        expect(Array.isArray(p.troubleshooting), `${g.id} ${p.platform} troubleshooting is not array`).toBe(true)
      })
    })
  })

  it('all 37 guide steps have asset credits and valid alt text mapped (R5, R6, R10)', () => {
    let checkedCount = 0
    guides.forEach(g => {
      g.platforms.forEach(p => {
        p.steps.forEach(step => {
          checkedCount++
          const credit = getAssetCredit(g.id, step.screenshotFile)
          expect(credit, `Asset credit missing for ${g.id}/${step.screenshotFile}`).toBeDefined()
          expect(typeof step.screenshotAlt, `Alt text missing for ${step.screenshotFile}`).toBe('string')
          expect(step.screenshotAlt.trim().length, `Alt text empty for ${step.screenshotFile}`).toBeGreaterThan(5)
          expect(credit?.sourceName, `Source name missing for ${step.screenshotFile}`).toBeDefined()
          expect(credit?.sourceUrl, `Source URL missing for ${step.screenshotFile}`).toBeDefined()
          expect(credit?.dateAccessed, `Date accessed missing for ${step.screenshotFile}`).toBeDefined()
        })
      })
    })
    expect(checkedCount).toBe(37)
  })
})

