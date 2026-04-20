import { useState } from 'react'
import { motion } from 'framer-motion'

const INITIAL_COUNT = 3
const STEP = 3

export function PortfolioSection({ items }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const visibleItems = items.slice(0, visibleCount)
  const hasMore = visibleCount < items.length

  return (
    <section className="section" id="portfolio">
      <div className="container">
        <div className="section-intro">
          <p className="eyebrow eyebrow-dark">Портфолио</p>
          <h2>Наши работы</h2>
          <p>
            На странице только реальные фотографии. Сначала показываем несколько
            сильных примеров, а дальше можно открыть больше работ.
          </p>
        </div>

        <div className="cards-grid portfolio-grid portfolio-grid-large">
          {visibleItems.map((item, index) => (
            <motion.article
              key={item.image}
              className={index === 0 ? 'portfolio-card portfolio-card-large portfolio-card-featured' : 'portfolio-card portfolio-card-large'}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.06 }}
            >
              <img
                alt={item.alt}
                className="portfolio-media portfolio-media-large"
                loading="lazy"
                src={item.image}
              />
              <div className="portfolio-body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p className="muted">
                  <strong>Результат:</strong> {item.result}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {hasMore ? (
          <div className="portfolio-more">
            <button
              className="button button-secondary"
              type="button"
              onClick={() => setVisibleCount((count) => count + STEP)}
            >
              Показать ещё
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
