import clipboard from 'https://cdn.jsdelivr.net/npm/clipboardy@5.1.0/+esm'

await clipboard.write('🦄')

const data = await clipboard.read()

console.log('Clipboard data:', data)
