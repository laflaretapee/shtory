import { useState } from 'react'
import { useContactCopy } from '../hooks/useContactCopy'
import { TelegramIcon, VKIcon, WhatsAppIcon } from './Icons'

const iconMap = {
  whatsapp: WhatsAppIcon,
  telegram: TelegramIcon,
  vk: VKIcon,
}

export function ContactsSection({ data, contacts }) {
  const { copiedLabel, copy } = useContactCopy(contacts.readyMessage)
  const [submitted, setSubmitted] = useState(false)

  return (
    <section className="section section-contrast" id="contacts">
      <div className="container contacts-shell">
        <div className="contacts-copy">
          <p className="eyebrow eyebrow-dark">Контакты</p>
          <h2>{data.title}</h2>
          <p>{data.text}</p>

          <div className="contacts-inline-meta">
            <p className="contact-phone-text">{contacts.phoneDisplay}</p>
            <p>{contacts.workingHours}</p>
            <p>{contacts.serviceArea}</p>
          </div>

          <div className="social-icon-row" aria-label="Каналы связи">
            {contacts.channels.map((channel) => {
              const Icon = iconMap[channel.id]

              return (
                <button
                  key={channel.id}
                  aria-label={channel.label}
                  className="social-icon-button"
                  type="button"
                  onClick={() => copy(channel.label)}
                >
                  <Icon className="social-icon" />
                </button>
              )
            })}
          </div>

          <p className="contact-status" role="status">
            {copiedLabel
              ? `Текст для ${copiedLabel} скопирован. Можно вставить его в сообщение.`
              : contacts.channelStatus}
          </p>
        </div>

        <form
          className="contact-form-card"
          onSubmit={(event) => {
            event.preventDefault()
            setSubmitted(true)
          }}
        >
          <label>
            <span>Имя</span>
            <input aria-label="Имя" name="name" placeholder="Ваше имя" type="text" />
          </label>

          <label>
            <span>Телефон</span>
            <input aria-label="Телефон" name="phone" placeholder="+7 (___) ___-__-__" type="tel" />
          </label>

          <label>
            <span>Сообщение</span>
            <textarea
              aria-label="Сообщение"
              name="message"
              placeholder="Напишите, для какой комнаты нужны шторы или когда удобно связаться."
            />
          </label>

          <button className="button contact-form-submit" type="submit">
            Отправить запрос
          </button>

          {submitted ? (
            <p className="form-success">
              Сообщение сохранено. Когда будут готовы реальные контакты, сюда можно
              будет подключить отправку.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}
