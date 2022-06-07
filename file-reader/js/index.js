'use strict'

const inputFile = document.querySelector('input')
const preview = document.querySelector('img')
const paragraph = document.querySelector('p')

function showImagePreview(file) {
  const fileReader = new FileReader()
  fileReader.addEventListener('loadend', (event) => {
    preview.src = event.target.result
  })
  fileReader.readAsDataURL(file)
}

function showText(text) {
  paragraph.textContent = text
}

function recognizeImageText(file) {
  showText('Recognizing the image text...')
  Tesseract.recognize(file).then((result) => showText(result.text))
}

inputFile.addEventListener('change', (event) => {
  const [file] = event.target.files
  showImagePreview(file)
  recognizeImageText(file)
})
