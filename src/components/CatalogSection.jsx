export function CatalogSection({ items, children }) {
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

        <div className="cards-grid catalog-grid">
          {items.map((item) => (
            <article className="catalog-card" key={item.title}>
              <div className="catalog-card-top">
                <span className="pill">{item.title}</span>
                <h3>{item.title}</h3>
              </div>
              <p>{item.description}</p>
              <p className="muted">
                <strong>Подходит для:</strong> {item.fit}
              </p>
              <a className="text-link" href="#lead-form">
                Узнать стоимость
              </a>
            </article>
          ))}
        </div>

        {children}
      </div>
    </section>
  )
}
