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

test('home page reflects the nationwide branding update', () => {
  renderAt('/')

  expect(
    screen.getByRole('heading', { level: 1, name: /шторы на заказ по всей россии/i }),
  ).toBeInTheDocument()
  expect(screen.getAllByAltText(/логотип тренд штор/i).length).toBeGreaterThan(0)
  expect(
    screen.queryByRole('heading', { level: 2, name: /тренд штор/i }),
  ).not.toBeInTheDocument()
  expect(screen.getAllByText(/8 \(927\) 083-79-79/i).length).toBeGreaterThan(0)
  expect(screen.queryByText(/раевк/i)).not.toBeInTheDocument()
})
