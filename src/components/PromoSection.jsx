export function PromoSection({ data }) {
  return (
    <section className="section promo-section" id="promo">
      <div className="container">
        <div className="promo-card">
          <span className="pill">{data.label}</span>
          <div className="promo-content">
            <div>
              <h2>{data.title}</h2>
              <p>{data.text}</p>
            </div>
            <a className="button" href={data.cta.href}>
              {data.cta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
