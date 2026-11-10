// scripts/checkLinks.mjs
// Run: npm run check:links
// Checks all external URLs in resources.ts and writes a link test record.
// NOTE: This script uses fetch() — requires Node 18+.

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const resourcesSource = readFileSync(join(root, 'src', 'data', 'resources.ts'), 'utf8')
const conceptsSource = readFileSync(join(root, 'src', 'data', 'concepts.ts'), 'utf8')
const guidesSource = readFileSync(join(root, 'src', 'data', 'guides.ts'), 'utf8')

// Extract all URLs from source files
function extractUrls(source) {
  const urlRegex = /https?:\/\/[^\s'"`,)>]+/g
  const matches = [...source.matchAll(urlRegex)]
  return [...new Set(matches.map(m => m[0].replace(/[,;.)\]>'"`]+$/, '')))]
}

const allUrls = [
  ...extractUrls(resourcesSource),
  ...extractUrls(conceptsSource),
  ...extractUrls(guidesSource),
]

const uniqueUrls = [...new Set(allUrls)]

console.log(`Found ${uniqueUrls.length} unique external URLs to check.`)
console.log('Note: Some URLs may return 403/429 for automated checks (bot protection).')
console.log('Those will be marked as needing manual confirmation.')
console.log('')

const results = []
const checkDate = new Date().toISOString().slice(0, 10)

for (const url of uniqueUrls) {
  let status = 'unknown'
  let httpCode = '—'
  let notes = ''

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; link-checker/1.0)' }
    })
    clearTimeout(timeout)
    httpCode = String(response.status)
    if (response.status >= 200 && response.status < 400) {
      status = 'OK'
    } else if (response.status === 403 || response.status === 429) {
      status = 'Bot blocked — manual check needed'
      notes = 'Site returns 403/429 for automated requests'
    } else if (response.status === 301 || response.status === 302) {
      status = 'Redirect — manual check needed'
      notes = `Redirects to: ${response.headers.get('location') || 'unknown'}`
    } else {
      status = `HTTP ${response.status} — check manually`
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      status = 'Timeout — manual check needed'
      notes = 'Request timed out after 10s'
    } else {
      status = 'Error — manual check needed'
      notes = err.message?.slice(0, 60) || 'Network error'
    }
  }

  results.push({ url, httpCode, status, notes, checkDate })
  const icon = status === 'OK' ? '✅' : '⚠️'
  console.log(`${icon} [${httpCode}] ${url.slice(0, 70)}`)
}

// Write report
const lines = [
  '# Link Test Record — Digital Wellness Resource Hub',
  `Generated: ${checkDate} by npm run check:links`,
  '',
  '> Note: HTTP 403/429 responses may mean the site blocks automated checks (normal).',
  '> Redirects need manual confirmation that final destination is correct.',
  '> The "Manually confirmed by / date" column must be completed by a student before submission.',
  '',
  '## Results',
  '',
  '| URL | HTTP | Auto Status | Notes | Manually confirmed by / date |',
  '|-----|------|-------------|-------|------------------------------|',
  ...results.map(r =>
    `| ${r.url.slice(0, 60)}${r.url.length > 60 ? '…' : ''} | ${r.httpCode} | ${r.status} | ${r.notes} | — |`
  ),
  '',
  `## Summary`,
  '',
  `- Total URLs checked: ${results.length}`,
  `- OK: ${results.filter(r => r.status === 'OK').length}`,
  `- Needs manual check: ${results.filter(r => r.status !== 'OK').length}`,
  '',
  '## Internal routes (verify manually in browser)',
  '',
  '| Route | Expected | Manually confirmed by / date |',
  '|-------|----------|------------------------------|',
  '| / | Home page loads | — |',
  '| /explore | All 12 tools shown | — |',
  '| /explore/ios-screen-time | Tool detail loads | — |',
  '| /compare | Compare page loads | — |',
  '| /compare?ids=ios-screen-time,leechblock-ng | Table with 2 tools | — |',
  '| /find | Finder wizard step 1 | — |',
  '| /guides | 3 guide cards | — |',
  '| /guides/cue-friction | Guide detail loads | — |',
  '| /learn | 8 concept cards | — |',
  '| /learn/attention-economy | Concept detail loads | — |',
  '| /about | About page loads | — |',
  '| /privacy | Privacy page loads | — |',
  '| /project-evidence | Evidence page loads | — |',
  '| /nonexistent | 404 page shows | — |',
]

const output = lines.join('\n')
writeFileSync(join(root, 'docs', 'LINK_TEST_RECORD.md'), output, 'utf8')
console.log('')
console.log(`✅ Link test record written to /docs/LINK_TEST_RECORD.md`)

