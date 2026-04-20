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

        <div className="cards-grid reviews-grid">
          {items.map((item) => (
            <article className="review-card" key={item.name}>
              <StarRating />
              <p className="review-text">«{item.text}»</p>
              <strong className="review-author">{item.name}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
