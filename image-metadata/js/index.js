import exifr from 'https://cdn.jsdelivr.net/npm/exifr@7.1.3/+esm'

const inputFile = document.querySelector('input')
const preview = document.querySelector('img')

function showImagePreview(file) {
  const fileReader = new FileReader()
  fileReader.addEventListener('loadend', (event) => {
    preview.src = event.target.result
    exifr.parse(preview.src).then(output => console.log(output))
  })
  fileReader.readAsDataURL(file)
}

inputFile.addEventListener('change', (event) => {
  const [file] = event.target.files
  showImagePreview(file)
})
