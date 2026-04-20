import { Link } from 'react-router-dom'

export function ServicesSection({ items }) {
  return (
    <div className="services-subsection" id="services">
      <div className="section-intro section-intro-compact">
        <h3>Пошив, замер и установка в одном месте</h3>
        <p>
          Если важно пройти путь от идеи до финальной навески без лишних подрядчиков,
          этот блок быстро показывает весь процесс.
        </p>
      </div>

      <div className="cards-grid services-grid services-grid-compact">
        {items.map((item) => (
          <article className="service-card" key={item.title}>
            <div className="service-card-media" role="img" aria-label={item.title} />
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
