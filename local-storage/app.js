class App {
  constructor() {
    this.bindButtonListener()
    this.listLocalStorageValues()
  }

  bindButtonListener() {
    const form = document.querySelector('form')
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      this.saveToStorage(form)
    })
  }

  saveToStorage(form) {
    const key = form.key.value
    const value = form.value.value
    if (key && value) {
      localStorage.setItem(key, value)
      this.listLocalStorageValues()
      form.reset()
      form.key.focus()
    }
  }

  listLocalStorageValues() {
    const lsValues = document.getElementById('lsValues')
    const toHtml = (key) => {
      const value = localStorage.getItem(key)
      return `<p>${key}: ${value}</p>`
    }
    const htmlOutput = Object.keys(localStorage).map(toHtml).join('')
    lsValues.innerHTML = htmlOutput
  }
}

new App()
