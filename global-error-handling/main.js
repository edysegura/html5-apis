window.addEventListener('error', (event) => {
  console.info('Global error:', event.error)
})

try {
  throw new Error('This is a local error')
} catch (error) {
  console.info('Caught error:', error) // This will not be caught
}

throw new Error('This is a global error')
