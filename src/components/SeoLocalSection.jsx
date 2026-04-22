export function SeoLocalSection({ data }) {
  return (
    <section className="section" id="seo-local">
      <div className="container seo-local">
        <div className="section-intro section-intro-compact">
          <p className="eyebrow eyebrow-dark">По всей России</p>
          <h2>{data.title}</h2>
        </div>

        <div className="seo-text">
          {data.paragraphs.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
