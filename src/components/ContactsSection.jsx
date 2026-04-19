import { useContactCopy } from '../hooks/useContactCopy'

export function ContactsSection({ data, contacts }) {
  const { copiedLabel, copy } = useContactCopy(contacts.readyMessage)

  return (
    <section className="section section-contrast" id="contacts">
      <div className="container contacts-layout">
        <div className="section-intro contacts-intro">
          <p className="eyebrow eyebrow-dark">Контакты</p>
          <h2>{data.title}</h2>
          <p>{data.text}</p>
        </div>

        <div className="cards-grid contacts-grid">
          <article className="contact-card contact-message-card">
            <span className="pill">Готовое сообщение</span>
            <h3>Скопируйте текст и отправьте его в удобный канал</h3>
            <p>
              Так проще начать разговор: не нужно думать, что написать в первый раз,
              и можно сразу перейти к сути запроса.
            </p>

            <div className="contact-message-box">
              <p>{contacts.readyMessage}</p>
            </div>

            <p className="contact-status" role="status">
              {copiedLabel
                ? `Текст скопирован для ${copiedLabel}. Можно вставить его в сообщение.`
                : contacts.channelStatus}
            </p>
          </article>

          {contacts.channels.map((channel) => (
            <article className="contact-card" key={channel.id}>
              <span className="pill">{channel.badge}</span>
              <h3>{channel.title}</h3>
              <p>{channel.description}</p>
              <button
                className={channel.tone === 'accent' ? 'button' : 'button button-secondary'}
                type="button"
                onClick={() => copy(channel.label)}
              >
                {channel.label}
              </button>
            </article>
          ))}

          <article className="contact-card">
            <span className="pill">Район работы</span>
            <h3>{contacts.serviceArea}</h3>
            <div className="contact-meta">
              <p>{contacts.workingHours}</p>
              <p>{data.text}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
