export function StructuredData({ companyName, seo, faq }) {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        name: companyName,
        description: seo.description,
        areaServed: ['Раевка', 'Альшеевский район', 'Республика Башкортостан'],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Раевка',
          addressRegion: 'Республика Башкортостан',
          addressCountry: 'RU',
        },
      },
      {
        '@type': 'Service',
        name: 'Пошив и установка штор в Раевке',
        serviceType: 'Шторы на заказ, тюль, портьеры, римские и рулонные шторы',
        provider: {
          '@type': 'LocalBusiness',
          name: companyName,
        },
        areaServed: ['Раевка', 'Альшеевский район'],
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: typeof window !== 'undefined' ? window.location.href : '',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
