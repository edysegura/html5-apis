import Dexie from 'https://cdn.jsdelivr.net/npm/dexie@4.0.11/+esm'

const db = new Dexie('pokemonDB')

db.version(1).stores({
  pokemon: '++id,name',
})

db.on('populate', async () => {
  const response = await fetch(
    'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151',
  )
  const data = await response.json()
  await db.pokemon.bulkPut(data.results)
})

db.open()

const pokemon = await db.pokemon
  .where('id')
  .between(1, 20)
  .filter((poke) => /^b/.test(poke.name))
  .toArray()

console.table(pokemon)

const pre = document.querySelector('pre')
pre.textContent = JSON.stringify(pokemon, null, 2)
