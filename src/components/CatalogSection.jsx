import { useState } from 'react'
import { Link } from 'react-router-dom'

const INITIAL_COUNT = 4

export function CatalogSection({ items, children }) {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? items : items.slice(0, INITIAL_COUNT)

  return (
    <section className="section section-contrast" id="catalog">
      <div className="container">
        <div className="section-intro">
          <p className="eyebrow eyebrow-dark">Каталог</p>
          <h2>Виды штор и услуги</h2>
          <p>
            Шьём шторы на заказ в Раевке под конкретную комнату и образ жизни: от
            лёгкого тюля до плотных портьер, римских и рулонных решений.
          </p>
        </div>

        <div className="catalog-swipe-wrapper">
          <div className="cards-grid catalog-grid">
            {visible.map((item) => (
              <article className="catalog-card" key={item.title}>
                <div className="catalog-card-top">
                  <h3>{item.title}</h3>
                </div>
                <p>{item.description}</p>
                <p className="muted">
                  <strong>Подходит для:</strong> {item.fit}
                </p>
                <Link className="text-link" to="/contacts">
                  Узнать стоимость →
                </Link>
              </article>
            ))}
          </div>
        </div>

        {!showAll && items.length > INITIAL_COUNT && (
          <div className="catalog-show-more">
            <button
              className="button button-secondary"
              type="button"
              onClick={() => setShowAll(true)}
            >
              Показать ещё {items.length - INITIAL_COUNT} вида штор
            </button>
          </div>
        )}

        {children}
      </div>
    </section>
  )
}
