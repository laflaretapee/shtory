import { render } from '@testing-library/react'
import App from '../App'

test('sets seo metadata and structured data', () => {
  render(<App />)

  expect(document.title).toMatch(/шторы на заказ в раевке/i)

  const description = document.querySelector('meta[name="description"]')
  expect(description).not.toBeNull()
  expect(description?.getAttribute('content')).toMatch(/пошив штор на заказ в раевке/i)

  const structuredData = document.querySelector('script[type="application/ld+json"]')
  expect(structuredData).not.toBeNull()
  expect(structuredData?.textContent).toMatch(/LocalBusiness/)
  expect(structuredData?.textContent).toMatch(/FAQPage/)
})
