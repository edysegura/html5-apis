'use strict'

self.onmessage = event => {
  postMessage('You said: ' + event.data)
}