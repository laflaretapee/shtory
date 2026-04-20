import { Link } from 'react-router-dom'

export function Hero({ hero }) {
  const assetBase = import.meta.env.BASE_URL

  return (
    <section className="hero-section" id="hero">
      <div className="hero-media" aria-hidden="true">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={`${assetBase}og-image.svg`}
        >
          <source src={`${assetBase}media/hero-curtains.mp4`} type="video/mp4" />
        </video>
        <div className="hero-overlay" />
      </div>

      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p className="hero-text">{hero.description}</p>

          <div className="hero-actions">
            <Link className="button" to={hero.primaryCta.to}>
              {hero.primaryCta.label}
            </Link>
            <Link className="button button-secondary button-light" to={hero.secondaryCta.to}>
              {hero.secondaryCta.label}
            </Link>
          </div>

          <ul className="hero-trust" aria-label="Преимущества на первом экране">
            {hero.trustBadges.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
