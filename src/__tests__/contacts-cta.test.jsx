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

test('contacts page shows the new form layout and icon socials', async () => {
  const user = userEvent.setup()

  render(
    <MemoryRouter initialEntries={['/contacts']}>
      <AppShell />
    </MemoryRouter>,
  )

  expect(screen.getByRole('textbox', { name: /имя/i })).toBeInTheDocument()
  expect(screen.getByRole('textbox', { name: /телефон/i })).toBeInTheDocument()
  expect(screen.getByRole('textbox', { name: /сообщение/i })).toBeInTheDocument()

  const whatsappButton = screen.getAllByLabelText(/whatsapp/i)[0]

  expect(screen.getAllByLabelText(/telegram/i).length).toBeGreaterThan(0)
  expect(screen.getAllByLabelText(/^vk$/i).length).toBeGreaterThan(0)

  await user.click(whatsappButton)

  expect(copyText).toHaveBeenCalledWith(
    'Здравствуйте! Хочу узнать стоимость штор и договориться о замере.',
  )
  expect(screen.getByText(/текст для whatsapp скопирован/i)).toBeInTheDocument()
})
