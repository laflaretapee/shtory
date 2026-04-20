import { Link } from 'react-router-dom'

export function MobileStickyActions() {
  return (
    <div className="mobile-sticky-actions">
      <Link className="button button-secondary" to="/portfolio">
        Портфолио
      </Link>
      <Link className="button" to="/contacts">
        Контакты
      </Link>
    </div>
  )
}
