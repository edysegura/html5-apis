import Dexie from 'https://cdn.jsdelivr.net/npm/dexie@4.0.11/+esm'

const db = new Dexie('pokemonDB')

db.version(1).stores({
  pokemon: '++id,name,types,sprite',
})

db.on('populate', async () => {
  const response = await fetch(
    'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151',
  )
  const data = await response.json()

  // Fetch detailed data for each pokemon including types
  const pokemonWithTypes = await Promise.all(
    data.results.map(async (pokemon) => {
      const detailResponse = await fetch(pokemon.url)
      const detailData = await detailResponse.json()
      return {
        name: pokemon.name,
        types: detailData.types.map((t) => t.type.name),
        sprite: detailData.sprites.front_default,
      }
    }),
  )

  await db.pokemon.bulkPut(pokemonWithTypes)
  listPokemon(db)
})

db.open()
listPokemon(db)

async function listPokemon(db) {
  const pokemon = await db.pokemon
    // .where('id')
    // .between(1, 20)
    // .filter((poke) => /^b/.test(poke.name))
    .toArray()
  console.table(pokemon)
  // Create and display table
  const container = document.querySelector('main')
  const tableRows = pokemon
    .map(
      (poke) => `
      <tr>
        <td><img src="${poke.sprite}" alt="${
        poke.name
      }" width="96" height="96" /></td>
        <td>${poke.name}</td>
        <td>${poke.types ? poke.types.join(', ') : 'N/A'}</td>
      </tr>
    `,
    )
    .join('')

  const table = `
    <table role="grid">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Types</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `

  container.insertAdjacentHTML('beforeend', table)
}
