import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from '../App'

test('portfolio page reveals real photos in batches of three', async () => {
  const user = userEvent.setup()

  render(
    <MemoryRouter initialEntries={['/portfolio']}>
      <AppShell />
    </MemoryRouter>,
  )

  const images = screen.getAllByRole('img', { name: /реальная фотография штор в интерьере/i })

  expect(images).toHaveLength(3)
  expect(images[0].getAttribute('src')).toContain('media/portfolio/')
  expect(images[0].getAttribute('src')).not.toMatch(/^\/media\//)

  await user.click(screen.getByRole('button', { name: /показать ещё/i }))

  expect(
    screen.getAllByRole('img', { name: /реальная фотография штор в интерьере/i }).length,
  ).toBeGreaterThan(3)
})
