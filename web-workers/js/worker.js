'use strict'

self.onmessage = ({ data }) => {
  // do something heavy processing here
  self.postMessage('You said: ' + data)
}