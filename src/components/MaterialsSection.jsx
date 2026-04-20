export function MaterialsSection({ items }) {
  const assetBase = import.meta.env.BASE_URL

  return (
    <section className="section" id="materials">
      <div className="container">
        <div className="section-intro">
          <p className="eyebrow eyebrow-dark">Материалы</p>
          <h2>Материалы и фактуры, которые помогают выбрать настроение окна</h2>
          <p>
            Коротко показываем, чем отличаются самые востребованные решения и в
            каких комнатах они раскрываются лучше.
          </p>
        </div>

        <div className="cards-grid materials-grid">
          {items.map((item) => (
            <article className="material-card" key={item.title}>
              {item.image && (
                <img
                  alt={item.title}
                  className="material-media"
                  loading="lazy"
                  decoding="async"
                  src={`${assetBase}${item.image}`}
                />
              )}
              <div className="material-body-static">
                <span className="pill">{item.kicker}</span>
                <span className="material-title">{item.title}</span>
                <p className="material-summary">{item.description}</p>
                <p className="muted">
                  <strong>Лучше всего:</strong> {item.bestFor}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
