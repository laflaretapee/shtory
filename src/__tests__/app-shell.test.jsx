import { render, screen } from '@testing-library/react'
import App from '../App'

test('renders the main landing headline and primary CTA', () => {
  render(<App />)

  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /шторы на заказ в раевке/i,
    }),
  ).toBeInTheDocument()

  expect(screen.getAllByRole('link', { name: /заказать замер/i }).length).toBeGreaterThan(0)
  expect(screen.getAllByLabelText(/whatsapp/i).length).toBeGreaterThan(0)
  expect(screen.getAllByLabelText(/telegram/i).length).toBeGreaterThan(0)
  expect(screen.getAllByLabelText(/^vk$/i).length).toBeGreaterThan(0)
})
