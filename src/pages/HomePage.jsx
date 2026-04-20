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
        <div className="container home-next-grid home-next-grid-premium">
          <Link className="home-next-card home-next-card-compact" to="/services">
            <span className="eyebrow eyebrow-dark">Что мы делаем</span>
            <h3>Услуги и виды штор</h3>
            <p>Компактный каталог решений, пошива, карнизов и установки без длинного скролла.</p>
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
            <p>
              Сначала покажем несколько сильных примеров, а дальше можно открыть
              больше живых фотографий из реальных проектов.
            </p>
            <span className="text-link">Смотреть →</span>
          </Link>

          <Link className="home-next-card home-next-card-compact" to="/contacts">
            <span className="eyebrow eyebrow-dark">Связаться</span>
            <h3>Форма и быстрые каналы</h3>
            <p>Оставьте короткий запрос или сразу перейдите к удобному способу связи.</p>
            <span className="text-link">Открыть контакты →</span>
          </Link>
        </div>
      </section>
    </>
  )
}
