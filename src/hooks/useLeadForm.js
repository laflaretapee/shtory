import { useState } from 'react'

const initialFields = {
  name: '',
  phone: '',
  request: 'Шторы',
  comment: '',
}

function validate(fields) {
  const errors = {}

  if (!fields.name.trim()) {
    errors.name = 'Укажите имя'
  }

  const digits = fields.phone.replace(/\D/g, '')
  if (!digits) {
    errors.phone = 'Укажите телефон'
  } else if (digits.length < 10) {
    errors.phone = 'Проверьте номер телефона'
  }

  return errors
}

export function useLeadForm() {
  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setFields((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => {
      if (!current[name]) {
        return current
      }

      const nextErrors = { ...current }
      delete nextErrors[name]
      return nextErrors
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validate(fields)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false)
      return
    }

    setSubmitted(true)
    setFields(initialFields)
  }

  return {
    fields,
    errors,
    submitted,
    handleChange,
    handleSubmit,
  }
}
