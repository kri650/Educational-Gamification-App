import { useState } from 'react'

export default function useForm(initialValues, validationRules = {}) {
  const [values, setValues]           = useState(initialValues)
  const [errors, setErrors]           = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    if (errors._form) setErrors(prev => ({ ...prev, _form: '' }))
  }

  const validate = () => {
    const newErrors = {}
    Object.keys(validationRules).forEach(field => {
      const rule = validationRules[field]
      if (rule.required && !values[field]) newErrors[field] = rule.message || 'Required'
      if (rule.minLength && values[field]?.length < rule.minLength)
        newErrors[field] = `Minimum ${rule.minLength} characters`
      if (rule.pattern && !rule.pattern.test(values[field]))
        newErrors[field] = rule.message || 'Invalid format'
    })
    return newErrors
  }

  const handleSubmit = (onSubmit) => async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    setIsSubmitting(true)
    try { await onSubmit(values) }
    finally { setIsSubmitting(false) }
  }

  return { values, errors, handleChange, handleSubmit, isSubmitting, setErrors }
}
