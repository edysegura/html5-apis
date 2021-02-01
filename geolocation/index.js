'use strict'

function showCoordinations(position) {
  const lat = document.getElementById('lat')
  const long = document.getElementById('long')
  lat.textContent = position.coords.latitude
  long.textContent = position.coords.longitude
  showMap(position.coords)
}

function showMap({ latitude, longitude }) {
  const mapOptions = {
    center: [latitude, longitude],
    zoom: 14,
  }
  const map = L.map('open-map', mapOptions)
  map.addLayer(createMapLayer())
}

function createMapLayer() {
  const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  return L.tileLayer(url)
}

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(showCoordinations)
}
