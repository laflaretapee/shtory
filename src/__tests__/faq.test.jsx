import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

test('expands faq answer on click', async () => {
  const user = userEvent.setup()
  render(<App />)

  const trigger = screen.getByRole('button', {
    name: /сколько стоит заказать шторы в раевке/i,
  })

  await user.click(trigger)

  expect(
    screen.getByText(/точную стоимость мы рассчитываем после замера/i),
  ).toBeVisible()
})
