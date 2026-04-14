import { SectionIcon } from './Icons'

export function BenefitsSection({ items }) {
  return (
    <section className="section" id="benefits">
      <div className="container">
        <div className="section-intro">
          <p className="eyebrow eyebrow-dark">Преимущества</p>
          <h2>Шторы под интерьер, а не просто по каталогу</h2>
          <p>
            Когда шторы подбирают с учётом окна, света и назначения комнаты, интерьер
            выглядит спокойнее и дороже, а пользоваться им действительно удобно каждый
            день.
          </p>
        </div>

        <div className="cards-grid benefits-grid">
          {items.map((item) => (
            <article className="info-card" key={item.title}>
              <SectionIcon name={item.icon} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
