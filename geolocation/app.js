import Leaflet from 'https://cdn.jsdelivr.net/npm/leaflet@1.9.3/+esm'

let map
function initialize(position) {
  showCoordinations(position.coords)
  map = showMap(position.coords)
}

function showCoordinations({ latitude, longitude }) {
  document.getElementById('lat').textContent = latitude
  document.getElementById('long').textContent = longitude
}

function showMap({ latitude, longitude }) {
  const mapOptions = {
    center: [latitude, longitude],
    zoom: 14,
  }
  const map = Leaflet.map('open-map', mapOptions).addLayer(createMapLayer())
  return map
}

function createMapLayer() {
  const urlTemplate = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  return Leaflet.tileLayer(urlTemplate)
}

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(initialize)
}

const buttons = document.querySelectorAll('button')
for (const button of buttons) {
  button.addEventListener('click', (event) => {
    const coords = {
      lat: event.target.dataset.lat,
      lon: event.target.dataset.long,
    }
    showCoordinations({
      latitude: coords.lat,
      longitude: coords.lon,
    })
    map.panTo(coords)
  })
}
