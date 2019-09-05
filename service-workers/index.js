class App {

  constructor() {
    this.registerServiceWorker()
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      console.log('Registering the Service Worker')

      const success = event => console.log('Service Worker registration successful')
      const failure = error => console.log('Service Worker registration failed: ', error)

      navigator.serviceWorker.register('./sw.js')
        .then(success)
        .catch(failure)
    }
  }
}

new App()