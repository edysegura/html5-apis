export class InputFeedback {
  constructor(inputElement) {
    this.inputElement = inputElement
    this.feedbackElement = this.createFeedbackElement()
  }

  createFeedbackElement() {
    const element = document.createElement('small')
    element.textContent = 'Only numbers are allowed'
    element.style.color = 'var(--pico-form-element-invalid-color)'
    element.style.display = 'none'
    this.inputElement.parentNode.insertBefore(
      element,
      this.inputElement.nextSibling,
    )
    return element
  }

  showError() {
    this.inputElement.setAttribute('aria-invalid', 'true')
    this.feedbackElement.style.display = 'block'
    this.inputElement.style.animation = 'shake 0.3s'
  }

  hideError() {
    this.inputElement.style.animation = ''
    this.feedbackElement.style.display = 'none'
    this.inputElement.setAttribute('aria-invalid', 'false')
  }

  showErrorFor2seconds() {
    this.showError()
    setTimeout(() => this.hideError(), 2000)
  }
}
