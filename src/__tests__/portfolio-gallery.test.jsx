import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from '../App'

test('portfolio page renders real images from the normalized media folder', () => {
  render(
    <MemoryRouter initialEntries={['/portfolio']}>
      <AppShell />
    </MemoryRouter>,
  )

  const images = screen.getAllByRole('img')

  expect(images.length).toBeGreaterThanOrEqual(8)
  expect(images[0].getAttribute('src')).toContain('media/portfolio/portfolio-')
  expect(images[0].getAttribute('src')).not.toMatch(/^\/media\//)
})
