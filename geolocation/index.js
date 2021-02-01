'use strict'

function showCoordinations(position) {
  const lat = document.getElementById('lat')
  const long = document.getElementById('long')
  lat.textContent = position.coords.latitude
  long.textContent = position.coords.longitude
  showMap(position.coords)
}

function showMap({ latitude, longitude }) {
  const zoomLevel = 13
  const map = L.map('open-map')
    .setView([latitude, longitude], zoomLevel)
  setDefaultTitleLayer(map)
}

function setDefaultTitleLayer(map) {
  const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  const options = {
    attribution: 
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
  L.tileLayer(url, options).addTo(map)
}

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(showCoordinations)
}
