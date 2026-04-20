import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from '../App'

test('services page expands one materials card at a time', async () => {
  const user = userEvent.setup()

  render(
    <MemoryRouter initialEntries={['/services']}>
      <AppShell />
    </MemoryRouter>,
  )

  expect(
    screen.getByRole('heading', { level: 2, name: /материалы/i }),
  ).toBeInTheDocument()

  const tulleButton = screen.getByRole('button', { name: /лёгкий тюль/i })
  const blackoutButton = screen.getByRole('button', {
    name: /блэкаут и затемняющие решения/i,
  })

  await user.click(tulleButton)

  expect(
    screen.getByText(/мягко рассеивает дневной свет и не перегружает окно/i),
  ).toBeVisible()

  await user.click(blackoutButton)

  expect(
    screen.getByText(/помогает затемнить комнату и добавить ощущение камерности/i),
  ).toBeVisible()
  expect(
    screen.queryByText(/мягко рассеивает дневной свет и не перегружает окно/i),
  ).not.toBeInTheDocument()
})
