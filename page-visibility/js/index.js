'use strict'

const logCurrentState = event => {
  const documentStates = {
    prerender: 'Page is prerendered!',
    hidden: 'Page is hidden!',
    visible: 'Page is visible!'
  }
  const visibilityState = event.target.visibilityState
  console.log(documentStates[ visibilityState ])
}

document.addEventListener('visibilitychange', logCurrentState)
