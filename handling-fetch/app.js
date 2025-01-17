async function doRequest(httpStatusCode = 200) {
  const output = document.querySelector('p')
  let response
  try {
    response = await fetch(`https://httpstat.us/${httpStatusCode}`)
    if (response.ok) {
      output.innerHTML = `${response.status}: ${response.statusText}`
      return response
    }
    throw new Error(`${response.status}: ${response.statusText}`)
  } catch (error) {
    output.innerHTML = error
    return error
  }
}

async function performHttp404() {
  try {
    doRequest(404)
  } catch (error) {
    showMessage(error.message)
  }
}

function showMessage(message) {
  const output = document.querySelector('p')
  output.textContent = message
}
