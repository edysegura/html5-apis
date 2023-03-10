
const inputFile = document.querySelector('input')
const preview = document.querySelector('img')

function showImagePreview(file) {
  const fileReader = new FileReader()
  fileReader.addEventListener('loadend', (event) => {
    preview.src = event.target.result
  })
  fileReader.readAsDataURL(file)
}

inputFile.addEventListener('change', (event) => {
  const [file] = event.target.files
  showImagePreview(file)
})
