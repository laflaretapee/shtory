import { useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { MobileStickyActions } from './components/MobileStickyActions'
import { SeoHead } from './components/SeoHead'
import { StructuredData } from './components/StructuredData'
import { HomePage } from './pages/HomePage'
import { ServicesPage } from './pages/ServicesPage'
import { PortfolioPage } from './pages/PortfolioPage'
import { ContactsPage } from './pages/ContactsPage'
import { siteContent } from './data/siteContent'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (typeof window.scrollTo === 'function') {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      } catch {
        /* jsdom may not implement scrollTo */
      }
    }
  }, [pathname])
  return null
}

export function AppShell() {
  return (
    <>
      <SeoHead seo={siteContent.seo} />
      <StructuredData
        companyName={siteContent.companyName}
        seo={siteContent.seo}
        faq={siteContent.faq}
      />

      <ScrollToTop />

      <Header
        companyName={siteContent.companyName}
        navigation={siteContent.navigation}
      />

      <main className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer
        companyName={siteContent.companyName}
        navigation={siteContent.navigation}
        footer={siteContent.footer}
        contacts={siteContent.contacts}
      />
      <MobileStickyActions />
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  )
}
