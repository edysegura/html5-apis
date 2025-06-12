const numericInputs = document.querySelectorAll("[inputmode='numeric']")

numericInputs.forEach((input) => {
  validateInput(input)
})

function validateInput(inputElement) {
  const feedbackElement = document.createElement('small')
  feedbackElement.textContent = 'Only numbers are allowed'
  feedbackElement.style.color = 'var(--pico-form-element-invalid-color)'
  feedbackElement.style.display = 'none'
  inputElement.parentNode.insertBefore(
    feedbackElement,
    inputElement.nextSibling,
  )

  inputElement.addEventListener('beforeinput', function (event) {
    let beforeValue = inputElement.value
    event.target.addEventListener(
      'input',
      function () {
        if (inputElement.validity.patternMismatch) {
          inputElement.value = beforeValue
          inputElement.setAttribute('aria-invalid', 'true')
          feedbackElement.style.display = 'block'
          // Add a subtle shake animation
          inputElement.style.animation = 'shake 0.3s'
          setTimeout(() => {
            inputElement.style.animation = ''
            feedbackElement.style.display = 'none'
            inputElement.setAttribute('aria-invalid', 'false')
          }, 1000)
        }
      },
      { once: true },
    )
  })
}
