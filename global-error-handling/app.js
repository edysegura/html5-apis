window.addEventListener('error', (event) => {
  const errorMessage = `🌍 Global unhandled error: ${event.error.message}`
  console.info(errorMessage)
  addToLog(errorMessage)
})

try {
  // this will not be caught by the global error handler
  throw new Error('🦆 This is a handled error')
} catch (error) {
  addToLog(`😶‍🌫️ Handled error: ${error.message}`)
}

function error01() {
  throw new Error('🐞 Error 01')
}

function error02() {
  throw new Error('🪰 Error 02')
}

function addToLog(message) {
  const logs = document.querySelector('#logs')
  logs.value += message + '\n'
}

setTimeout(() => error01())
setTimeout(() => error02())
