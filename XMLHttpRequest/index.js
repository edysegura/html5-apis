'use strict'

const request = new XMLHttpRequest()
request.open('GET', 'https://reqres.in/api/users')
request.addEventListener('load', event => console.log(event.target.responseText))
request.send()