'use strict'

let map
function initialize(position) {
  showCoordinations(position)
  map = showMap(position.coords)
}

function showCoordinations(position) {
  const lat = document.getElementById('lat')
  const long = document.getElementById('long')
  lat.textContent = position.coords.latitude
  long.textContent = position.coords.longitude
}

function showMap({ latitude, longitude }) {
  const mapOptions = {
    center: [latitude, longitude],
    zoom: 14,
  }
  const map = L.map('open-map', mapOptions)
    .addLayer(createMapLayer())
  return map
}

function createMapLayer() {
  const urlTemplate = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  return L.tileLayer(urlTemplate)
}

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(initialize)
}

const buttons = document.querySelectorAll('button')
for (const button of buttons) {
  button.addEventListener('click', (event) => {
    const coords = {
      lat: event.target.getAttribute('data-lat'),
      lon: event.target.getAttribute('data-long')
    }
    map.panTo(coords)
    fetchCep()
  })
}

async function fetchCep() {
  const response = await fetch('https://viacep.com.br/ws/37540000/json/unicode/')
  const data = await response.json()
  console.log(data)
}
