'use strict'

self.onmessage = event => {
  self.postMessage('You said: ' + event.data)
}