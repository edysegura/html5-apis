'use strict'

function showResponse(json) {
  const pre = document.querySelector('pre')
  pre.textContent = json
}

const request = new XMLHttpRequest()
request.open('GET', 'https://api.github.com/users/edysegura')
request.addEventListener('load', event => showResponse(event.target.responseText))
request.send()
