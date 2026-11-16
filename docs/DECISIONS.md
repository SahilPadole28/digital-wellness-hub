# Decisions Log — Digital Wellness Resource Hub
**All major design and technical decisions with reasoning**

---

## D1 — Tech stack: Vite + React + TypeScript + Tailwind CSS
**Date:** 2026-11-09
**Decision:** Use Vite + React + TypeScript + Tailwind CSS + React Router
**Reasoning:**
- Vite provides fast dev server and optimised production build
- React ecosystem is familiar to most web developers
- TypeScript catches data-shape errors early — critical for a data-heavy site with 12 tools, 8 concepts, 3 guides
- Tailwind CSS allows a complete design system in config without CSS files per component
- HashRouter enables static deployment to any host without server-side rewrites (GitHub Pages, Netlify, Vercel)
- No backend required — the brief specifies a static deployable "website link"

---

## D2 — Data model: local TypeScript files (not JSON)
**Date:** 2026-11-09
**Decision:** Store all resource, concept, and guide data as typed TypeScript files in `src/data/`
**Reasoning:**
- TypeScript provides compile-time type checking on every field
- Easier for students to edit than a JSON schema + validator
- No build-time processing or database needed
- IDE autocomplete helps students add new tools correctly
- Alternative (JSON) would need a separate type definition file anyway

---

## D3 — HashRouter for routing
**Date:** 2026-11-09
**Decision:** Use `HashRouter` (URL hash routing) rather than `BrowserRouter`
**Reasoning:**
- Static hosts (GitHub Pages, Netlify without config) serve only `index.html` for the root path
- Hash routing makes all routes work without any server configuration
- Share-by-URL still works for Compare and Find My Tool because params go into the hash
- Tradeoff: URLs contain `#` — acceptable for a student project static site

---

## D4 — 12 tools across 4 categories
**Date:** 2026-11-09
**Decision:** Select 12 tools: 3 per category (Screen Time, Focus, Sleep, Privacy)
**Reasoning:**
- R2 requires 8–12 tools; 12 gives good coverage and meaningful comparisons
- 3 per category ensures each category has at least 2 (required) with one more
- Chosen tools represent the range: free (iOS Screen Time, Android DW, uBlock), freemium (one sec), paid (Forest iOS), open-source (LeechBlock, News Feed Eradicator, Signal)
- Forest classified as freemium/paid because iOS requires purchase — R4 compliance (never label "free" if core features require payment)

---

## D5 — uBlock Origin treatment (Chrome MV3 situation)
**Date:** 2026-11-09
**Decision:** Represent uBlock Origin as one entry covering both full uBO (Firefox) and uBlock Origin Lite (Chrome/Edge), with the platform split clearly documented
**Reasoning:**
- uBO (MV2) is permanently disabled in Chrome as of mid-2025 — this is a critical honest limitation
- uBOL (MV3) is the official alternative for Chrome/Edge — same developer, same filter lists
- Keeping as one entry avoids confusion while being transparent about the difference
- Alternative (two separate entries) would inflate tool count and obscure the relationship

---

