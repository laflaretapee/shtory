import { render } from '@testing-library/react'
import App from '../App'

test('sets seo metadata and structured data', () => {
  render(<App />)

  expect(document.title).toMatch(/шторы на заказ по всей россии/i)

  const description = document.querySelector('meta[name="description"]')
  expect(description).not.toBeNull()
  expect(description?.getAttribute('content')).toMatch(/по всей россии/i)

  const structuredData = document.querySelector('script[type="application/ld+json"]')
  expect(structuredData).not.toBeNull()
  expect(structuredData?.textContent).toMatch(/ProfessionalService/)
  expect(structuredData?.textContent).toMatch(/FAQPage/)
  expect(structuredData?.textContent).toMatch(/Россия/)
})
