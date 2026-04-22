import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from '../App'

test('portfolio page reveals all portfolio images after expanding the gallery', async () => {
  const user = userEvent.setup()

  render(
    <MemoryRouter initialEntries={['/portfolio']}>
      <AppShell />
    </MemoryRouter>,
  )

  const getPortfolioImages = () =>
    screen
      .getAllByRole('img')
      .filter((image) => image.getAttribute('src')?.includes('media/portfolio/portfolio-'))

  expect(getPortfolioImages()).toHaveLength(3)

  await user.click(screen.getByRole('button', { name: /показать ещё 5 работы/i }))

  const images = getPortfolioImages()

  expect(images).toHaveLength(8)
  expect(images[0].getAttribute('src')).toContain('media/portfolio/portfolio-')
  expect(images[0].getAttribute('src')).not.toMatch(/^\/media\//)
})
