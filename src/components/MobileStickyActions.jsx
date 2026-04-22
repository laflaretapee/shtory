import { Link } from 'react-router-dom'
import { siteContent } from '../data/siteContent'

export function MobileStickyActions() {
  return (
    <div className="mobile-sticky-actions">
      <a className="button button-secondary" href={siteContent.contacts.phoneHref}>
        Позвонить
      </a>
      <Link className="button" to="/contacts">
        Контакты
      </Link>
    </div>
  )
}