## D6 — Evidence label system for Learn section
**Date:** 2026-11-09
**Decision:** Four evidence labels with distinct colours: Well supported / Supported, simplified here / Mixed or limited evidence / Philosophical framework
**Reasoning:**
- Prompt requires scientific accuracy and labelling strength of evidence
- Four levels cover the range from neuroscience consensus (attention residue) to simplified popular models (dopamine loop) to philosophical frameworks (Patanjali's Chitta Bhumi)
- Labels appear as visible badges on concept cards and detail pages — not buried in text
- Colour + text encoding means colour-blind users still get the information

---

## D7 — Screenshot slot placeholder components
**Date:** 2026-11-09
**Decision:** Implement a `ScreenshotSlot` component that tries to load a real image and falls back to a visible, labelled placeholder
**Reasoning:**
- R5 requires screenshots but prohibits fabricated screenshots
- Honesty rules (section 2) explicitly forbid mock-up product screenshots
- The component enables the site to be fully functional and deployable before screenshots are captured
- Placeholder clearly labels what is missing and links to the guide for capturing them
- Students can drop in real screenshots without editing any code

---

## D8 — Design system: calm, trustworthy, not "wellness-app cliché"
**Date:** 2026-11-09
**Decision:** Ink-teal primary palette, warm sand background, restrained typography, no heavy gradients or card-for-everything layout
**Reasoning:**
- This is a digital-wellness site — it should itself be calm, not attention-grabbing
- Avoids the common pitfall of wellness app design (pastel, rounded, childish)
- Editorial layouts (prose + tables where data communicates better than cards) distinguish it from a "template site"
- The primary CTA colour (teal-600) is consistent and not overused
- Section 10 of the prompt specifically warns against "generic AI-looking layouts" and "heavy gradients"

---

## D9 — No tracking, no CDN, self-hosted fonts
**Date:** 2026-11-09
**Decision:** No Google Analytics, no third-party CDN fonts, no cookie banners, no tracking
**Reasoning:**
- R11 explicitly prohibits personal-data collection, analytics, tracking, cookies, third-party embeds
- A digital-wellness site that tracks users is hypocritical and would undermine trust
- Self-hosted fonts (Inter via @fontsource) load from the same server — no Google Fonts request
- Students need to know the site makes no external requests beyond the static files

---

## D10 — Pure functions for scoring and filtering (testable)
**Date:** 2026-11-09
**Decision:** Implement `scoreResources()` and `filterResources()` as pure functions in `src/utils/`
**Reasoning:**
- R8 / section 8 of the prompt requires unit tests for filter/search/scoring logic
- Pure functions with no side effects are trivially unit-testable with Vitest
- Transparent scoring weights documented in code comments
- Students can audit and modify the scoring weights easily

---

## D11 — DECISIONS.md itself (this file)
**Date:** 2026-11-09
**Decision:** Maintain a decisions log per prompt requirement (section 11, step 2)
**Reasoning:** The prompt requires all decisions to be recorded with reasoning. This file is that record.

---

## D12 — Empirical Student Research Ingestion & Anonymization
**Date:** 2026-11-16
**Decision:** Ingest all 12 authentic student responses from `Digital Wellness and Website Testing Feedback (Responses).xlsx` directly into `docs/student_feedback_responses.csv` and a typed TypeScript file `src/data/studentResearch.ts`, creating a dedicated `/research` page.
**Reasoning:**
- Fulfills mandatory requirements R1 ("Define a student audience and its main needs via discussion/feedback activity") and R9/R10 without fabricating data.
- Anonymizes participants strictly as Student 1 through Student 12 to guarantee academic privacy.
- Accurately computes sample statistics (e.g. 41.7% with >10h screen time; 91.7% struggling with screen time; 58.3% first-time tool users).
- Exposes unvarnished data to students, instructors, and examiners via an interactive public ledger.

---

## D13 — Visual Badges & Presets in Side-by-Side Comparison Matrix
**Date:** 2026-11-16
**Decision:** Enhance the `/compare` page with color-coded visual indicator badges (Friction Level, Cost Model, Setup Duration, Privacy Profile) and 4 curated quick comparison presets (*Built-in OS Controls*, *Study Blockers*, *Bedtime Routines*, *Privacy Trio*), plus responsive vertical cards for mobile viewports.
**Reasoning:**
- Directly addresses usability feedback from Student 8 ("A cleaner comparison layout, and visual indicators to make it easier to compare different tools") and Student 3 ("A wider variety of tools... more detailed descriptions").
- Reduces cognitive friction by allowing students to see the trade-offs at a glance rather than wading through dense text tables.
- Presets provide 1-click entry points into the most common academic dilemmas (e.g. built-in OEM timers vs dedicated focus blockers).

---

## D14 — Habit-Aware Recommendation Wizard with 6-Point Rationale Cards
**Date:** 2026-11-16
**Decision:** Upgrade `/find` from a simple category/device filter into an intelligent 3-step decision wizard incorporating daily screen time intensity (<2h, 2–4h, 4–6h, 6–8h, >10h) and intervention preference (Friction/Pause, Strict Blocking, Bedtime Routine, Environment Hygiene). Renders a comprehensive 6-point rationale card per matched tool.
**Reasoning:**
- Directly addresses Student 8's feedback ("A personalized recommendation system based on users' screen time habits").
- Differentiates students with extreme screen time (>10h) who need hard lockouts (LeechBlock NG) or habit interruption (one sec) from students who only need gentle timers.
- The 6-point rationale card explains: (1) Why selected, (2) Problem addressed, (3) Relevant features, (4) Pricing & inclusions, (5) Trade-offs & limitations, and (6) Alternative considerations, fulfilling R7's mandate to "help students make informed choices rather than simply display a list of links".

---

## D15 — Interactive Digital Wellness Q&A (FAQ) Component
**Date:** 2026-11-16
**Decision:** Design and embed an interactive accordion Q&A answering the top 8 recurring student dilemmas across academic digital wellness.
**Reasoning:**
- Directly fulfills Student 6's feedback ("Give option for Q&A and make it more easier to understand").
- Answers practical questions that students face daily (e.g. "Why can I easily bypass built-in Screen Time limits?", "Does blue light actually ruin sleep compared to stressful feeds?", "How do I whitelist family emergency calls during study sessions?").
- Bridges academic theory (habit inversion, Patanjali's Chitta Bhumi, attention residue) with practical daily student tactics.

---

## D16 — 37-Slot Privacy-Safe Screenshot & Diagram Architecture
**Date:** 2026-11-16
**Decision:** Resolve all 37 screenshot slots across the 3 setup guides using: (1) 3 headless Chromium captures of public store/settings pages, (2) 6 official developer store previews from Mozilla CDN, and (3) 28 original, high-resolution illustrative workflow diagrams clearly labelled `"ILLUSTRATIVE DIAGRAM — NOT A PRODUCT SCREENSHOT"`. Cataloged in `src/data/assetCredits.ts` and `docs/ASSET_CREDITS.md` with visible captions.
**Reasoning:**
- Satisfies R5 (all setup guides complete with visual reference points) while strictly adhering to the honesty rules prohibiting fake or fabricated product UI screenshots.
- Zero private or identifying student data in any visual asset.
- Every borrowed image carries a visible attribution caption with source name, URL, and date accessed.
- Every original diagram provides clear pedagogical schematic value without pretending to be vendor software.


