'use strict'

self.onmessage = ({ data }) => {
  // do something heavy processing here
  console.log("I'm in another JS Thread!! aeee!")
  self.postMessage('You said: ' + data)
}
