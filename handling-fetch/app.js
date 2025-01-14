async function doRequest() {
  let response
  try {
    response = await fetch('https://httpstat.us/400')
    if (response.ok) {
      return response
    }
    throw new Error(`Error: Response status ${response.status}`)
  } catch (error) {
    return error
  }
}
