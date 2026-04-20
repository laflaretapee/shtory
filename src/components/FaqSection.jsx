import { useState } from 'react'
import { Link } from 'react-router-dom'

export function FaqSection({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="section section-contrast" id="faq">
      <div className="container faq-layout">
        <div className="faq-main">
          <div className="section-intro section-intro-compact">
            <p className="eyebrow eyebrow-dark">FAQ</p>
            <h2>Частые вопросы</h2>
            <p>
              Собрали ответы на вопросы, которые чаще всего возникают, когда нужно
              заказать шторы Раевка, вызвать замерщика или понять, что входит в услугу
              под ключ.
            </p>
          </div>

          <div className="faq-list">
            {items.map((item, index) => (
              <article className="faq-item" key={item.question}>
                <button
                  aria-controls={`faq-answer-${index}`}
                  aria-expanded={openIndex === index}
                  className="faq-trigger"
                  type="button"
                  onClick={() => {
                    setOpenIndex((current) => (current === index ? null : index))
                  }}
                >
                  <span>{item.question}</span>
                  <span aria-hidden="true">+</span>
                </button>
                {openIndex === index ? (
                  <div className="faq-answer" id={`faq-answer-${index}`}>
                    <p>{item.answer}</p>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>

        <aside className="faq-side-card">
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
