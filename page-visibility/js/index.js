'use strict'

document.addEventListener('visibilitychange', () => {
  const documentStates = {
    prerender: 'Page is prerendered!',
    hidden: 'Page is hidden!',
    visible: 'Page is visible!'
  }
  console.log(documentStates[ document.visibilityState ])
})