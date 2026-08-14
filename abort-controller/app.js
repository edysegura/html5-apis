const btnClick1 = document.getElementById('btn-click1')
const btnClick2 = document.getElementById('btn-click2')
const btnAbort = document.getElementById('btn-abort')

const controller = new AbortController()

btnClick1.addEventListener(
  'click',
  (event) => {
    logMessage(`👁️ [app.js] ${event.target.dataset.message}`)
  },
  { signal: controller.signal },
) // pass an AbortSignal to this handler

btnClick2.addEventListener(
  'click',
  (event) => {
    logMessage(`👁️ [app.js] ${event.target.dataset.message}`)
  },
  { signal: controller.signal },
) // pass an AbortSignal to this handler

btnAbort.addEventListener(
  'click',
  () => {
    controller.abort() // abort the event listener
    const reset = true
    logMessage(`👁️ [app.js] event listener aborted`, reset)
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
