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
  const iconIndex = errorNumber % icons.length
  throw new Error(`${icons[iconIndex]} Error ${errorNumber} unhandled`)
}

function addToLog(message) {
  const logs = document.querySelector('#logs')
  logs.value += message + '\n'
}

Array.from({ length: 5 }).forEach((_, errorNumber) => {
  setTimeout(() => generateError(errorNumber + 1))
})
