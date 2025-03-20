window.addEventListener('error', (event) => {
  console.info('Global error:', event.error)
})

try {
  throw new Error('This is a local error')
} catch (error) {
  console.info('Caught error:', error) // This will not be caught
}

function error01() {
  throw new Error('🐞 Error 01')
}

function error02() {
  throw new Error('🪰 Error 02')
}

error01()
error02()

// throw new Error('This is a global error')
