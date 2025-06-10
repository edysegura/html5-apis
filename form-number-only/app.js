const numericInputs = document.querySelectorAll("[inputmode='numeric']")

numericInputs.forEach((input) => {
  validateInput(input)
})

function validateInput(inputElement) {
  inputElement.addEventListener('beforeinput', function (event) {
    let beforeValue = inputElement.value
    event.target.addEventListener(
      'input',
      function () {
        if (inputElement.validity.patternMismatch) {
          inputElement.value = beforeValue
        }
      },
      { once: true },
    )
  })
}
