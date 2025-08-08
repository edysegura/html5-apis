function generateNumbers() {
  const numbers = generateRandomNumbers()
  const textarea = document.querySelector('textarea')
  textarea.value += numbers.join('\n') + '\n'
}

function generateRandomNumbers(count = 10) {
  const typedArray = new Uint32Array(count)
  crypto.getRandomValues(typedArray)
  return Array.from(typedArray)
}
