export function StructuredData({ companyName, seo, faq }) {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        name: companyName,
        description: seo.description,
        areaServed: ['Россия'],
        telephone: '+79270837979',
      },
      {
        '@type': 'Service',
        name: 'Пошив и установка штор по всей России',
        serviceType: 'Шторы на заказ, тюль, портьеры, римские и рулонные шторы',
        provider: {
          '@type': 'ProfessionalService',
          name: companyName,
        },
        areaServed: ['Россия'],
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
