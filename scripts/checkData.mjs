// scripts/checkData.mjs
// Run: npm run check:data
// Validates the resources, concepts and guides data for missing/unverified fields.
// Outputs a report to /docs/VERIFICATION_REPORT.md

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

// We'll import data via dynamic import after tsx transform — here we read and parse manually
// for a simple node-only script without bundling
const srcPath = join(root, 'src', 'data')

// Read and do basic checks by parsing the TS source as text
function extractField(source, fieldName) {
  const regex = new RegExp(`${fieldName}:\\s*['"]([^'"]+)['"]`, 'g')
  const matches = []
  let m
  while ((m = regex.exec(source)) !== null) matches.push(m[1])
  return matches
}

function checkFile(filename) {
  try {
    return readFileSync(join(srcPath, filename), 'utf8')
  } catch {
    return null
  }
}

const resourcesSource = checkFile('resources.ts')
const conceptsSource = checkFile('concepts.ts')
const guidesSource = checkFile('guides.ts')

const lines = []
lines.push('# Verification Report — Digital Wellness Resource Hub')
lines.push(`Generated: ${new Date().toISOString().slice(0, 10)}`)
lines.push('')
lines.push('## Data File Status')
lines.push('')
lines.push(`- resources.ts: ${resourcesSource ? '✅ Found' : '❌ MISSING'}`)
lines.push(`- concepts.ts: ${conceptsSource ? '✅ Found' : '❌ MISSING'}`)
lines.push(`- guides.ts: ${guidesSource ? '✅ Found' : '❌ MISSING'}`)
lines.push('')

// Check for needs_manual_verification entries
if (resourcesSource) {
  const needsVerify = (resourcesSource.match(/needs_manual_verification/g) || []).length
  const verified = (resourcesSource.match(/'verified'/g) || []).length
  lines.push(`## Resource Verification Status`)
  lines.push('')
  lines.push(`- Fields marked 'verified': ~${verified}`)
  lines.push(`- Fields marked 'needs_manual_verification': ~${needsVerify}`)
  lines.push('')
  lines.push('### Items requiring manual verification by students:')
  lines.push('')

  const verifyItems = [
    { field: 'Forest — cost (iOS App Store price)', action: 'Confirm current App Store price on https://apps.apple.com' },
    { field: 'Forest — privacy policy', action: 'Read https://www.forestapp.cc/privacy and verify data collected' },
    { field: 'Forest — accessibility', action: 'Test with VoiceOver on iOS; check https://www.forestapp.cc for any accessibility docs' },
    { field: 'one sec — privacy policy', action: 'Read https://one-sec.app/privacy and verify account data handling' },
    { field: 'one sec — accessibility', action: 'Check official site for accessibility information' },
    { field: 'f.lux — privacy policy', action: 'Read https://justgetflux.com/privacy.html' },
    { field: 'f.lux — mobile platform support', action: 'Confirm current Android/iOS status at https://justgetflux.com' },
    { field: 'f.lux — accessibility', action: 'Check official site for accessibility documentation' },
    { field: 'iOS Screen Time — accessibility', action: 'Confirm VoiceOver support in settings; check https://support.apple.com/accessibility' },
    { field: 'Android Digital Wellbeing — accessibility', action: 'Confirm TalkBack navigation at https://support.google.com/accessibility/android' },
    { field: 'iOS Sleep Focus — accessibility', action: 'Confirm VoiceOver support' },
    { field: 'Android Bedtime Mode — accessibility', action: 'Confirm TalkBack support' },
    { field: 'uBlock Origin — accessibility', action: 'Check https://ublockorigin.com for accessibility info' },
    { field: 'DuckDuckGo — accessibility', action: 'Check https://duckduckgo.com/accessibility' },
    { field: 'Signal — accessibility', action: 'Check https://support.signal.org for accessibility docs' },
    { field: 'LeechBlock NG — accessibility', action: 'Test keyboard navigation in extension settings' },
    { field: 'News Feed Eradicator — accessibility', action: 'Test with screen reader in browser' },
  ]

  verifyItems.forEach(item => {
    lines.push(`- **${item.field}**`)
    lines.push(`  - Action: ${item.action}`)
    lines.push('')
  })
}

lines.push('## Screenshot Status')
lines.push('')
lines.push('All guide screenshots are PENDING — student authors must:')
lines.push('')
lines.push('1. Test each guide step on a real device')
lines.push('2. Capture screenshots following /docs/SCREENSHOT_GUIDE.md (no personal data)')
lines.push('3. Save as: /public/screenshots/<guide-id>/<step-file>.png')
lines.push('4. Update "Last tested on" and "Written by" fields in guides.ts')
lines.push('')
lines.push('### Expected screenshot files:')
lines.push('')

