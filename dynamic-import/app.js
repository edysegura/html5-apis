const button = document.querySelector('button')

button.addEventListener('click', loadUsers)

async function loadUsers() {
  const module = await import('./data.json', { with: { type: 'json' } })
  const {
    default: { users },
  } = module
  console.log('loading users...', users)
  listUsers(users)
}

function listUsers(users) {
  const div = document.querySelector('#users')
  const html = `
    <uL>
      ${users.map((user) => `<li>${user}</li>`).join('')}
    </ul>
  `
  div.innerHTML = html
}
