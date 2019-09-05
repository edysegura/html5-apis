class App {

  constructor() {
    this.registerServiceWorker()
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      console.log('Registering the Service Worker')

      const defaultMessage = 'Service Worker registration'
      const success = event => console.log(`${defaultMessage} successful`)
      const failure = error => console.log('${defaultMessage} failed: ', error)

      navigator.serviceWorker
        .register('./sw.js')
        .then(success)
        .catch(failure)
    }
  }
}

new App()