import { ChannelIcon } from './Icons'

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
          <article className="contact-card contact-hub-card">
            <span className="pill">Для связи</span>
            <h3>Выберите удобный канал</h3>
            <div className="contact-channel-row">
              {contacts.channels.map((channel) => (
                <a
                  className={`contact-channel-link${channel.tone === 'accent' ? ' contact-channel-link-accent' : ''}`}
                  href={channel.href}
                  key={channel.id}
                >
                  <ChannelIcon name={channel.icon} />
                  <span>{channel.label}</span>
                </a>
              ))}
            </div>
          </article>

          {contacts.channels.map((channel) => (
            <article className="contact-card" key={channel.id}>
              <span className="pill">{channel.badge}</span>
              <h3>{channel.title}</h3>
              <p>{channel.description}</p>
              <a
                className={channel.tone === 'accent' ? 'button' : 'button button-secondary'}
                href={channel.href}
              >
                {channel.label}
              </a>
            </article>
          ))}

          <article className="contact-card">
            <span className="pill">Телефон</span>
            <h3>{contacts.phoneDisplay}</h3>
            <div className="contact-meta">
              <a className="text-link" href={contacts.phoneHref}>
                Позвонить →
              </a>
            </div>
          </article>

          <article className="contact-card">
            <span className="pill">География</span>
            <h3>{contacts.serviceArea}</h3>
            <div className="contact-meta">
              <p>{contacts.workingHours}</p>
              <p>Подберём удобный формат связи и обсудим детали заказа.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
