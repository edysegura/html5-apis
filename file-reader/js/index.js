'use strict'

const inputFile = document.querySelector('input')
const preview = document.querySelector('img')
const paragraph = document.querySelector('p')

function showImagePreview(file) {
  const fileReader = new FileReader()
  fileReader.addEventListener('loadend', event => {
    preview.src = event.target.result
  })
  fileReader.readAsDataURL(file)
}

function recognizeText(file) {
  paragraph.textContent = 'Recognizing the text...'
  Tesseract.recognize(file).then((result) => {
    paragraph.textContent = result.text
  })
}

inputFile.addEventListener('change', event => {
  const [ file ] = event.target.files
  showImagePreview(file)
  recognizeText(file)
})
