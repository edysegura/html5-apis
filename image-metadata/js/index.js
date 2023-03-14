import exifr from 'https://cdn.jsdelivr.net/npm/exifr@7.1.3/+esm'
// import L from 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/leaflet-src.esm.js';

const inputFile = document.querySelector('input')
const preview = document.querySelector('img')

function showImagePreview(file) {
  const fileReader = new FileReader()
  fileReader.addEventListener('loadend', (event) => {
    preview.src = event.target.result
    showImageMetadata(preview.src)
  })
  fileReader.readAsDataURL(file)
}

inputFile.addEventListener('change', (event) => {
  const [file] = event.target.files
  showImagePreview(file)
})

async function showImageMetadata(imageUrl) {
  // https://mutiny.cz/exifr/
  const output = await exifr.parse(imageUrl)
  const pre = document.querySelector('pre')
  pre.textContent = JSON.stringify(output, null, 2)
  // if(output) {
  //   showMap()
  // }
}

// function showMap() {
//   const map = L.map('map').setView([51.505, -0.09], 13)

//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution:
//       'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
//     maxZoom: 18,
//   }).addTo(map)

//   L.marker([51.5, -0.09])
//     .addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup()
// }
