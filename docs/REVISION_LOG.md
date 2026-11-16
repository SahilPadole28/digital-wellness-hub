# Revision Log & Iterative Enhancements
**Project 3 · Digital Wellness Resource Hub**  
**Academic Requirement R9 & R10 Compliance Document**  
*Tracking Iterative Revisions from Real Student Testing (N=12)*

---

## Overview

In accordance with requirement **R9 ("3–5 students are asked to find a suitable resource and follow one guide; problems recorded; final version revised")**, this document maintains an exhaustive, traceable audit trail connecting student feedback to concrete code revisions, UI enhancements, and content refinements.

---

## Summary of Revisions

| Revision ID | Source & Evaluator | Student Quote / Identified Issue | Action Taken & Code Changes | Affected Files | Status |
|---|---|---|---|---|---|
| **REV-01** | Student 8 | *"A cleaner comparison layout, and visual indicators to make it easier to compare different tools."* | Added color-coded visual indicator badges across all 12 tools: Friction Level (Gentle Pause to Strict Hard Lockout), Cost Model (100% Free vs Freemium vs Paid), Setup Duration (1 to 5 mins), and Privacy Profile. Added 4 Quick Comparison Presets. Added responsive mobile card view. | `src/pages/Compare.tsx`, `src/data/resources.ts` | ✅ Implemented & Tested |
| **REV-02** | Student 8 | *"A personalized recommendation system based on users' screen time habits would also make the website more helpful."* | Upgraded the Find My Tool wizard from a basic filter into an intelligent 3-step decision engine: added daily screen-time habit selector (<2h, 2–4h, 4–6h, 6–8h, >10h) and intervention style preference. Generates 6-point personalized rationale cards. | `src/pages/FindMyTool.tsx`, `src/utils/scoring.ts` | ✅ Implemented & Tested |
| **REV-03** | Student 6 | *"Give option for Q&A and make it more easier to understand."* | Created an Interactive Digital Wellness Q&A (FAQ) component addressing the top 8 student questions (bypass prevention, blue light science, study blockers, emergency calls, habit inversion, progress tracking). Embedded on Research and Learn pages. | `src/pages/Research.tsx`, `src/data/studentResearch.ts` | ✅ Implemented & Tested |
| **REV-04** | Student 3 | *"A wider variety of tools, both free and paid. More detailed descriptions of each tool's features."* | Added dedicated "Pricing & Inclusions Breakdown" section to every tool profile; explicitly detailed free inclusions vs paywalled features. Added free alternative suggestions for all paid/freemium tools. | `src/pages/ToolDetail.tsx`, `src/pages/FindMyTool.tsx`, `src/data/resources.ts` | ✅ Implemented & Tested |
| **REV-05** | Student 8 & Student 3 | *"A tool that blocks distracting websites and apps during study hours..."* | Added structured study session distraction blocking guidelines; cross-linked Pomodoro timers (Forest) with strict browser blockers (LeechBlock NG) in setup guides. | `src/pages/Guides.tsx`, `src/pages/GuideDetail.tsx`, `src/data/guides.ts` | ✅ Implemented & Tested |
| **REV-06** | Student 4 & Student 6 | *"Could follow guide: With difficulty / Setup instructions clear: No."* | Filled all 37 screenshot slots across all 3 setup guides (3 real Chromium captures, 6 official developer store previews from Mozilla CDN, 28 original workflow diagrams). Added prerequisites, estimated times, and troubleshooting steps. | `public/screenshots/*`, `src/data/assetCredits.ts`, `src/components/ScreenshotSlot.tsx` | ✅ Implemented & Tested |
| **REV-07** | UI Audit & Tester | Button text disappeared on hover on green primary CTA buttons (`.btn-primary`). | Root cause: anchor hover styles (`a:hover`) collided with background color. Fixed in CSS by enforcing `!text-white` with strict specificity across all hover/focus states. | `src/index.css`, `src/components/Header.tsx`, `src/pages/Home.tsx` | ✅ Implemented & Tested |
| **REV-08** | Accessibility Audit | Unintended underline decoration appearing under navbar links. | Reset text-decoration on `.nav-link` and button classes to ensure crisp, accessible header navigation conforming to WCAG 2.4.4. | `src/index.css`, `src/components/Header.tsx` | ✅ Implemented & Tested |
| **REV-09** | UI Audit | Category filter checkbox squashed on "Focus Tools & Browser Extensions" label. | Added `shrink-0 min-w-[1rem] min-h-[1rem]` to all checkbox inputs and flex wrappers to prevent flexbox compression on multi-line category labels. | `src/index.css`, `src/pages/Explore.tsx`, `src/pages/FindMyTool.tsx` | ✅ Implemented & Tested |

---

## Detailed Before-and-After Analysis

### Revision 1: Visual Indicators in Compare (REV-01)
- **Before:** The comparison matrix displayed extensive paragraphs in a 12-column table that required horizontal scrolling and offered no quick visual cues to contrast gentle tools from aggressive blockers.
- **After:**
  - Added four **Quick Comparison Presets**: *Built-in OS Controls*, *Study & Focus Blockers*, *Bedtime & Sleep Routines*, and *Online Privacy Trio*.
  - Added **Visual Badge Ribbons** in row 1: Friction Level (`Gentle Pause`, `Gamified Loss Aversion`, `Passcode Friction`, `Strict Hard Lockout`), Cost Status (`100% Free`, `Freemium`, `Paid`), Setup Time (`1 min`, `2 mins`, `5 mins`), and Privacy Architecture.
  - Implemented responsive mobile cards that cleanly present criteria vertically on smartphones.

### Revision 2: Habit-Aware Recommendation Wizard (REV-02)
- **Before:** The tool matched purely on category and device platform. A student with 12 hours of screen time was given the same suggestions as a student with 1 hour.
- **After:**
  - Integrated pre-testing survey insight: added **Daily Screen Time Intensity** (`<2h`, `2–4h`, `4–6h`, `6–8h`, `>10h`) and **Intervention Preference** (`Friction / Pause`, `Strict Blocking`, `Bedtime Routine`, `Environment Hygiene`).
  - Scored resources with weighted heuristics: students reporting `>10h` usage receive higher ranking for hard lockouts (LeechBlock NG) and habit-inversion tools (one sec).
  - Enriched recommendations with a **6-point transparent rationale card**: Why selected, Problem addressed, Relevant features, Pricing & inclusions, Trade-offs / limitations, and Alternative consideration.

### Revision 3: Interactive Digital Wellness Q&A (REV-03)
- **Before:** Educational content was organized strictly into 8 theoretical concepts without an accessible FAQ for practical daily hurdles.
- **After:**
  - Implemented an interactive accordion Q&A covering the exact doubts raised by Student 6, Student 4, and Student 12 (bypass prevention, blue light vs social media stimulation, study hour whitelisting, cost vs value of paid tools).
  - Grounded each answer in evidence-based research and linked directly to verified tools in the hub.

---

## Verification & Testing Sign-Off

All revisions were audited through:
1. **Automated Unit & Integration Tests:** 43 tests passing in Vitest (`npm test`).
2. **Production Type Safety:** 0 errors in TypeScript compilation (`tsc && vite build`).
3. **Responsive Visual Verification:** Checked at 375px (mobile), 768px (tablet), and 1280px (desktop) viewports.

