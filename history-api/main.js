const links = document.querySelectorAll('a')
const content = document.getElementById('content')

for (const link of links) {
  link.addEventListener('click', (event) => {
    event.preventDefault()
    const link = event.target
    const newContent = link.dataset.content
    history.pushState(newContent, null, link.href)
    content.innerHTML = newContent
  })
}

window.addEventListener('popstate', (event) => {
  console.log(`location: ${document.location}, state: ${event.state}`)
  content.innerHTML = event.state || 'This is the default content.'
})
