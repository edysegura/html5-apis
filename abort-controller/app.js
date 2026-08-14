const btnClick1 = document.getElementById('btn-click1')
const btnClick2 = document.getElementById('btn-click2')
const btnAbort = document.getElementById('btn-abort')

const controller = new AbortController()
const signal = controller.signal

btnClick1.addEventListener('click', clickHandler, { signal })
btnClick2.addEventListener('click', clickHandler, { signal })

btnAbort.addEventListener(
  'click',
  (event) => {
    controller.abort() // abort the event listener
    const reset = true
    logMessage(`👁️ [app.js] ${event.target.dataset.message}`, reset)
  },
  { once: true },
) // only allow this button to be clicked once

function logMessage(message, reset = false) {
  const log = document.getElementById('log')
  if (reset) {
    log.value = ''
  }
  log.value += `${message}\n`
  log.scrollTop = log.scrollHeight
}

function clickHandler(event) {
  logMessage(`👁️ [app.js] ${event.target.dataset.message}`)
}
