'use strict'
const sharedWorker = new SharedWorker('js/shared-worker.js')
sharedWorker.port.postMessage('another-page.html')

function formatArg(a) {
  if (a === null) return 'null'
  if (a === undefined) return 'undefined'
  if (typeof a === 'object') {
    try {
      return JSON.stringify(a)
    } catch (e) {
      return String(a)
    }
  }
  return String(a)
}

function appendLog(...args) {
  const ta = document.getElementById('console')
  if (!ta) return
  const timestamp = new Date().toLocaleString()
  const msg = args.map(formatArg).join(' ')
  ta.value += `${timestamp} - ${msg}\n`
  ta.scrollTop = ta.scrollHeight
}

const _origConsoleLog = console.log.bind(console)
console.log = function (...args) {
  _origConsoleLog(...args)
  try {
    appendLog(...args)
  } catch (e) {
    _origConsoleLog('log mirror error', e)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const clearBtn = document.getElementById('clearBtn')
  const ta = document.getElementById('console')
  if (clearBtn && ta)
    clearBtn.addEventListener('click', () => {
      ta.value = ''
    })
})

sharedWorker.port.onmessage = (event) => {
  console.log(event.data)
}
