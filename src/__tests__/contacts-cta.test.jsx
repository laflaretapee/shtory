import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from '../App'

test('contacts page shows direct communication links without copy flow', () => {
  render(
    <MemoryRouter initialEntries={['/contacts']}>
      <AppShell />
    </MemoryRouter>,
  )

  expect(
    screen.queryByRole('textbox', { name: /имя/i }),
  ).not.toBeInTheDocument()

  expect(
    screen.getByText(/для связи выберите удобный вид связи/i),
  ).toBeInTheDocument()
  expect(
    screen.getByText(/подберём удобный формат связи и обсудим детали заказа/i),
  ).toBeInTheDocument()
  expect(
    screen.queryByText(/готовое сообщение/i),
  ).not.toBeInTheDocument()
  expect(screen.queryByText(/быстрый ответ/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/удобно для переписки/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/сообщество/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/география/i)).not.toBeInTheDocument()

  expect(
    screen
      .getAllByRole('link', { name: /whatsapp/i })
      .some((link) => link.getAttribute('href') === 'https://wa.me/79270837979'),
  ).toBe(true)
  expect(
    screen
      .getAllByRole('link', { name: /telegram/i })
      .some((link) => link.getAttribute('href') === '#'),
  ).toBe(true)
  expect(
    screen
      .getAllByRole('link', { name: /^vk$/i })
      .some((link) => link.getAttribute('href') === '#'),
  ).toBe(true)
  expect(
    screen.getAllByRole('link', { name: /8 \(927\) 083-79-79/i }).length,
  ).toBeGreaterThan(0)
})
