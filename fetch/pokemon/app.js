'use strict'

const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dark: '#705848',
  dragon: '#7038F8',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
}

function createPokemonRow(pokemon) {
  const row = document.createElement('tr')

  // Sprite cell
  const spriteCell = document.createElement('td')
  const sprite = document.createElement('img')
  sprite.src = pokemon.sprites.front_default
  sprite.alt = `${pokemon.name} sprite`
  sprite.className = 'pokemon-img'
  spriteCell.appendChild(sprite)

  // Name cell
  const nameCell = document.createElement('td')
  nameCell.textContent = pokemon.name
  nameCell.className = 'pokemon-name'

  // Types cell
  const typesCell = document.createElement('td')
  pokemon.types.forEach((type) => {
    const typeSpan = document.createElement('span')
    typeSpan.textContent = type.type.name
    typeSpan.className = 'pokemon-type'
    typeSpan.style.backgroundColor = typeColors[type.type.name]
    typesCell.appendChild(typeSpan)
  })

  row.appendChild(spriteCell)
  row.appendChild(nameCell)
  row.appendChild(typesCell)

  return row
}

async function fetchPokemonDetails(url) {
  const response = await fetch(url)
  return response.json()
}

async function fetchPokemonData() {
  const endpoint = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151'
  const response = await fetch(endpoint)
  const data = await response.json()

  const pokemonList = document.getElementById('pokemon-list')

  // Show loading state
  pokemonList.innerHTML =
    '<tr><td colspan="3" style="text-align: center;">Loading Pokemon data...</td></tr>'

  try {
    // Fetch details for each Pokemon
    const pokemonDetails = await Promise.all(
      data.results.map((pokemon) => fetchPokemonDetails(pokemon.url)),
    )

    // Clear loading state
    pokemonList.innerHTML = ''

    // Add each Pokemon to the table
    pokemonDetails.forEach((pokemon) => {
      const row = createPokemonRow(pokemon)
      pokemonList.appendChild(row)
    })
  } catch (error) {
    pokemonList.innerHTML =
      '<tr><td colspan="3" style="text-align: center;">Error loading Pokemon data. Please try again.</td></tr>'
    console.error('Error fetching Pokemon details:', error)
  }
}

// Start the fetch process when the page loads
fetchPokemonData()
