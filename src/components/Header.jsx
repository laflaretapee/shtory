import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

export function Header({ companyName, navigation }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <span className="brand-mark">atelier</span>
          <span className="brand-name">{companyName}</span>
        </Link>

        <nav
          className={`main-nav${open ? ' main-nav-open' : ''}`}
          aria-label="Основная навигация"
        >
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="button header-cta" to="/contacts">
            Заказать замер
          </Link>
          <button
            type="button"
            className={`nav-toggle${open ? ' nav-toggle-open' : ''}`}
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}
