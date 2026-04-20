import { expect, test } from 'vitest'
import { siteContent } from '../data/siteContent'

test('site content no longer contains raevsky wording variants', () => {
  const serialized = JSON.stringify(siteContent)

  expect(serialized).not.toMatch(/Раевск/u)
})

test('contacts content uses icon-driven channels and form-first copy', () => {
  expect(siteContent.contacts.channels).toHaveLength(3)
  expect(siteContent.contactsBlock.title).toMatch(/связаться/i)
  expect(siteContent.contacts.channels.every((channel) => channel.label)).toBe(true)
})
