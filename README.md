# Digital Wellness Resource Hub

A curated digital wellness resource hub helping college students choose and use practical tools for managing screen time, focus, sleep, and online privacy. Project 3 — Digital Wellness Course.

**Live site:** [deploy URL — to be added after deployment]

---

## Quick start

```bash
npm install
npm run dev        # start dev server at http://localhost:5173
```

## Build for production

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

## Data validation & link checking

```bash
npm run check:data   # validate data, list needs_manual_verification fields → /docs/VERIFICATION_REPORT.md
npm run check:links  # check all external links → /docs/LINK_TEST_RECORD.md
```

## Run tests

```bash
npm test           # run unit tests (scoring and filter functions)
```

---

## Deployment

### GitHub Pages

1. Build: `npm run build`
2. Push `/dist` to the `gh-pages` branch, or use a GitHub Action:
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy
   on:
     push:
       branches: [main]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with: { node-version: '20' }
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v4
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```
3. In GitHub repo Settings → Pages → Source: Deploy from branch `gh-pages`

> The site uses `HashRouter` so all routes work on static hosts without server-side rewrites.

### Netlify

1. Connect your GitHub repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. No additional configuration needed (HashRouter handles routing)

### Vercel

1. Import the GitHub repo in Vercel
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

---

## How to add or update a tool

1. Open `src/data/resources.ts`
2. Add a new entry following the `Resource` interface
3. Fill in all required fields (see existing entries as a model)
4. Mark any unverified fields with `verificationStatus: 'needs_manual_verification'`
5. Add source URLs with `checkedOn` dates
6. Run `npm run check:data` to validate
7. The tool will appear automatically in Explore, Find My Tool, Compare, and all filters

## How to update an existing tool

1. Find the tool in `src/data/resources.ts` by its `id`
2. Update the relevant fields
3. Update `verifiedOn` to today's date
4. Update `verificationStatus` fields
5. Update the `sources[]` array with the new source URL and date

## How to add screenshots to a guide

1. Capture screenshots following `/docs/SCREENSHOT_GUIDE.md` (privacy-safe process)
2. Save as: `/public/screenshots/<guide-id>/<step-file>.png`
3. The `ScreenshotSlot` component will automatically show the image instead of the placeholder
4. Update the guide's `lastTestedOn` and `writtenBy` fields in `src/data/guides.ts`

---

## Project structure

```
d:\DW_Project\
├── docs/                          # Project evidence and documentation
│   ├── REQUIREMENTS_CHECKLIST.md  # R1–R11 mapped to implementations
│   ├── VERIFICATION_REPORT.md     # Auto-generated data validation report
│   ├── LINK_TEST_RECORD.md        # Auto-generated link check results
│   ├── ACCESSIBILITY_CHECKLIST.md # WCAG 2.2 AA manual checklist
│   ├── USABILITY_TESTING_PROTOCOL.md
│   ├── USER_FEEDBACK_TEMPLATE.md
│   ├── CHANGE_LOG_TEMPLATE.md
│   ├── STUDENT_NEEDS_DISCUSSION_TEMPLATE.md
│   ├── STUDENT_TODO.md            # What only students can complete
│   ├── SCREENSHOT_GUIDE.md        # How to capture privacy-safe screenshots
│   ├── AI_ACKNOWLEDGEMENT.md
│   ├── REPORT_OUTLINE.md
│   └── PRESENTATION_OUTLINE.md
├── public/
│   ├── favicon.svg
│   └── screenshots/              # Student-captured guide screenshots go here
│       ├── cue-friction/
│       ├── algorithmic-cues/
│       └── wind-down/
├── scripts/
│   ├── checkData.mjs             # Data validation script
│   └── checkLinks.mjs            # External link checker
├── src/
│   ├── components/               # Shared React components
│   ├── data/                     # Typed data files (resources, concepts, guides)
│   ├── pages/                    # One file per route
│   ├── utils/                    # Pure filter/scoring functions
│   ├── App.tsx                   # Router and layout
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Tailwind + design system
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## Tech stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI framework |
| TypeScript | 5 | Type safety |
| Vite | 5 | Build tool |
| Tailwind CSS | 3 | Utility CSS |
| React Router | 6 (HashRouter) | Client-side routing |
| Lucide React | latest | Icons |
| Inter (@fontsource) | 5 | Self-hosted font |
| Vitest | 2 | Unit testing |

No backend. No database. No auth. No analytics. No tracking. Fully static.

---

## Decisions record

See `/docs/DECISIONS.md` for all major design and technical decisions with reasoning.

## AI assistance

This codebase was scaffolded with AI assistance. See `/docs/AI_ACKNOWLEDGEMENT.md` and the About page for full details.
This is the end of the project.
