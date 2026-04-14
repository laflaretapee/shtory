import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { TrustBar } from './components/TrustBar'
import { BenefitsSection } from './components/BenefitsSection'
import { CatalogSection } from './components/CatalogSection'
import { ServicesSection } from './components/ServicesSection'
import { WhyUsSection } from './components/WhyUsSection'
import { StepsSection } from './components/StepsSection'
import { PortfolioSection } from './components/PortfolioSection'
import { PricingSection } from './components/PricingSection'
import { PromoSection } from './components/PromoSection'
import { ReviewsSection } from './components/ReviewsSection'
import { FaqSection } from './components/FaqSection'
import { SeoLocalSection } from './components/SeoLocalSection'
import { LeadFormSection } from './components/LeadFormSection'
import { ContactsSection } from './components/ContactsSection'
import { Footer } from './components/Footer'
import { MobileStickyActions } from './components/MobileStickyActions'
import { SeoHead } from './components/SeoHead'
import { StructuredData } from './components/StructuredData'
import { siteContent } from './data/siteContent'

export default function App() {
  return (
    <>
      <SeoHead seo={siteContent.seo} />
      <StructuredData
        companyName={siteContent.companyName}
        seo={siteContent.seo}
        faq={siteContent.faq}
      />

      <Header
        companyName={siteContent.companyName}
        navigation={siteContent.navigation}
        contacts={siteContent.contacts}
      />

      <main className="page-shell">
        <Hero hero={siteContent.hero} />
        <TrustBar items={siteContent.trustBar} />
        <BenefitsSection items={siteContent.benefits} />
        <CatalogSection items={siteContent.curtainTypes}>
          <ServicesSection items={siteContent.services} />
        </CatalogSection>
        <WhyUsSection data={siteContent.whyUs} />
        <StepsSection items={siteContent.steps} />
        <PortfolioSection items={siteContent.portfolio} />
        <PricingSection data={siteContent.pricing} />
        <PromoSection data={siteContent.promo} />
        <ReviewsSection items={siteContent.reviews} />
        <FaqSection items={siteContent.faq} />
        <SeoLocalSection data={siteContent.localSeo} />
        <LeadFormSection contacts={siteContent.contacts} />
        <ContactsSection data={siteContent.contactsBlock} contacts={siteContent.contacts} />
      </main>

      <Footer
        companyName={siteContent.companyName}
        navigation={siteContent.navigation}
        footer={siteContent.footer}
        contacts={siteContent.contacts}
      />
      <MobileStickyActions contacts={siteContent.contacts} />
    </>
  )
}
