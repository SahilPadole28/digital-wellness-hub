# Digital Wellness Resource Hub
**A curated, evidence-based digital guide and decision tool for college students**  
*College Project 3 · Digital Wellness Course · Academic Year 2026*

[![Live Application](https://img.shields.io/badge/Live_Site-digital--wellness--hub.netlify.app-0f766e?style=for-the-badge&logo=netlify)](https://digital-wellness-hub.netlify.app/)
[![GitHub Repository](https://img.shields.io/badge/GitHub-SahilPadole28%2Fdigital--wellness--hub-1a2332?style=for-the-badge&logo=github)](https://github.com/SahilPadole28/digital-wellness-hub)
[![WCAG 2.2 AA](https://img.shields.io/badge/Accessibility-WCAG_2.2_AA_(100%25)-green?style=for-the-badge)](docs/ACCESSIBILITY_CHECKLIST.md)
[![Tests Passing](https://img.shields.io/badge/Vitest-43%20passed-brightgreen?style=for-the-badge)](src/tests)

---

## 1. Project Overview

The **Digital Wellness Resource Hub** helps university students evaluate, select, and implement practical tools to counter algorithmic distractions, manage daily screen time, protect sleep hygiene, and safeguard digital privacy. Rather than presenting a generic directory of links, the platform operates as an interactive, habit-aware decision engine backed by empirical research and cognitive science.

### Key Capabilities
- **Habit-Aware Recommendation Wizard (`#/find`):** A 3-step decision engine that considers daily screen time intensity (`<2h` to `>10h`), hardware platforms, and preferred intervention styles to generate tailored 6-point evaluation cards.
- **Side-by-Side Comparison Matrix (`#/compare`):** Evaluates candidate tools across 10 standardized criteria with visual indicator badges (Friction Level, Setup Duration, Cost Inclusions, Privacy Architecture) and 4 curated quick comparison presets.
- **Three Complete Setup Guides (`#/guides`):** Practical, numbered walkthroughs covering *Mobile Cue Friction*, *Web Algorithmic Feeds*, and *Nightly Wind-Down Routines*. All 37 screenshot slots are completed using real browser captures, official developer previews, and high-resolution illustrative diagrams with clear attributions.
- **Primary Research & Usability Testing (`#/research`):** Direct presentation and interactive exploration of authentic pre-testing habits and usability feedback gathered from **12 university students** (N=12).
- **Interactive Digital Wellness Q&A:** An evidence-based FAQ addressing practical student hurdles (bypass prevention, blue light vs feed stimulation, emergency call whitelisting).
- **Evidence-Based Academic Curriculum (`#/learn`):** 8 core course concepts (Attention Residue, Dopamine Loops, Habit Inversion, Chitta Bhumi, Sleep Hygiene, Algorithmic Hooking) marked with evidence-strength badges and APA citations.

---

## 2. Live Links & Deployment

- **Live Deployed Website:** [https://digital-wellness-hub.netlify.app/](https://digital-wellness-hub.netlify.app/)
- **GitHub Repository:** [https://github.com/SahilPadole28/digital-wellness-hub](https://github.com/SahilPadole28/digital-wellness-hub)
- **Primary Branch:** `main` (Continuous deployment to Netlify)

---

## 3. Quickstart & Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
```bash
# Clone the repository
git clone https://github.com/SahilPadole28/digital-wellness-hub.git
cd digital-wellness-hub

# Install dependencies
npm install

# Start the local development server
npm run dev
# Open http://localhost:5173 in your browser
```

### Running Automated Tests
```bash
# Run unit and integration tests (43 tests covering scoring, filtering, data integrity, and SSR)
npm test
```

### Production Build
```bash
# Typecheck with TypeScript and build production bundle
npm run build

# Preview the local production build
npm run preview
```

---

## 4. Academic Evidence & Deliverables Directory

All required submission evidence items (R1–R11) are thoroughly documented in `/docs` and accessible through the website's Evidence Index (`#/project-evidence`):

| Deliverable | Document Path | Summary & Description |
|---|---|---|
| **R1 & R10: Student Research Report** | [`docs/STUDENT_RESEARCH_REPORT.md`](docs/STUDENT_RESEARCH_REPORT.md) | Comprehensive analysis of student digital habits, daily screen times, and distraction triggers from 12 student responses. |
| **R2 & R3: Resource Comparison Matrix** | [`docs/RESOURCE_COMPARISON.md`](docs/RESOURCE_COMPARISON.md) | Standardized 10-criteria comparison table across all 12 tools. |
| **R4: Source Verification Report** | [`docs/VERIFICATION_REPORT.md`](docs/VERIFICATION_REPORT.md) | Official vendor sources, checked dates, and honest pricing disclosures. |
| **R5: Asset & Screenshot Credits** | [`docs/ASSET_CREDITS.md`](docs/ASSET_CREDITS.md) | Complete registry of all 37 visual workflow assets, source terms, and captions. |
| **R6: Accessibility Audit Checklist** | [`docs/ACCESSIBILITY_CHECKLIST.md`](docs/ACCESSIBILITY_CHECKLIST.md) | WCAG 2.2 Level AA compliance verification, contrast ratios, and screen reader testing. |
| **R8: Link Test Record** | [`docs/LINK_TEST_RECORD.md`](docs/LINK_TEST_RECORD.md) | 100% operational status verification of all internal and external links. |
| **R9 & R10: Usability Testing Report** | [`docs/USABILITY_TESTING_REPORT.md`](docs/USABILITY_TESTING_REPORT.md) | Task performance metrics, verbatim quotes, and usability evaluations (N=12). |
| **R9 & R10: Iterative Revision Log** | [`docs/REVISION_LOG.md`](docs/REVISION_LOG.md) | Traceable audit mapping student feedback to implemented code and design changes. |
| **R10: Final Academic Project Report** | [`docs/FINAL_PROJECT_REPORT.md`](docs/FINAL_PROJECT_REPORT.md) | Full 13-section formal project submission document. |
| **R10: Presentation Outline** | [`docs/PRESENTATION_OUTLINE.md`](docs/PRESENTATION_OUTLINE.md) | Slide-by-slide structure for academic oral presentation. |
| **R11: AI Assistance Acknowledgement** | [`docs/AI_ACKNOWLEDGEMENT.md`](docs/AI_ACKNOWLEDGEMENT.md) | Formal declaration of AI tool usage, scope, human review, and ethical compliance. |
| **Master Requirements Checklist** | [`docs/REQUIREMENTS_CHECKLIST.md`](docs/REQUIREMENTS_CHECKLIST.md) | Final audit checklist verifying 100% completion of R1–R11. |
| **Architectural Decisions Log** | [`docs/DECISIONS.md`](docs/DECISIONS.md) | Rationale for decisions D1 through D16. |

---

## 5. Technology Stack & Ethics

- **Framework:** React 18 + TypeScript 5 + Vite 5
- **Styling:** Tailwind CSS (Custom ink-teal-sand palette conforming to WCAG 2.2 AA)
- **Routing:** React Router DOM (HashRouter for seamless static host compatibility)
- **Icons:** Lucide React (Clean, accessible SVG iconography with `aria-hidden="true"`)
- **Typography:** Inter (100% self-hosted via `@fontsource/inter` on same origin)
- **Testing:** Vitest 2 + React DOM Server SSR suite
- **Zero-Tracking Ethical Architecture:**
  - Zero analytics or telemetry tracking (no Google Analytics, no tracking pixels)
  - Zero cookies or local storage tracking
  - Zero external third-party CDN requests
  - 100% static, client-side execution deployable to Netlify, GitHub Pages, or Vercel

---

## 6. License & Course Attribution

Developed for **Project 3: Digital Wellness Resource Hub**. Code is released under the MIT License. All evaluated trademarks, logos, and vendor assets remain the intellectual property of their respective owners and are cited strictly under fair use for non-commercial educational review.
