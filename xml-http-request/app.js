'use strict'

const button = document.querySelector('button')
const pre = document.querySelector('pre')

button.addEventListener('click', () => {
  doXMLHttpRequest()
})

function doXMLHttpRequest() {
  const request = new XMLHttpRequest()
  request.open('GET', 'https://api.github.com/users/edysegura')
  request.addEventListener('loadstart', () => {
    console.log('---> HTTP request started')
    pre.textContent = 'loading...'
  })
  request.addEventListener('readystatechange', (event) => {
    console.log('---> State change:', event.target.readyState)
  })
  request.addEventListener('load', (event) => {
    console.log('---> HTTP request completed')
    console.log('---> Status:', event.target.status)
    logResponseHeaders(event.target)
    pre.textContent = event.target.responseText
  })
  request.send()
}

function logResponseHeaders(request) {
  console.log('---> Response Headers:')
  const headersString = request.getAllResponseHeaders()
  const headers = headersString
    .trim()
    .split(/[\r\n]+/)
    .map((line) => {
      const [key, value] = line.split(': ')
      return { key, value }
    })
  console.table(headers)
}
