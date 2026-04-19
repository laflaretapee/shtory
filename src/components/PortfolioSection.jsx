export function PortfolioSection({ items }) {
  return (
    <section className="section" id="portfolio">
      <div className="container">
        <div className="section-intro">
          <p className="eyebrow eyebrow-dark">Портфолио</p>
          <h2>Наши работы</h2>
          <p>
            Реальные решения под интерьер, размеры окна и пожелания заказчика. Каждый
            проект собираем так, чтобы шторы были уместны в комнате и удобны в жизни.
          </p>
        </div>

        <div className="cards-grid portfolio-grid">
          {items.map((item) => (
            <article className="portfolio-card" key={item.title}>
              <img
                alt={item.alt}
                className="portfolio-media"
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
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
