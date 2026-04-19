import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, test, expect, vi } from 'vitest'
import { AppShell } from '../App'

const { copyText } = vi.hoisted(() => ({
  copyText: vi.fn(),
}))

vi.mock('../utils/copyText', () => ({
  copyText,
}))

beforeEach(() => {
  copyText.mockReset()
  copyText.mockResolvedValue(true)
})

test('contacts page copies the ready message instead of showing the form', async () => {
  const user = userEvent.setup()

  render(
    <MemoryRouter initialEntries={['/contacts']}>
      <AppShell />
    </MemoryRouter>,
  )

  expect(
    screen.queryByRole('textbox', { name: /имя/i }),
  ).not.toBeInTheDocument()

  const whatsappButton = screen.getByRole('button', { name: /whatsapp/i })

  expect(
    screen.getByRole('button', { name: /telegram/i }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('button', { name: /^vk$/i }),
  ).toBeInTheDocument()

  await user.click(whatsappButton)

  expect(copyText).toHaveBeenCalledWith(
    'Здравствуйте! Хочу узнать стоимость штор и договориться о замере.',
  )
  expect(screen.getByText(/текст скопирован/i)).toBeInTheDocument()
})
