import { validateNumericInput } from './validation.js'
import { InputFeedback } from './feedback.js'

const numericInputs = document.querySelectorAll("[inputmode='numeric']")

numericInputs.forEach((input) => {
  setupNumericInput(input)
})

function setupNumericInput(inputElement) {
  const feedback = new InputFeedback(inputElement)

  inputElement.addEventListener('beforeinput', function (event) {
    const beforeValue = inputElement.value
    event.target.addEventListener(
      'input',
      function () {
        if (!validateNumericInput(inputElement.value)) {
          inputElement.value = beforeValue
          feedback.showError()
          setTimeout(() => feedback.hideError(), 1000)
        }
      },
      { once: true },
    )
  })
}
