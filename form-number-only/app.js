import { validateNumericInput } from './validation.js'
import { InputFeedback } from './feedback.js'

const numericInputs = document.querySelectorAll("[inputmode='numeric']")

numericInputs.forEach((input) => {
  setupNumericInput(input)
})

function setupNumericInput(inputElement) {
  const feedback = new InputFeedback(inputElement)

  inputElement.addEventListener('beforeinput', (event) => {
    const beforeValue = inputElement.value
    const handleInvalidInput = () => {
      if (!validateNumericInput(inputElement.value)) {
        inputElement.value = beforeValue
        feedback.showError()
        setTimeout(() => feedback.hideError(), 2000)
      }
    }
    event.target.addEventListener('input', handleInvalidInput, { once: true })
  })
}
