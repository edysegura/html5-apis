import Dexie from 'https://cdn.jsdelivr.net/npm/dexie@3.2.3/+esm'

let db = new Dexie('pokemonDB')

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
