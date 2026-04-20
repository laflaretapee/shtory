import { PortfolioSection } from '../components/PortfolioSection'
import { ReviewsSection } from '../components/ReviewsSection'
import { siteContent } from '../data/siteContent'

export function PortfolioPage() {
  return (
    <>
      <PortfolioSection items={siteContent.portfolio} />
      <ReviewsSection items={siteContent.reviews} />
    </>
  )
}
