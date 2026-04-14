export function MobileStickyActions({ contacts }) {
  return (
    <div className="mobile-sticky-actions">
      <a className="button button-secondary" href={contacts.phoneHref}>
        Позвонить
      </a>
      <a className="button" href={contacts.whatsappHref}>
        WhatsApp
      </a>
    </div>
  )
}
