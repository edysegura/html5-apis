'use strict'

const detailsElement = document.querySelector('details')
detailsElement.addEventListener('toggle', toggleStatus)

function toggleStatus({ target: detailsElement }) {
  const span = document.querySelector('span')
  span.textContent = detailsElement.open ? 'opened' : 'closed'
}
