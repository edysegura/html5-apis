'use strict'

const startButton = document.getElementById('start')
const output = document.getElementById('output')

function newContent() {
  return {
    message: '',
    timestamp: Date.now()
  }
}

function formatContent(content) {
  return `${content.timestamp}: ${content.message}`
}

function getMinutesFromWord(word) {
  if(word === 'one') return 1
  if(word === 'two') return 2
  if(word === 'three') return 3
  if(word === 'four') return 4
  if(word === 'five') return 5
  return isNaN(+word) ? 1 : +word
}

function saveMinutes(minutes) {
  setTimeout(() => {
    const limit = Date.now() - minutes * 1000 * 60
    const texts = contents.filter((content) => {
      return content.timestamp > limit
    })
    console.log({minutes, texts})
  }, 1000)
}

const contents = []

const keywords = [
  `capture`,
  `captor`
]

let lastRecord = 0

const convertToText = event => {
  for (let i = event.resultIndex; i < event.results.length; i++) {
    //if (event.results[i].isFinal) {
      const content = event.results[i][0].transcript.trim()
      contents[contents.length - 1].message = content
        if(content.includes("minute")) {
          const words = content.split(" ")
          const index = words.indexOf("minute") || content.indexOf("minutes")
          console.log({index})
          const keyword = words[index - 2]
          if(!keyword) continue
          if(lastRecord !== contents.length) {
          if(keyword.includes("remember")) {
            lastRecord = contents.length
            const minutes = getMinutesFromWord(words[index-1])
            saveMinutes(minutes)
          }
        }
        }
        if(event.results[i].isFinal) {
          contents.push(newContent())
        }
      output.innerHTML = contents.map(formatContent).join("<br/>")
    //}
  }
}

const startToListen = () => {
  const recognition = new webkitSpeechRecognition()
  const list = new webkitSpeechGrammarList()
  list.addFromString('remember | 1 | 2 | 3 | 4 | 5 | minute | minutes')
  recognition.grammars = list
  recognition.continuous = true
  recognition.interimResults = true
  recognition.lang = 'en-US'
  recognition.start()
  contents.push(newContent())
  recognition.addEventListener('result', convertToText)
}

startButton.addEventListener('click', startToListen)