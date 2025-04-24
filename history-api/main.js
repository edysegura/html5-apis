const contentElement = document.getElementById('content')
const navigationLinks = document.querySelectorAll('a')

navigationLinks.forEach((link) => {
  link.addEventListener('click', handleNavigationClick)
})

window.addEventListener('popstate', handleHistoryNavigation)

function handleNavigationClick(event) {
  event.preventDefault()
  const link = event.target
  const newContent = link.dataset.content
  history.pushState(newContent, '', link.href)
  updatePageContent(newContent)
}

function updatePageContent(newContent) {
  contentElement.innerHTML = newContent || 'No content available'
}

function handleHistoryNavigation(event) {
  const newContent = event.state
  updatePageContent(newContent)
}
