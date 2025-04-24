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
  if (!newContent) {
    console.warn('No content provided for this link')
    return
  }
  history.pushState(newContent, '', link.href)
  updatePageContent(newContent)
}

function updatePageContent(newContent) {
  if (!contentElement) {
    console.error('Content element not found')
    return
  }
  contentElement.innerHTML = newContent || 'No content available'
}

function handleHistoryNavigation(event) {
  const state = event.state
  updatePageContent(state)
}
