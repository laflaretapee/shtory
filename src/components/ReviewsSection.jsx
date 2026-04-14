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
              <p className="review-text">“{item.text}”</p>
              <strong>{item.name}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
