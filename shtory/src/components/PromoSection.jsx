import { Link } from 'react-router-dom'

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
            <Link className="button" to="/contacts">
              {data.cta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
