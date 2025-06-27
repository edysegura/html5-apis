class App {
  constructor() {
    this.registerServiceWorker()
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      console.log('Registering the Service Worker')

      const defaultMessage = 'Service Worker registration'
      const success = () => console.log(`${defaultMessage} successful`)
      const failure = (error) =>
        console.log(`${defaultMessage} failed: `, error)

      navigator.serviceWorker.register('./sw.js').then(success).catch(failure)
    }
  }

  setupButtons() {
    const fetchImageBtn = document.getElementById('fetch-image-btn')
    fetchImageBtn.addEventListener('click', () => {
      this.fetchImage()
    })
  }

  fetchImage() {
    const imageId = document.getElementById('image-id').value
    const image = document.querySelector('img')
    image.src = `https://picsum.photos/id/${imageId}/250/250`
  }
}

const app = new App()
