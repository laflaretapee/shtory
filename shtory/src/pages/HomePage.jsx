import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { TrustBar } from '../components/TrustBar'
import { BenefitsSection } from '../components/BenefitsSection'
import { siteContent } from '../data/siteContent'

export function HomePage() {
  const topBenefits = siteContent.benefits.slice(0, 3)

  return (
    <>
      <Hero hero={siteContent.hero} />
      <TrustBar items={siteContent.trustBar} />
      <BenefitsSection items={topBenefits} />

      <section className="section section-warm home-next">
        <div className="container home-next-grid">
          <Link className="home-next-card" to="/services">
            <span className="eyebrow eyebrow-dark">Что мы делаем</span>
            <h3>Услуги и виды штор</h3>
            <p>Каталог, пошив, карнизы, установка и цены — в одном разделе.</p>
            <span className="text-link">Перейти →</span>
          </Link>
          <Link className="home-next-card home-next-card-portfolio" to="/portfolio">
            <img
              alt={siteContent.portfolio[0].alt}
              className="home-next-preview"
              src={siteContent.portfolio[0].image}
            />
            <span className="eyebrow eyebrow-dark">Наши работы</span>
            <h3>Портфолио с реальными фото</h3>
            <p>Посмотрите, как выглядят готовые решения с живой посадкой ткани и фактурой в интерьере.</p>
            <span className="text-link">Смотреть →</span>
          </Link>
          <Link className="home-next-card" to="/contacts">
            <span className="eyebrow eyebrow-dark">Связаться</span>
            <h3>Мессенджеры и VK</h3>
            <p>Скопируйте готовое сообщение и напишите удобным способом, когда будете готовы.</p>
            <span className="text-link">Открыть контакты →</span>
          </Link>
        </div>
      </section>
    </>
  )
}
