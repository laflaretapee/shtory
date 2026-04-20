import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from '../App'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppShell />
    </MemoryRouter>,
  )
}

test('renders header on every page', () => {
  const { unmount } = renderAt('/')
  expect(screen.getByRole('banner')).toBeInTheDocument()
  unmount()
})

test('services page has catalog and why-us sections', () => {
  renderAt('/services')
  expect(
    screen.getByRole('heading', { level: 2, name: /виды штор и услуги/i }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', { level: 2, name: /почему выбирают нас/i }),
  ).toBeInTheDocument()
})

test('portfolio page has portfolio and reviews sections', () => {
  renderAt('/portfolio')
  expect(
    screen.getByRole('heading', { level: 2, name: /наши работы/i }),
  ).toBeInTheDocument()
})
