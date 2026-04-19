import { useState } from 'react'
import { copyText } from '../utils/copyText'

export function useContactCopy(message) {
  const [copiedLabel, setCopiedLabel] = useState('')

  async function copy(label) {
    try {
      await copyText(message)
      setCopiedLabel(label)
    } catch {
      setCopiedLabel(label)
    }
  }

  return { copiedLabel, copy }
}
