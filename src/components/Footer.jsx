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
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Связь</p>
          <ul className="footer-links">
            <li>
              <a href={contacts.phoneHref}>{contacts.phoneDisplay}</a>
            </li>
            <li>
              <a href={contacts.whatsappHref}>WhatsApp</a>
            </li>
            <li>
              <a href={contacts.telegramHref}>Telegram</a>
            </li>
          </ul>
        </div>

        <div className="legal-box">
          <p id="privacy">{footer.privacy}</p>
          <p id="consent">{footer.consent}</p>
          <small>
            Содержимое блока контактов и юридические реквизиты заменяются на реальные
            данные перед публикацией сайта.
          </small>
        </div>
      </div>
    </footer>
  )
}
