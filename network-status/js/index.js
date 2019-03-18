'use strict'

const networkStatus = event => console.log(event.type)

window.addEventListener('offline', networkStatus)
window.addEventListener('online', networkStatus)