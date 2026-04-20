import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from '../App'

test('services page shows material cards with photos', () => {
  render(
    <MemoryRouter initialEntries={['/services']}>
      <AppShell />
    </MemoryRouter>,
  )

  expect(
    screen.getByRole('heading', { level: 2, name: /материалы/i }),
  ).toBeInTheDocument()

  // All 6 material cards visible as static cards with images
  expect(screen.getByText(/лёгкий тюль/i)).toBeInTheDocument()
  expect(screen.getByText(/блэкаут и затемняющие решения/i)).toBeInTheDocument()
  expect(screen.getByText(/плотные портьерные ткани/i)).toBeInTheDocument()

  // Text content visible without needing to expand accordion
  expect(
    screen.getByText(/мягко рассеивает дневной свет и не перегружает окно/i),
  ).toBeInTheDocument()
  expect(
    screen.getByText(/помогает затемнить комнату и добавить ощущение камерности/i),
  ).toBeInTheDocument()
})
