import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from '../App'

test('shows validation errors before successful submit', async () => {
  const user = userEvent.setup()
  render(
    <MemoryRouter initialEntries={['/contacts']}>
      <AppShell />
    </MemoryRouter>,
  )

  await user.click(screen.getByRole('button', { name: /получить расчёт бесплатно/i }))

  expect(screen.getByText(/укажите имя/i)).toBeInTheDocument()
  expect(screen.getByText(/укажите телефон/i)).toBeInTheDocument()
})
