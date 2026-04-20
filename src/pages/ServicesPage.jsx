import { CatalogSection } from '../components/CatalogSection'
import { ServicesSection } from '../components/ServicesSection'
import { MaterialsSection } from '../components/MaterialsSection'
import { WhyUsSection } from '../components/WhyUsSection'
import { StepsSection } from '../components/StepsSection'
import { PricingSection } from '../components/PricingSection'
import { PromoSection } from '../components/PromoSection'
import { siteContent } from '../data/siteContent'

export function ServicesPage() {
  return (
    <>
      <CatalogSection items={siteContent.curtainTypes}>
        <ServicesSection items={siteContent.services} />
      </CatalogSection>
      <MaterialsSection items={siteContent.materials} />
      <WhyUsSection data={siteContent.whyUs} />
      <StepsSection items={siteContent.steps} />
      <PricingSection data={siteContent.pricing} />
      <PromoSection data={siteContent.promo} />
    </>
  )
}
