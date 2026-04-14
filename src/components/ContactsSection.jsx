export function ContactsSection({ data, contacts }) {
  return (
    <section className="section section-contrast" id="contacts">
      <div className="container contacts-layout">
        <div className="section-intro contacts-intro">
          <p className="eyebrow eyebrow-dark">Контакты</p>
          <h2>{data.title}</h2>
          <p>{data.text}</p>
        </div>

        <div className="cards-grid contacts-grid">
          <article className="contact-card">
            <span className="pill">Заявка на замер</span>
            <h3>Оставьте заявку</h3>
            <p>Заполните форму — свяжемся в течение дня, уточним детали и согласуем удобное время выезда.</p>
            <a className="button" href="#lead-form">
              Оставить заявку
            </a>
          </article>

          <article className="contact-card">
            <span className="pill">WhatsApp</span>
            <h3>Напишите нам</h3>
            <p>Удобно для быстрой связи: уточнить вопрос по замеру, ткани или стоимости.</p>
            <a className="button button-secondary" href="#lead-form">
              Написать в WhatsApp
            </a>
          </article>

          <article className="contact-card">
            <span className="pill">Консультация</span>
            <h3>Получите консультацию</h3>
            <p>Подберём шторы под ваш интерьер, расскажем о тканях и ценах — без навязывания и лишних вопросов.</p>
            <a className="text-link" href="#lead-form">
              Задать вопрос
            </a>
          </article>

          <article className="contact-card">
            <span className="pill">Район работы</span>
            <h3>{contacts.serviceArea}</h3>
            <p>{contacts.workingHours}</p>
          </article>
        </div>
      </div>
    </section>
  )
}
