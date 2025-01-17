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
  const output = document.querySelector('p')
  output.textContent = message
}
