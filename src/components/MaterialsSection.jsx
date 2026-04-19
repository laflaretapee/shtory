import { useState } from 'react'

export function MaterialsSection({ items }) {
  const [openTitle, setOpenTitle] = useState('')

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
          {items.map((item) => {
            const expanded = item.title === openTitle

            return (
              <article
                className={`material-card${expanded ? ' material-card-open' : ''}`}
                key={item.title}
              >
                <button
                  aria-controls={`material-panel-${item.title}`}
                  aria-expanded={expanded}
                  className="material-trigger"
                  type="button"
                  onClick={() => {
                    setOpenTitle((current) => (current === item.title ? '' : item.title))
                  }}
                >
                  <span className="pill">{item.kicker}</span>
                  <span className="material-title">{item.title}</span>
                  <span className="material-summary">{item.summary}</span>
                </button>

                {expanded ? (
                  <div className="material-body" id={`material-panel-${item.title}`}>
                    <p>{item.description}</p>
                    <p className="muted">
                      <strong>Лучше всего:</strong> {item.bestFor}
                    </p>
                  </div>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
