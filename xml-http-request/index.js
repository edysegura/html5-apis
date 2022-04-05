'use strict'

const button = document.querySelector('button')
const pre = document.querySelector('pre')

button.addEventListener('click', () => {
  pre.textContent = 'loading...'
  doXMLHttpRequest()
})

function showResponse(json) {
  pre.textContent = json
}

function doXMLHttpRequest() {
  const request = new XMLHttpRequest()
  request.open('GET', 'https://api.github.com/users/edysegura')
  request.addEventListener('load', (event) =>
    showResponse(event.target.responseText),
  )
  request.send()
}
