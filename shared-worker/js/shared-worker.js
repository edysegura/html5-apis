'use strict'

self.onconnect = event => {
  const [ port ] = event.ports

  port.onmessage = event => {
    port.postMessage(`Message from ${event.data}`)
  }
}
