const button = document.querySelector('button')

button.addEventListener('click', loadUsers)

async function loadUsers() {
  const data = await import('./data.json', { with: { type: 'json' } })
  console.log('loading users...', data)
}
