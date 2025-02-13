import { createWorker } from 'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.0/+esm'

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

async function recognizeImageText(file) {
  showText('Recognizing the image text...')
  const worker = await createWorker('eng')
  const fileRecognition = await worker.recognize(file)
  showText(fileRecognition.data.text)
  worker.terminate()
}

inputFile.addEventListener('change', (event) => {
  const [file] = event.target.files
  showImagePreview(file)
  recognizeImageText(file)
})
