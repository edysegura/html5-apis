async function doRequest(httpStatusCode = 200) {
  try {
    const response = await fetch(`https://httpstat.us/${httpStatusCode}`)
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`)
    }
    return response
  } catch (error) {
    throw new Error(`Request error: ${error.message}`, error)
  }
}

async function performGoodRequest(httpCode) {
  try {
    const response = await doRequest(httpCode)
    const text = await response.text()
    showMessage(text)
  } catch (error) {
    showMessage(error.message)
  }
}

async function performBadRequest(httpCode) {
  try {
    await doRequest(httpCode)
  } catch (error) {
    showMessage(error.message)
  }
}

function showMessage(message) {
  const output = document.querySelector('#result')
  output.textContent = message

  // Add visual feedback
  output.style.backgroundColor = message.includes('error')
    ? 'var(--error-color)'
    : 'var(--success-color)'
  output.style.color = 'white'

  // Reset the background color after 2 seconds
  setTimeout(() => {
    output.style.backgroundColor = 'var(--background-color)'
    output.style.color = 'var(--color)'
  }, 2000)
}
