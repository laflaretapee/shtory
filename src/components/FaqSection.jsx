import { useState } from 'react'
import { Link } from 'react-router-dom'

export function FaqSection({ items }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = items[activeIndex]

  return (
    <section className="section section-contrast" id="faq">
      <div className="container faq-layout faq-layout-compact">
        <div className="faq-main">
          <div className="section-intro section-intro-compact">
            <p className="eyebrow eyebrow-dark">FAQ</p>
            <h2>Частые вопросы</h2>
            <p>
              Короткий навигатор по вопросам, которые чаще всего возникают перед
              замером, подбором ткани и оформлением окна.
            </p>
          </div>

          <div className="faq-rail" role="tablist" aria-label="Вопросы по шторам">
            {items.map((item, index) => (
              <button
                key={item.question}
                aria-pressed={index === activeIndex}
                className={index === activeIndex ? 'faq-chip faq-chip-active' : 'faq-chip'}
                type="button"
                onClick={() => setActiveIndex(index)}
              >
                {item.question}
              </button>
            ))}
          </div>

          <article className="faq-active-card">
            <h3>{activeItem.question}</h3>
            <p>{activeItem.answer}</p>
          </article>
        </div>

        <aside className="faq-side-card faq-side-card-compact">
          <h3>Нужен ответ именно по вашему окну?</h3>
          <p>
            Напишите, какие шторы нужны: тюль, портьеры, римские или рулонные — и мы
            подскажем, с чего лучше начать.
          </p>
          <Link className="button" to="/contacts">
            Открыть контакты
          </Link>
        </aside>
      </div>
    </section>
  )
}
