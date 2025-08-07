'use strict'

const logArea = document.getElementById('logArea')

const logCurrentState = (event) => {
  const documentStates = {
    prerender: 'Page is prerender!',
    hidden: 'Page is hidden!',
    visible: 'Page is visible!',
  }
  const visibilityState = event.target.visibilityState
  const message = documentStates[visibilityState]
  const timestamp = new Date().toLocaleTimeString()
  logArea.value += `[⏱️${timestamp}] ${message}\n`
  logArea.scrollTop = logArea.scrollHeight
}

document.addEventListener('visibilitychange', logCurrentState)

// Log initial state
logCurrentState({ target: document })
