'use strict'

function showCoordinations(position) {
  const lat = document.getElementById('lat')
  const long = document.getElementById('long')
  lat.textContent = position.coords.latitude
  long.textContent = position.coords.longitude
}

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(showCoordinations)
}