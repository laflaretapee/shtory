import { useEffect, useState } from 'react'

const AUTOPLAY_DELAY = 5000

function StarRating() {
  return (
    <div className="review-stars" aria-label="Оценка 5 из 5">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  )
}

export function ReviewsSection({ items }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (items.length < 2) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length)
    }, AUTOPLAY_DELAY)

    return () => {
      window.clearInterval(timer)
    }
  }, [items.length])

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + items.length) % items.length)
  }

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % items.length)
  }

  return (
    <section className="section" id="reviews">
      <div className="container">
        <div className="section-intro">
          <p className="eyebrow eyebrow-dark">Отзывы</p>
          <h2>Что говорят клиенты</h2>
          <p>
            В отзывах чаще всего ценят не громкие обещания, а спокойную работу по делу:
            помощь в выборе, аккуратный замер, понятный расчёт и уютный результат.
          </p>
        </div>

        <div className="reviews-carousel">
          <div className="reviews-carousel-top">
            <p className="reviews-position">
              {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </p>
            <div className="reviews-controls">
              <button
                aria-label="Предыдущий отзыв"
                className="reviews-control"
                onClick={showPrevious}
                type="button"
              >
                ←
              </button>
              <button
                aria-label="Следующий отзыв"
                className="reviews-control"
                onClick={showNext}
                type="button"
              >
                →
              </button>
            </div>
          </div>

          <div className="reviews-viewport">
            <div
              className="reviews-track"
              data-testid="reviews-track"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {items.map((item) => (
                <article className="review-card reviews-slide" key={item.name}>
                  <StarRating />
                  <p className="review-text">«{item.text}»</p>
                  <strong className="review-author">{item.name}</strong>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
