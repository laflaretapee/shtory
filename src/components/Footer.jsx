import { Link } from 'react-router-dom'
import { TelegramIcon, VKIcon, WhatsAppIcon } from './Icons'

const iconMap = {
  whatsapp: WhatsAppIcon,
  telegram: TelegramIcon,
  vk: VKIcon,
}

export function Footer({ companyName, navigation, footer, contacts }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="eyebrow">О компании</p>
          <h2>{companyName}</h2>
          <p>{footer.description}</p>
        </div>

        <div>
          <p className="eyebrow">Разделы</p>
          <ul className="footer-links">
            {navigation.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Связь</p>
          <p className="footer-phone">
            <Link to="/contacts">{contacts.phoneDisplay}</Link>
          </p>
          <ul className="footer-socials" aria-label="Соцсети">
            {contacts.channels.map((channel) => {
              const Icon = iconMap[channel.id]

              return (
                <li key={channel.id}>
                  <Link aria-label={channel.label} className="footer-social-link" to="/contacts">
                    <Icon className="footer-social-icon" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="legal-box">
          <p id="privacy">{footer.privacy}</p>
          <p id="consent">{footer.consent}</p>
          <small>
            Контактные данные и юридические реквизиты заменяются на реальные перед
            публикацией сайта.
          </small>
        </div>
      </div>
    </footer>
  )
}
