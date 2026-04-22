import { Link } from 'react-router-dom'

export function Footer({ navigation, footer, contacts }) {
  const assetBase = import.meta.env.BASE_URL

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="eyebrow">О компании</p>
          <div className="footer-brand-stack">
            <img alt={footer.logoAlt} className="footer-logo" src={`${assetBase}${footer.logo}`} />
            <p>{footer.description}</p>
          </div>
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
          <ul className="footer-links">
            <li>
              <a href={contacts.phoneHref}>{contacts.phoneDisplay}</a>
            </li>
            {contacts.channels.map((channel) => (
              <li key={channel.id}>
                <a href={channel.href}>{channel.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-developer">
          <p className="eyebrow">{footer.developer.label}</p>
          <a
            className="footer-developer-link"
            href={footer.developer.href}
            rel="noreferrer"
            target="_blank"
          >
            <span className="footer-developer-logo">{footer.developer.logoText}</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
