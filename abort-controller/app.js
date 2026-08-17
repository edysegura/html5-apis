const btnClick1 = document.getElementById('btn-click1')
const btnClick2 = document.getElementById('btn-click2')
const btnClick3 = document.getElementById('btn-click3')

const controller = new AbortController()
const signal = controller.signal

btnClick1.addEventListener('click', clickHandler, { signal })
btnClick2.addEventListener('click', clickHandler, { signal })
btnClick3.addEventListener('click', clickHandler, { once: true })

function clickHandler(event) {
  const button = event.target
  const isAbortButton = button.id === 'btn-click3'
  isAbortButton && controller.abort()
  logMessage(`👁️ [app.js] ${button.dataset.message}`, isAbortButton)
}

function logMessage(message, reset = false) {
  const log = document.getElementById('log')
  reset && (log.value = '')
  log.value += `${message}\n`
  log.scrollTop = log.scrollHeight
}