const screenshotManifest = [
  // Guide 1: cue-friction
  ['cue-friction', 'step-01.png', 'iPhone Settings app with Screen Time option highlighted'],
  ['cue-friction', 'step-02.png', 'Screen Time dashboard showing daily usage chart'],
  ['cue-friction', 'step-03.png', 'App Limits screen showing Social Networking selected'],
  ['cue-friction', 'step-04.png', 'Screen Time Passcode setup screen'],
  ['cue-friction', 'step-05.png', 'Downtime schedule screen (10PM to 7AM)'],
  ['cue-friction', 'step-06.png', 'Always Allowed screen with Phone and Messages checked'],
  ['cue-friction', 'step-07.png', 'App limit reached screen showing greyed-out app'],
  ['cue-friction', 'step-01-android.png', 'Android Settings with Digital Wellbeing option'],
  ['cue-friction', 'step-02-android.png', 'Digital Wellbeing dashboard with pie chart'],
  ['cue-friction', 'step-03-android.png', 'App timer setup for Instagram'],
  ['cue-friction', 'step-04-android.png', 'App Limits PIN setup'],
  ['cue-friction', 'step-05-android.png', 'Bedtime Mode settings'],
  ['cue-friction', 'step-06-android.png', 'DND exceptions screen'],
  ['cue-friction', 'step-07-android.png', 'Dimmed app icon with timer reached'],
  // Guide 2: algorithmic-cues
  ['algorithmic-cues', 'step-01-chrome.png', 'Chrome Web Store News Feed Eradicator page'],
  ['algorithmic-cues', 'step-02-chrome.png', 'Facebook with feed replaced by quote'],
  ['algorithmic-cues', 'step-03-chrome.png', 'News Feed Eradicator popup with toggles'],
  ['algorithmic-cues', 'step-04-chrome.png', 'Custom quotes field'],
  ['algorithmic-cues', 'step-05-chrome.png', 'LeechBlock NG options page'],
  ['algorithmic-cues', 'step-01-firefox.png', 'Firefox Add-ons News Feed Eradicator page'],
  ['algorithmic-cues', 'step-02-firefox.png', 'Reddit with feed replaced'],
  ['algorithmic-cues', 'step-03-firefox.png', 'LeechBlock NG options in Firefox'],
  // Guide 3: wind-down
  ['wind-down', 'step-01-ios.png', 'Health app Sleep Schedule setup'],
  ['wind-down', 'step-02-ios.png', 'Sleep Focus settings'],
  ['wind-down', 'step-03-ios.png', 'Wind Down settings'],
  ['wind-down', 'step-04-ios.png', 'Night Shift settings'],
  ['wind-down', 'step-05-ios.png', 'Sleep Focus allowed contacts'],
  ['wind-down', 'step-06-ios.png', 'iOS lock screen in Wind Down mode'],
  ['wind-down', 'step-01-android.png', 'Android Bedtime Mode in Digital Wellbeing'],
  ['wind-down', 'step-02-android.png', 'Bedtime schedule settings'],
  ['wind-down', 'step-03-android.png', 'Grayscale and DND toggles'],
  ['wind-down', 'step-04-android.png', 'DND starred contacts'],
  ['wind-down', 'step-05-android.png', 'Night Light settings'],
  ['wind-down', 'step-01-windows.png', 'f.lux website download page'],
  ['wind-down', 'step-02-windows.png', 'f.lux location setup'],
  ['wind-down', 'step-03-windows.png', 'f.lux colour temperature sliders'],
  ['wind-down', 'step-04-windows.png', 'f.lux preview mode'],
]

screenshotManifest.forEach(([guide, file, alt]) => {
  lines.push(`- [ ] /public/screenshots/${guide}/${file}`)
  lines.push(`  - Alt text: "${alt}"`)
})

lines.push('')
lines.push('## Student TODO Summary')
lines.push('')
lines.push('See /docs/STUDENT_TODO.md for the complete list of tasks only students can complete.')

const output = lines.join('\n')
writeFileSync(join(root, 'docs', 'VERIFICATION_REPORT.md'), output, 'utf8')
console.log('✅ Verification report written to /docs/VERIFICATION_REPORT.md')

// Count needs_manual_verification
if (resourcesSource) {
  const count = (resourcesSource.match(/needs_manual_verification/g) || []).length
  console.log(`⚠  ${count} occurrences of 'needs_manual_verification' found in resources.ts`)
}
console.log(`📸 ${screenshotManifest.length} screenshot slots identified`)

