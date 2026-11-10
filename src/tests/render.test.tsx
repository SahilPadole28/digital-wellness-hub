import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Explore from '../pages/Explore'
import ToolDetail from '../pages/ToolDetail'
import Compare from '../pages/Compare'
import FindMyTool from '../pages/FindMyTool'
import Guides from '../pages/Guides'
import GuideDetail from '../pages/GuideDetail'
import Learn from '../pages/Learn'
import ConceptDetail from '../pages/ConceptDetail'
import About from '../pages/About'
import Privacy from '../pages/Privacy'
import ProjectEvidence from '../pages/ProjectEvidence'
import NotFound from '../pages/NotFound'
import { resources } from '../data/resources'
import { concepts } from '../data/concepts'
import { guides } from '../data/guides'

describe('Full Server-Side Rendering of All Pages and States', () => {
  it('renders Home without crashing', () => {
    const html = renderToString(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    )
    expect(html).toContain('Take back your attention')
  })

  it('renders Explore with and without query params', () => {
    const html1 = renderToString(
      <MemoryRouter initialEntries={['/explore']}>
        <Explore />
      </MemoryRouter>
    )
    expect(html1).toContain('Explore tools')

    const html2 = renderToString(
      <MemoryRouter initialEntries={['/explore?cat=focus&plat=chrome&cost=free']}>
        <Explore />
      </MemoryRouter>
    )
    expect(html2).toContain('Explore tools')
  })

  it('renders ToolDetail for all 12 tools without crashing', () => {
    resources.forEach(r => {
      const html = renderToString(
        <MemoryRouter initialEntries={[`/explore/${r.slug}`]}>
          <Routes>
            <Route path="/explore/:slug" element={<ToolDetail />} />
          </Routes>
        </MemoryRouter>
      )
      expect(html).toContain(r.name.replace(/&/g, '&amp;'))
    })
  })

  it('renders Compare in empty, partial, and full states', () => {
    // Empty
    const htmlEmpty = renderToString(
      <MemoryRouter initialEntries={['/compare']}>
        <Compare />
      </MemoryRouter>
    )
    expect(htmlEmpty).toContain('Compare tools')

    // 1 tool
    const htmlOne = renderToString(
      <MemoryRouter initialEntries={['/compare?ids=ios-screen-time']}>
        <Compare />
      </MemoryRouter>
    )
    expect(htmlOne).toContain('Select at least 2 tools')

    // 2 tools
    const htmlTwo = renderToString(
      <MemoryRouter initialEntries={['/compare?ids=ios-screen-time,leechblock-ng']}>
        <Compare />
      </MemoryRouter>
    )
    expect(htmlTwo).toContain('Side-by-side comparison')

    // 4 tools
    const htmlFour = renderToString(
      <MemoryRouter initialEntries={['/compare?ids=ios-screen-time,leechblock-ng,flux,signal']}>
        <Compare />
      </MemoryRouter>
    )
    expect(htmlFour).toContain('Side-by-side comparison')
  })

  it('renders FindMyTool wizard in default and various result selections', () => {
    // Wizard step 1 default
    const htmlDefault = renderToString(
      <MemoryRouter initialEntries={['/find']}>
        <FindMyTool />
      </MemoryRouter>
    )
    expect(htmlDefault).toContain('Find the right tool')

    // Selection 1: Scrolling on iPhone
    const html1 = renderToString(
      <MemoryRouter initialEntries={['/find?concern=scrolling&platforms=ios']}>
        <FindMyTool />
      </MemoryRouter>
    )
    expect(html1).toContain('Your recommendations')
    expect(html1).toContain('Why this fits you')

    // Selection 2: Focus on Android, free only
    const html2 = renderToString(
      <MemoryRouter initialEntries={['/find?concern=focus&platforms=android&freeOnly=1']}>
        <FindMyTool />
      </MemoryRouter>
    )
    expect(html2).toContain('Your recommendations')

    // Selection 3: Sleep on Windows
    const html3 = renderToString(
      <MemoryRouter initialEntries={['/find?concern=sleep&platforms=windows']}>
        <FindMyTool />
      </MemoryRouter>
    )
    expect(html3).toContain('Your recommendations')

    // Selection 4: Privacy with open-source preference
    const html4 = renderToString(
      <MemoryRouter initialEntries={['/find?concern=privacy&openSource=1']}>
        <FindMyTool />
      </MemoryRouter>
    )
    expect(html4).toContain('Your recommendations')

    // Selection 5: No matches (impossible combo)
    const htmlEmpty = renderToString(
      <MemoryRouter initialEntries={['/find?concern=privacy&platforms=linux&freeOnly=1']}>
        <FindMyTool />
      </MemoryRouter>
    )
    expect(htmlEmpty).toContain('Your recommendations')
  })

  it('renders Guides overview without crashing', () => {
    const html = renderToString(
      <MemoryRouter initialEntries={['/guides']}>
        <Guides />
      </MemoryRouter>
    )
    expect(html).toContain('Student setup guides')
  })

  it('renders GuideDetail for all 3 guides without crashing', () => {
    guides.forEach(g => {
      const html = renderToString(
        <MemoryRouter initialEntries={[`/guides/${g.slug}`]}>
          <Routes>
            <Route path="/guides/:slug" element={<GuideDetail />} />
          </Routes>
        </MemoryRouter>
      )
      expect(html).toContain(g.title)
      expect(html).toContain('<img')
      expect(html).toContain('alt="')
      expect(html).toContain('Source:')
    })
  })

  it('renders Learn overview without crashing', () => {
    const html = renderToString(
      <MemoryRouter initialEntries={['/learn']}>
        <Learn />
      </MemoryRouter>
    )
    expect(html).toContain('Learn: the concepts behind digital wellness')
  })

  it('renders ConceptDetail for all 8 concepts without crashing', () => {
    concepts.forEach(c => {
      const html = renderToString(
        <MemoryRouter initialEntries={[`/learn/${c.slug}`]}>
          <Routes>
            <Route path="/learn/:slug" element={<ConceptDetail />} />
          </Routes>
        </MemoryRouter>
      )
      expect(html).toContain(c.title.replace(/&/g, '&amp;'))
    })
  })

  it('renders About, Privacy, ProjectEvidence, and NotFound without crashing', () => {
    const aboutHtml = renderToString(
      <MemoryRouter initialEntries={['/about']}>
        <About />
      </MemoryRouter>
    )
    expect(aboutHtml).toContain('About this hub')

    const privacyHtml = renderToString(
      <MemoryRouter initialEntries={['/privacy']}>
        <Privacy />
      </MemoryRouter>
    )
    expect(privacyHtml).toContain('Privacy')

    const evidenceHtml = renderToString(
      <MemoryRouter initialEntries={['/project-evidence']}>
        <ProjectEvidence />
      </MemoryRouter>
    )
    expect(evidenceHtml).toContain('Project Evidence')

    const notFoundHtml = renderToString(
      <MemoryRouter initialEntries={['/404']}>
        <NotFound />
      </MemoryRouter>
    )
    expect(notFoundHtml).toContain('Page not found')
  })
})
