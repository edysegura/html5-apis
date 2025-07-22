const form = document.querySelector('form')
const input = form.querySelector('input[type="url"]')
const pre = document.querySelector('pre')

function processUrl(event) {
  event.preventDefault()

  const url = new URL(form.url.value)
  const queryParams = Object.fromEntries(url.searchParams.entries())

  pre.textContent = JSON.stringify(queryParams, null, 2)
}

form.addEventListener('submit', processUrl)
