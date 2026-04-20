import { useState } from 'react'

const INITIAL_COUNT = 3

export function PortfolioSection({ items }) {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? items : items.slice(0, INITIAL_COUNT)

  return (
    <section className="section" id="portfolio">
      <div className="container">
        <div className="section-intro">
          <p className="eyebrow eyebrow-dark">Портфолио</p>
          <h2>Наши работы</h2>
          <p>
            На странице только реальные фотографии. Сначала показываем несколько сильных примеров,
            а дальше можно открыть больше работ.
          </p>
        </div>

        <div className="cards-grid portfolio-grid">
          {visible.map((item) => (
            <article className="portfolio-card" key={item.title}>
              <img
                alt={item.alt}
                className="portfolio-media"
                loading="lazy"
                decoding="async"
                src={item.image}
              />
              <div className="portfolio-body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p className="muted">
                  <strong>Результат:</strong> {item.result}
                </p>
              </div>
            </article>
          ))}
        </div>

        {!showAll && items.length > INITIAL_COUNT && (
          <div className="catalog-show-more">
            <button
              className="button button-secondary"
              type="button"
              onClick={() => setShowAll(true)}
            >
              Показать ещё {items.length - INITIAL_COUNT} работы
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
