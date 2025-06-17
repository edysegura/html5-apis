import exifr from 'https://cdn.jsdelivr.net/npm/exifr@7.1.3/+esm'
import Leaflet from 'https://cdn.jsdelivr.net/npm/leaflet@1.9.3/+esm'

const inputFile = document.querySelector('input')
const preview = document.querySelector('img')
const placeholder = document.querySelector('.placeholder')

function showImagePreview(file) {
  const fileReader = new FileReader()
  fileReader.addEventListener('loadend', (event) => {
    preview.src = event.target.result
    preview.style.display = 'block'
    placeholder.style.display = 'none'
    showImageMetadata(preview.src)
  })
  fileReader.readAsDataURL(file)
}

inputFile.addEventListener('change', (event) => {
  const [file] = event.target.files
  if (file) {
    showImagePreview(file)
  } else {
    preview.style.display = 'none'
    placeholder.style.display = 'block'
    preview.src = ''
    document.querySelector('pre').textContent = ''
  }
})

async function showImageMetadata(imageUrl) {
  // https://mutiny.cz/exifr/
  const output = await exifr.parse(imageUrl)
  const pre = document.querySelector('pre')
  pre.textContent = JSON.stringify(output, null, 2)
  if (output) {
    showMap(output)
  }
}

function showMap({ latitude, longitude }) {
  const map = Leaflet.map('map').setView([latitude, longitude], 13)

  Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map)

  Leaflet.marker([latitude, longitude])
    .addTo(map)
    .bindPopup('This picture was taken here!')
    .openPopup()
}
