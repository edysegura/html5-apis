async function generateSHA256Hash(message) {
  const msgBuffer = new TextEncoder().encode(message) // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer) // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)) // convert buffer to byte array
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('') // convert bytes to hex string
  return hashHex
}

const form = document.querySelector('form')
form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const formData = new FormData(form)
  const message = formData.get('textToBeEncrypted')
  const hash = await generateSHA256Hash(message)
  console.log('SHA-256 Hash:', hash, message)
  document.querySelector('output').textContent = hash
})
