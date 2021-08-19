'use strict'

const node = document.querySelector('details')
node.addEventListener('toggle', toggleStatus)

function toggleStatus({ target: node }) {
  const span = document.querySelector('span')
  span.textContent = node.open
    ? 'opened'
    : 'closed'
}
