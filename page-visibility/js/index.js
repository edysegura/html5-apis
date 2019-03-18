'use strict'

const logCurrentState = () => {
  const documentStates = {
    prerender: 'Page is prerendered!',
    hidden: 'Page is hidden!',
    visible: 'Page is visible!'
  }
  console.log(documentStates[ document.visibilityState ])
}

document.addEventListener('visibilitychange', logCurrentState)
