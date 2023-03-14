import exifr from 'https://cdn.jsdelivr.net/npm/exifr@7.1.3/+esm'

const inputFile = document.querySelector('input')
const preview = document.querySelector('img')

function showImagePreview(file) {
  const fileReader = new FileReader()
  fileReader.addEventListener('loadend', (event) => {
    preview.src = event.target.result
    showImageMetadata(preview.src)
  })
  fileReader.readAsDataURL(file)
}

inputFile.addEventListener('change', (event) => {
  const [file] = event.target.files
  showImagePreview(file)
})

async function showImageMetadata(imageUrl) {
  // https://mutiny.cz/exifr/
  const output = await exifr.parse(imageUrl)
  const pre = document.querySelector('pre')
  pre.textContent = JSON.stringify(output, null, 2)
}
