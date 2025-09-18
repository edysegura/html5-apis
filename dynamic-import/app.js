const button = document.querySelector('#load-btn')

button.addEventListener('click', loadUsers)

async function loadUsers() {
  try {
    // Show loading state
    button.disabled = true
    button.textContent = 'Loading...'

    const module = await import('./data.json', { with: { type: 'json' } })
    const {
      default: { users },
    } = module
    console.log('loading users...', users)
    listUsers(users)
  } catch (error) {
    console.error('Error loading users:', error)
    showError('Failed to load users. Please try again.')
  } finally {
    // Reset button state
    button.disabled = false
    button.textContent = 'Load Users'
  }
}

function listUsers(users) {
  const div = document.querySelector('#users')
  const generatedHTML = `
    <div class="grid">
      ${users
        .map(
          (user, index) => `
        <article class="card">
          <header>
            <h4>User ${index + 1}</h4>
          </header>
          <p><strong>Name:</strong> ${user}</p>
        </article>
      `,
        )
        .join('')}
    </div>
  `
  div.innerHTML = generatedHTML
}

function showError(message) {
  const div = document.querySelector('#users')
  div.innerHTML = `
    <article class="alert">
      <h4>Error</h4>
      <p>${message}</p>
    </article>
  `
}
