# AI Assistance Acknowledgement
**Digital Wellness Resource Hub · Project 3 · Digital Wellness Course**

---

## For inclusion in project submission and on the About page

This project used AI coding assistance in the following ways:

### Tool used
**Antigravity AI** (powered by Google DeepMind / Claude Sonnet 4.6)
Session date: 2026-11-09 to 2026-11-10

### What the AI generated

1. **Project scaffold and architecture**
   - React + TypeScript + Vite + Tailwind CSS project structure
   - Component architecture (Header, Footer, ToolCard, GuideStep, Compare table, Finder wizard, etc.)
   - React Router setup with HashRouter for static deployment

2. **Data files (initial drafts)**
   - `src/data/resources.ts` — 12 tool entries with all comparison criteria, sourced from official documentation during the same AI session
   - `src/data/concepts.ts` — 8 course concept explanations with evidence labels and academic source citations
   - `src/data/guides.ts` — 3 setup guide structures with step drafts from official Apple, Google, and vendor documentation

3. **Utility functions**
   - `src/utils/scoring.ts` — finder scoring algorithm (pure functions)
   - `src/utils/filters.ts` — explore page filter logic (pure functions)

4. **All pages and components** — initial code for all 12 pages and all shared components

5. **Documentation templates**
   - Requirements checklist
   - Verification report
   - Accessibility checklist
   - Usability testing protocol
   - User feedback template
   - Change log template
   - Student needs discussion template
   - Student TODO list
   - Report outline
   - Presentation outline
   - Screenshot guide

6. **Build scripts**
   - `scripts/checkData.mjs` — data validation and verification report generator
   - `scripts/checkLinks.mjs` — external link checker

### What the AI did NOT do

- Did not conduct live web research against official tool websites (web search results were used as a starting point; students must manually verify all tool information)
- Did not capture real screenshots (all screenshots are placeholder slots)
- Did not conduct real usability testing
- Did not run real accessibility audits (templates only)
- Did not write the final report or presentation slides
- Did not make decisions about tool selection (shortlist was provided in the prompt)

### What students must do before submission

All items in `/docs/STUDENT_TODO.md` remain the responsibility of the student team. The AI-generated content is a scaffold and draft — students must verify, test, revise, and take ownership of the final submitted work.

### Source acknowledgement

Tool information was drafted using the following process during the AI session:
- Official websites and documentation pages were checked via web search
- Facts were sourced only from official sources where available
- Items not fully confirmable were marked `needs_manual_verification`
- No tool facts were invented or guessed

All source URLs and check dates are recorded in `src/data/resources.ts` and visible on each tool's detail page.

---

*This acknowledgement should appear in the report's references section and on the site's About page.*

