import fs from 'fs'
import path from 'path'
import { guides } from '../src/data/guides.js'

// We will test if every image referenced in guides exists on disk in /public
const publicDir = path.resolve('public')
let missing = 0
let total = 0

console.log('=== Verifying Guide Screenshot Assets ===\n')

for (const guide of guides) {
  console.log(`Guide: ${guide.title} (${guide.id})`)
  for (const plat of guide.platforms) {
    console.log(`  Platform: ${plat.platform}`)
    for (const step of plat.steps) {
      total++
      const imgPath = path.join(publicDir, 'screenshots', guide.id, step.screenshotFile)
      const exists = fs.existsSync(imgPath)
      const size = exists ? fs.statSync(imgPath).size : 0

      if (!exists || size === 0) {
        console.error(`    ❌ MISSING: Step ${step.stepNumber}: ${step.screenshotFile}`)
        missing++
      } else {
        if (!step.screenshotAlt || step.screenshotAlt.trim() === '') {
          console.error(`    ❌ MISSING ALT TEXT: Step ${step.stepNumber}: ${step.screenshotFile}`)
          missing++
        } else {
          console.log(`    ✓ Step ${step.stepNumber}: ${step.screenshotFile} (${size} bytes) | alt: "${step.screenshotAlt.substring(0, 45)}..."`)
        }
      }
    }
  }
}

console.log(`\nResult: ${total - missing}/${total} screenshots verified present with valid alt text!`)
if (missing > 0) {
  process.exit(1)
} else {
  console.log('ALL SCREENSHOTS & ALT TEXT VERIFIED 100% OK!')
}

