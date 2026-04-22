import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from '../App'

test('services page expands one materials card at a time', async () => {
  render(
    <MemoryRouter initialEntries={['/services']}>
      <AppShell />
    </MemoryRouter>,
  )

  expect(
    screen.getByRole('heading', { level: 2, name: /материалы/i }),
  ).toBeInTheDocument()

  expect(
    screen.getByText(/мягко рассеивает дневной свет и не перегружает окно/i),
  ).toBeVisible()
  expect(
    screen.getByText(/помогает затемнить комнату и добавить ощущение камерности/i),
  ).toBeVisible()
  expect(screen.getByRole('img', { name: /лёгкий тюль/i })).toBeInTheDocument()
  expect(
    screen.getByRole('img', { name: /блэкаут и затемняющие решения/i }),
  ).toBeInTheDocument()

  expect(
    screen.getByRole('img', { name: /выезд и замер/i }).getAttribute('src'),
  ).toContain('/media/services/1.webp')
  expect(
    screen.getByRole('img', { name: /комплексное оформление окна/i }).getAttribute('src'),
  ).toContain('/media/services/6.webp')
  expect(
    screen.getByRole('img', { name: /лёгкий тюль/i }).getAttribute('src'),
  ).toContain('/media/materials/7.webp')
  expect(
    screen.getByRole('img', { name: /практичные ткани для кухни и детской/i }).getAttribute('src'),
  ).toContain('/media/materials/12.webp')
})
