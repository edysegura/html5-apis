const btnClick1 = document.getElementById('btn-click1')
const btnClick2 = document.getElementById('btn-click2')
const btnAbort = document.getElementById('btn-abort')

const controller = new AbortController()
const signal = controller.signal

btnClick1.addEventListener('click', clickHandler, { signal })
btnClick2.addEventListener('click', clickHandler, { signal })
btnAbort.addEventListener('click', clickHandler, { once: true })

function logMessage(message, reset = false) {
  const log = document.getElementById('log')
  if (reset) {
    log.value = ''
  }
  log.value += `${message}\n`
  log.scrollTop = log.scrollHeight
}

function clickHandler(event) {
  const button = event.target
  const isAbortButton = button.id === 'btn-abort'
  isAbortButton && controller.abort()
  logMessage(`👁️ [app.js] ${button.dataset.message}`, isAbortButton)
}
