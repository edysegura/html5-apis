'use strict'

const node = document.querySelector('details')
node.addEventListener('toggle', event => {
  const span = document.querySelector('span')
  span.textContent = event.target.open ? 'open' : 'closed'
})
