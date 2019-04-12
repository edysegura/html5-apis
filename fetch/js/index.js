'use strict'

function addToList(pokemon) {
  const ol = document.querySelector('ol')
  const li = document.createElement('li')
  li.textContent = pokemon.name
  ol.appendChild(li)
}

function showPokemons(pokemons) {
  pokemons.forEach(addToList)
}

;(async function fetchData() {
  const endpoint = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151'
  const response = await fetch(endpoint)
  const data = await response.json()
  showPokemons(data.results)
})()
