# Accessibility Checklist — Digital Wellness Resource Hub
**Based on WCAG 2.2 Level AA**
Date of automated check: 2026-11-10
Manual testing to be completed by student team.

> Fill in Pass / Fail / Notes for each item based on actual testing.
> Automated check results (axe/Lighthouse) are listed separately from manual results.

---

## Automated Check Results
Run after `npm run build && npm run preview`:
- [ ] Run Lighthouse accessibility audit — record score
- [ ] Run axe DevTools browser extension — record issues
- [ ] Record results here with tool name and date

| Tool | Score/Result | Date | Tester |
|------|-------------|------|--------|
| Lighthouse | — | — | — |
| axe DevTools | — | — | — |

---

## Manual Checklist

### 1. Colour Contrast (WCAG 1.4.3 / 1.4.11)

| Item | Requirement | Pass/Fail | Notes |
|------|-------------|-----------|-------|
| Body text on background | ≥ 4.5:1 | — | ink (#1a2332) on sand-50 (#fdf9f4) — verify |
| Large text (18pt+) | ≥ 3:1 | — | — |
| UI components (buttons, borders) | ≥ 3:1 | — | — |
| Badge text | ≥ 4.5:1 | — | green-800 on green-50 — verify |
| Navigation active state | ≥ 4.5:1 | — | teal-600 on teal-50 — verify |
| Placeholder text | ≥ 4.5:1 | — | ink-lighter — verify |
| Link text | ≥ 4.5:1 | — | teal-600 on white — verify |

### 2. Keyboard Operation (WCAG 2.1)

| Item | Requirement | Pass/Fail | Notes |
|------|-------------|-----------|-------|
| All interactive elements reachable by Tab | Yes | — | — |
| Logical tab order | Yes | — | — |
| No keyboard trap | Yes | — | — |
| Skip link visible on focus | Yes | — | — |
| Mobile menu keyboard-operable | Yes | — | — |
| Finder wizard keyboard-operable | Yes | — | — |
| Compare tool keyboard-operable | Yes | — | — |
| Filter checkboxes keyboard-operable | Yes | — | — |
| External links openable by keyboard | Yes | — | — |

### 3. Focus Visibility (WCAG 2.4.7 / 2.4.11)

| Item | Requirement | Pass/Fail | Notes |
|------|-------------|-----------|-------|
| All focused elements have visible outline | Yes | — | CSS: focus-visible ring |
| Focus outline contrast ≥ 3:1 | Yes | — | teal-600 outline — verify |
| No focus outline removed without replacement | Yes | — | — |

### 4. Headings & Landmarks (WCAG 1.3.1 / 2.4.1)

| Item | Requirement | Pass/Fail | Notes |
|------|-------------|-----------|-------|
| Page has one `<h1>` | Yes | — | — |
| Heading hierarchy logical (no skipped levels) | Yes | — | — |
| `<header>` landmark present | Yes | — | — |
| `<main>` landmark present | Yes | — | id="main-content" |
| `<footer>` landmark present | Yes | — | — |
| `<nav>` landmark with label | Yes | — | aria-label on nav |
| `<aside>` landmark labelled where present | Yes | — | — |

### 5. Link Text (WCAG 2.4.4)

| Item | Requirement | Pass/Fail | Notes |
|------|-------------|-----------|-------|
| No "click here" or "read more" links | Yes | — | Verify throughout |
| External links identify destination | Yes | — | "Official site for X (opens in new tab)" |
| External links marked with (opens in new tab) | Yes | — | aria-label |
| Links distinguishable from body text | Yes | — | underline + colour |

### 6. Alt Text (WCAG 1.1.1)

| Item | Requirement | Pass/Fail | Notes |
|------|-------------|-----------|-------|
| All informative images have alt text | Yes | — | ScreenshotSlot has alt prop |
| Decorative images have empty alt="" | Yes | — | Verify icons |
| Lucide icons used as decorative have aria-hidden | Yes | — | aria-hidden="true" on icons |

### 7. Form Labels (WCAG 1.3.1 / 4.1.2)

| Item | Requirement | Pass/Fail | Notes |
|------|-------------|-----------|-------|
| Search input labelled | Yes | — | htmlFor on label |
| All checkboxes labelled | Yes | — | Verify filter bar |
| Select elements labelled | Yes | — | aria-label on compare selector |
| Error messages associated with controls | Yes | — | — |

### 8. Dynamic Content (WCAG 4.1.3)

| Item | Requirement | Pass/Fail | Notes |
|------|-------------|-----------|-------|
| Filter result count announced | Yes | — | aria-live="polite" on result count |
| Finder results announced | Yes | — | Verify |
| Compare table updates announced | Yes | — | — |
| Loading spinner has role="status" | Yes | — | — |

### 9. Reflow & Zoom (WCAG 1.4.4 / 1.4.10)

| Item | Requirement | Pass/Fail | Notes |
|------|-------------|-----------|-------|
| Content readable at 200% zoom | Yes | — | Test manually |
| Content readable at 400% zoom (reflow) | Yes | — | No horizontal scroll required |
| Text resizable without assistive technology | Yes | — | em/rem units |

### 10. Reduced Motion (WCAG 2.3.3)

| Item | Requirement | Pass/Fail | Notes |
|------|-------------|-----------|-------|
| prefers-reduced-motion respected | Yes | — | CSS in index.css |
| No autoplay animations | Yes | — | — |
| No infinite looping effects | Yes | — | — |

### 11. Touch Targets (WCAG 2.5.5)

| Item | Requirement | Pass/Fail | Notes |
|------|-------------|-----------|-------|
| All interactive elements ≥ 44×44px | Yes | — | .min-touch class used on mobile menu |
| Nav links ≥ 44px height | Yes | — | Verify |
| Filter checkboxes ≥ 44px target area | Yes | — | Verify |

### 12. Screen Reader Spot Check

Test with VoiceOver (macOS/iOS) or NVDA (Windows):

| Item | Expected | Pass/Fail | Notes | Tester |
|------|----------|-----------|-------|--------|
| Page title announced on navigation | Yes | — | — | — |
| Skip link announced | Yes | — | — | — |
| Navigation announced with label | "Main navigation" | — | — | — |
| Tool cards announce name and role | Yes | — | — | — |
| Comparison table headers announced | Yes | — | — | — |
| Finder step choices announced | Yes | — | — | — |
| Screenshot placeholders announced | Yes | — | role="img" with label | — |
| Evidence badges described | Yes | — | badge text readable | — |

---

## Notes

- This checklist was designed for WCAG 2.2 Level AA compliance.
- Automated checks do not catch all issues — manual testing is essential.
- Document the name of the tester and the browser/OS/screen reader used for each manual check.
- For the submission accessibility checklist, complete all Pass/Fail/Notes columns.

**Tester:** ________________________
**Browser + OS:** ________________________
**Screen reader (if used):** ________________________
**Date tested:** ________________________

