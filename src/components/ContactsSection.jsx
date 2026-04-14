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
            <span className="pill">Телефон</span>
            <h3>{contacts.phoneDisplay}</h3>
            <p>Временно используем тестовое отображение. Реальный номер подставим перед публикацией.</p>
            <a className="button" href={contacts.phoneHref}>
              Позвонить
            </a>
          </article>

          <article className="contact-card">
            <span className="pill">WhatsApp</span>
            <h3>{contacts.whatsappLabel}</h3>
            <p>Мессенджер будет подключён после передачи реальных контактных данных.</p>
            <a className="button button-secondary" href={contacts.whatsappHref}>
              Написать в WhatsApp
            </a>
          </article>

          <article className="contact-card">
            <span className="pill">Telegram</span>
            <h3>{contacts.telegramLabel}</h3>
            <p>Подходит для быстрой связи по замеру, подбору ткани и расчёту стоимости.</p>
            <a className="text-link" href={contacts.telegramHref}>
              Перейти к заявке
            </a>
          </article>

          <article className="contact-card">
            <span className="pill">География и время</span>
            <h3>{contacts.serviceArea}</h3>
            <p>{contacts.workingHours}</p>
            <p className="muted">Точный адрес не указываем, пока он не предоставлен для публикации.</p>
          </article>
        </div>
      </div>
    </section>
  )
}
