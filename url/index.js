'use strict'

let input = document.querySelector('input')
let button = document.querySelector('button')
let pre = document.querySelector('pre')

function processUrl() {
  let url = new URL(input.value)
  let queryParams = {}

  console.debug(url)

  for (const [key, value] of url.searchParams.entries()) {
    queryParams[key] = value
  }

  pre.textContent = JSON.stringify(queryParams, null, 2)
}

button.addEventListener('click', processUrl)
