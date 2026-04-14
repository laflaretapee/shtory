export function PricingSection({ data }) {
  return (
    <section className="section section-contrast" id="pricing">
      <div className="container pricing-layout">
        <div className="section-intro pricing-intro">
          <p className="eyebrow eyebrow-dark">Стоимость</p>
          <h2>{data.title}</h2>
          <p>{data.intro}</p>
          <a className="button" href={data.cta.href}>
            {data.cta.label}
          </a>
        </div>

        <div className="pricing-list">
          {data.items.map((item) => (
            <article className="pricing-card" key={item.title}>
              <div className="pricing-card-head">
                <h3>{item.title}</h3>
                <strong>{item.value}</strong>
              </div>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
