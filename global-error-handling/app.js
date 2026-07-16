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

function generateError(errorNumber) {
  const icons = ['🐞', '🪰', '🦗', '🕷️']
  const randomIndex = Math.floor(Math.random() * icons.length)
  throw new Error(`${icons[randomIndex]} Error ${errorNumber} unhandled`)
}

function addToLog(message) {
  const logs = document.querySelector('#logs')
  logs.value += message + '\n'
}

setTimeout(() => generateError(1))
setTimeout(() => generateError(2))
setTimeout(() => generateError(3))
setTimeout(() => generateError(4))
