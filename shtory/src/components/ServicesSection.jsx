import { Link } from 'react-router-dom'

export function ServicesSection({ items }) {
  const assetBase = import.meta.env.BASE_URL

  return (
    <div className="services-subsection" id="services">
      <div className="section-intro section-intro-compact">
        <h3>Пошив, замер и установка в одном месте</h3>
        <p>
          Если вам важно спокойно пройти путь от идеи до финальной навески, этот блок
          закрывает процесс целиком.
        </p>
      </div>

      <div className="cards-grid services-grid">
        {items.map((item) => (
          <article className="service-card" key={item.title}>
            <img
              alt={item.title}
              className="service-card-media"
              loading="lazy"
              decoding="async"
              src={`${assetBase}${item.image}`}
            />
            <div className="service-card-body">
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="inline-cta">
        <Link className="button" to="/contacts">
          Открыть контакты для расчёта
        </Link>
      </div>
    </div>
  )
}
