'use strict'

self.onmessage = ({ data }) => {
  self.postMessage('You said: ' + data)
}