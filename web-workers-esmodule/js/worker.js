import { times } from 'https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm'

self.onmessage = ({ data }) => {
  const dataProcessed = []
  // do something heavy processing here
  times(3, (index) => dataProcessed.push(`Heavy processing... ${index}`))
  self.postMessage('You said: ' + dataProcessed.join('\n'))
}
