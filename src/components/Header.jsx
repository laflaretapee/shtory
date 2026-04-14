export function Header({ companyName, navigation, contacts }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#hero">
          <span className="brand-mark">atelier</span>
          <span className="brand-name">{companyName}</span>
        </a>

        <nav className="main-nav" aria-label="Основная навигация">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-phone" href={contacts.phoneHref}>
            {contacts.phoneDisplay}
          </a>
          <a className="button button-secondary" href="#contacts">
            Получить консультацию
          </a>
          <a className="button" href="#lead-form">
            Заказать замер
          </a>
        </div>
      </div>
    </header>
  )
}
