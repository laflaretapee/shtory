import { act, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, vi } from 'vitest'
import { AppShell } from '../App'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  act(() => {
    vi.runOnlyPendingTimers()
  })
  vi.useRealTimers()
})

test('portfolio page rotates reviews one by one', () => {
  render(
    <MemoryRouter initialEntries={['/portfolio']}>
      <AppShell />
    </MemoryRouter>,
  )

  expect(
    screen.getByRole('button', { name: /предыдущий отзыв/i }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('button', { name: /следующий отзыв/i }),
  ).toBeInTheDocument()

  const track = screen.getByTestId('reviews-track')
  expect(track).toHaveStyle({ transform: 'translateX(-0%)' })

  act(() => {
    vi.advanceTimersByTime(5000)
  })

  expect(track).toHaveStyle({ transform: 'translateX(-100%)' })
})
