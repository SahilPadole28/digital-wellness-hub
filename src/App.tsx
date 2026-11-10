import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, Suspense, lazy } from 'react'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { SkipLink } from './components/SkipLink'

// Lazy-loaded pages for better performance
const Home = lazy(() => import('./pages/Home'))
const Explore = lazy(() => import('./pages/Explore'))
const ToolDetail = lazy(() => import('./pages/ToolDetail'))
const Compare = lazy(() => import('./pages/Compare'))
const FindMyTool = lazy(() => import('./pages/FindMyTool'))
const Guides = lazy(() => import('./pages/Guides'))
const GuideDetail = lazy(() => import('./pages/GuideDetail'))
const Learn = lazy(() => import('./pages/Learn'))
const ConceptDetail = lazy(() => import('./pages/ConceptDetail'))
const About = lazy(() => import('./pages/About'))
const Privacy = lazy(() => import('./pages/Privacy'))
const ProjectEvidence = lazy(() => import('./pages/ProjectEvidence'))
const NotFound = lazy(() => import('./pages/NotFound'))

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[400px]" role="status" aria-label="Loading page">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" aria-hidden="true" />
        <p className="text-sm text-ink-lighter">Loading…</p>
      </div>
    </div>
  )
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <ErrorBoundary>
      <SkipLink />
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main id="main-content" className="flex-1">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/explore/:slug" element={<ToolDetail />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/find" element={<FindMyTool />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/guides/:slug" element={<GuideDetail />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/learn/:slug" element={<ConceptDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/project-evidence" element={<ProjectEvidence />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}

