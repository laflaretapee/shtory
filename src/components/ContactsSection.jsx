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

        <div className="contacts-panel">
          <div className="contacts-panel-top">
            <span className="pill">Для связи</span>
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
          </div>

          <div className="contacts-panel-meta">
            <a className="contacts-phone-link" href={contacts.phoneHref}>
              {contacts.phoneDisplay}
            </a>
            <p>{contacts.serviceArea}</p>
            <p>{contacts.workingHours}</p>
            <p>Подберём удобный формат связи и обсудим детали заказа.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
