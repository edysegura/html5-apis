'use strict'

;(async function loadData() {
  const endpoint = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151'
  const response = await fetch(endpoint)
  const data = await response.json()
  console.log(data)
})()
