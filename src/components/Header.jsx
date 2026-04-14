export function Header({ companyName, navigation }) {
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
          <a className="button button-secondary" href="#contacts">
            Консультация
          </a>
          <a className="button" href="#lead-form">
            Заказать замер
          </a>
        </div>
      </div>
    </header>
  )
}
