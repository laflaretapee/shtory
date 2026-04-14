export function TrustBar({ items }) {
  return (
    <section className="trustbar-section">
      <div className="container trustbar-grid">
        {items.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </section>
  )
}
