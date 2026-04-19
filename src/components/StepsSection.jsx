export function StepsSection({ items }) {
  return (
    <section className="section section-warm" id="steps">
      <div className="container">
        <div className="section-intro">
          <p className="eyebrow eyebrow-dark">Как мы работаем</p>
          <h2>6 понятных шагов от первого сообщения до готовых штор</h2>
          <p>
            Мы специально сделали процесс прозрачным: вы понимаете, что происходит на
            каждом этапе, и не остаётесь один на один с выбором ткани, замером или
            установкой.
          </p>
        </div>

        <div className="cards-grid steps-grid">
          {items.map((item, index) => (
            <article className="step-card" key={item.title}>
              <span className="step-index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
