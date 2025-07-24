'use strict'

const startButton = document.getElementById('start')
const output = document.getElementById('output')

const convertToText = event => {
  for (let i = event.resultIndex; i < event.results.length; i++) {
    if (event.results[i].isFinal) {
      const content = event.results[i][0].transcript.trim()
      output.textContent = content
    }
  }
}

const startToListen = () => {
  const recognition = new webkitSpeechRecognition()
  recognition.continuous = true
  recognition.interimResults = true
  recognition.lang = 'pt-BR'
  recognition.start()
  recognition.addEventListener('result', convertToText)
}

startButton.addEventListener('click', startToListen)