'use strict'

const startButton = document.getElementById('start')
const stopButton = document.getElementById('stop')
const output = document.getElementById('output')
let recognition = null

const convertToText = (event) => {
  for (let i = event.resultIndex; i < event.results.length; i++) {
    if (event.results[i].isFinal) {
      const content = event.results[i][0].transcript.trim()
      output.textContent = content
    }
  }
}

const startToListen = () => {
  recognition = new webkitSpeechRecognition()
  recognition.continuous = true
  recognition.interimResults = true
  recognition.lang = 'pt-BR'

  recognition.addEventListener('result', convertToText)
  recognition.addEventListener('end', () => {
    startButton.disabled = false
    stopButton.disabled = true
  })

  recognition.start()
  startButton.disabled = true
  stopButton.disabled = false
}

const stopListening = () => {
  if (recognition) {
    recognition.stop()
    recognition = null
  }
}

startButton.addEventListener('click', startToListen)
stopButton.addEventListener('click', stopListening)
