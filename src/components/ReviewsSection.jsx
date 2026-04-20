import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function StarRating() {
  return (
    <div className="review-stars" aria-label="Оценка 5 из 5">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

export function ReviewsSection({ items }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [cardsPerView, setCardsPerView] = useState(3)

  useEffect(() => {
    if (paused) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length)
    }, 4200)

    return () => window.clearInterval(timer)
  }, [items.length, paused])

  useEffect(() => {
    function updateCardsPerView() {
      if (window.innerWidth < 700) {
        setCardsPerView(1)
        return
      }

      if (window.innerWidth < 1080) {
        setCardsPerView(2)
        return
      }

      setCardsPerView(3)
    }

    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)

    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [])

  const visibleItems = Array.from({ length: cardsPerView }, (_, offset) => {
    return items[(activeIndex + offset) % items.length]
  })

  return (
    <section
      aria-label="Отзывы клиентов"
      className="section section-warm"
      id="reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        <div className="reviews-head">
          <div className="section-intro section-intro-compact">
            <p className="eyebrow eyebrow-dark">Отзывы</p>
            <h2>Что говорят клиенты</h2>
            <p>
              Отзывы теперь идут в спокойном потоке: можно перелистывать вручную или
              дать им двигаться автоматически.
            </p>
          </div>

          <div className="reviews-nav">
            <button
              aria-label="Предыдущий отзыв"
              className="reviews-nav-button"
              type="button"
              onClick={() => setActiveIndex((current) => (current - 1 + items.length) % items.length)}
            >
              ‹
            </button>
            <button
              aria-label="Следующий отзыв"
              className="reviews-nav-button"
              type="button"
              onClick={() => setActiveIndex((current) => (current + 1) % items.length)}
            >
              ›
            </button>
          </div>
        </div>

        <div className="cards-grid reviews-grid reviews-grid-slider">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleItems.map((item) => (
              <motion.article
                key={`${activeIndex}-${item.name}`}
                className="review-card"
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.36, ease: 'easeOut' }}
              >
                <StarRating />
                <p className="review-text">«{item.text}»</p>
                <strong className="review-author">{item.name}</strong>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
