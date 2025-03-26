const formData = new FormData()
formData.set('name', 'John Doe')
formData.set('email', 'john.doe@email.com')

const response = await fetch('https://httpbin.org/post', {
  method: 'POST',
  body: formData,
})
const data = await response.json()

console.log('Response: ', data)
console.log('QueryString: ', new URLSearchParams(formData).toString())

// node formData.js
// bun formData.js
// deno --allow-net formData.js
