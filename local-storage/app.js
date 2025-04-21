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

    if (Object.keys(localStorage).length === 0) {
      lsValues.innerHTML = '<p>No items in localStorage</p>'
      return
    }

    const tableRows = Object.keys(localStorage)
      .map((key) => {
        const value = localStorage.getItem(key)
        return `
          <tr>
            <td>${key}</td>
            <td>${value}</td>
          </tr>
        `
      })
      .join('')

    const table = `
      <table role="grid">
        <thead>
          <tr>
            <th scope="col">Key</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `

    lsValues.innerHTML = table
  }
}

new App()
