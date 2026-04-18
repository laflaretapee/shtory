import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from '../App'

test('expands faq answer on click', async () => {
  const user = userEvent.setup()
  render(
    <MemoryRouter initialEntries={['/contacts']}>
      <AppShell />
    </MemoryRouter>,
  )

  const trigger = screen.getByRole('button', {
    name: /сколько стоит заказать шторы в раевке/i,
  })

  await user.click(trigger)

  expect(
    screen.getByText(/точную стоимость мы рассчитываем после замера/i),
  ).toBeVisible()
})
