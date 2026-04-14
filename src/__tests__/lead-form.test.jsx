import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

test('shows validation errors before successful submit', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(screen.getByRole('button', { name: /получить консультацию/i }))

  expect(screen.getByText(/укажите имя/i)).toBeInTheDocument()
  expect(screen.getByText(/укажите телефон/i)).toBeInTheDocument()
})
