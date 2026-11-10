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

