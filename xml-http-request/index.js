'use strict'

const request = new XMLHttpRequest()
request.open('GET', 'https://api.github.com/users/edysegura')
request.addEventListener('load', event => console.log(event.target.responseText))
request.send()
