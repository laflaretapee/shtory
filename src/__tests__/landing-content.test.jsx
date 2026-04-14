import { render, screen } from '@testing-library/react'
import App from '../App'

test('renders the required commercial sections', () => {
  render(<App />)

  expect(screen.getByRole('banner')).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {
      level: 2,
      name: /виды штор и услуги/i,
    }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {
      level: 2,
      name: /почему выбирают нас/i,
    }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {
      level: 2,
      name: /наши работы/i,
    }),
  ).toBeInTheDocument()
})
