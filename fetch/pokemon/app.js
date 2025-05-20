'use strict'

function addToList(pokemon) {
  const ol = document.querySelector('ol')
  const li = document.createElement('li')
  li.textContent = pokemon.name
  ol.appendChild(li)
}

async function fetchPokemonData() {
  const endpoint = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151'
  const response = await fetch(endpoint)
  const data = await response.json()
  return data.results
}

fetchPokemonData().then((pokemon) => pokemon.forEach(addToList))
