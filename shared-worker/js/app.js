import { logAndMirror, initConsoleUI } from './log-mirror.js'

const sharedWorker = new SharedWorker('js/shared-worker.js')
sharedWorker.port.postMessage('index.html')

initConsoleUI()

sharedWorker.port.onmessage = (event) => {
  logAndMirror(event.data)
}
