import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from '../App'

test('portfolio page renders initial 3 images, shows more on button click', () => {
  render(
    <MemoryRouter initialEntries={['/portfolio']}>
      <AppShell />
    </MemoryRouter>,
  )

  // Initially shows 3 portfolio images
  let images = screen.getAllByRole('img').filter((img) =>
    img.getAttribute('src')?.includes('media/portfolio/portfolio-'),
  )
  expect(images.length).toBe(3)
  expect(images[0].getAttribute('src')).toContain('media/portfolio/portfolio-')
  expect(images[0].getAttribute('src')).not.toMatch(/^\/media\//)

  // After clicking "show more" all 8 are visible
  const showMoreBtn = screen.getByRole('button', { name: /показать ещё/i })
  fireEvent.click(showMoreBtn)

  images = screen.getAllByRole('img').filter((img) =>
    img.getAttribute('src')?.includes('media/portfolio/portfolio-'),
  )
  expect(images.length).toBeGreaterThanOrEqual(8)
})
