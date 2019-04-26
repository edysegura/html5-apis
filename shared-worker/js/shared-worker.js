'use strict'

const messagesLog = []

self.onconnect = event => {
  const [ port ] = event.ports
  port.onmessage = event => {
    messagesLog.push(`${ Date.now() } - Message from ${event.data}`)
    port.postMessage(messagesLog)
  }
}
