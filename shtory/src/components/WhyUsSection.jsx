export function WhyUsSection({ data }) {
  return (
    <section className="section" id="why-us">
      <div className="container why-us-layout">
        <div className="why-us-copy">
          <p className="eyebrow eyebrow-dark">Доверие</p>
          <h2>{data.title}</h2>
          <p>{data.intro}</p>

          <ul className="feature-list">
            {data.points.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="metrics-grid">
          {data.metrics.map((item) => (
            <article className="metric-card" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
