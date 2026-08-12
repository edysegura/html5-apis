const btnClick1 = document.getElementById('btn-click1')
const btnClick2 = document.getElementById('btn-click2')
const btnAbort = document.getElementById('btn-abort')

const controller = new AbortController()

btnClick1.addEventListener(
  'click',
  (event) => {
    logMessage(`👁️ [app.js] button 1 clicked`)
  },
  { signal: controller.signal },
) // pass an AbortSignal to this handler

btnClick2.addEventListener(
  'click',
  (event) => {
    logMessage(`👁️ [app.js] button 2 clicked`)
  },
  { signal: controller.signal },
) // pass an AbortSignal to this handler

btnAbort.addEventListener(
  'click',
  () => {
    controller.abort() // abort the event listener
    logMessage(`👁️ [app.js] event listener aborted`)
  },
  { once: true },
) // only allow this button to be clicked once

function logMessage(message) {
  const log = document.getElementById('log')
  log.value += `${message}\n`
}
