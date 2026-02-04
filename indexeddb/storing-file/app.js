import Dexie from 'https://cdn.jsdelivr.net/npm/dexie@4.0.11/+esm'

const db = new Dexie('pokemonDB-files')

db.version(2).stores({
  pokemon: '++id,name',
})

db.on('populate', async () => {
  await db.pokemon.bulkPut([
    {
      name: 'Bulbasaur',
      picture: await downloadImage(buildUrl(1)),
    },
    {
      name: 'Charmander',
      picture: await downloadImage(buildUrl(4)),
    },
    {
      name: 'Squirtle',
      picture: await downloadImage(buildUrl(7)),
    },
    {
      name: 'Pikachu',
      picture: await downloadImage(buildUrl(25)),
    },
  ])
  retrieveData()
})

await db.open()

function buildUrl(pokeNumber) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNumber}.png`
}

function byChar(char) {
  return function (poke) {
    console.log(poke.name)
    return poke.name.includes(char)
  }
}

async function retrieveData() {
  const pokemonList = await db.pokemon
    // .where("name")
    // .startsWithIgnoreCase("c")
    // .filter(byChar("a"))
    .toArray()

  const section = document.querySelector('section')
  const pokeHTML = pokemonList.map(toHTML).join('')
  section.innerHTML = pokeHTML
  document.body.appendChild(section)

  function toHTML(poke) {
    return `
        <article>
          <header>
            <h3>${poke.name}</h3>
            <small>ID: ${poke.id}</small>
          </header>
          <img alt="${poke.name}" src="${URL.createObjectURL(poke.picture)}" style="max-width: 100%; height: auto;">
        </article>
    `
  }
}
retrieveData()

async function downloadImage(imageUrl) {
  const response = await fetch(imageUrl)
  const blob = await response.blob()
  return blob
}

async function saveFormData(event) {
  event.preventDefault()
  const form = event.target
  await saveOnDatabase({
    name: form.name.value,
    pokeNumber: form.pokeNumber.value,
  })
  retrieveData()
  form.reset()
  form.name.focus()
  return false
}

async function saveOnDatabase({ name, pokeNumber }) {
  const pokemon = await db.pokemon.where('name').equals(name).toArray()
  if (pokemon.length === 0) {
    await db.pokemon.add({
      name,
      picture: await downloadImage(buildUrl(pokeNumber)),
    })
  }
}

const form = document.querySelector('form')
form.addEventListener('submit', saveFormData)
