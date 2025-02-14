import { times } from 'https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm'

self.onmessage = ({ data }) => {
  const dataProcessed = [`\t* ${data}`]
  // do something heavy processing here
  times(3, (index) =>
    dataProcessed.push(`\t* Heavy processing... ${index + 1}`),
  )
  self.postMessage('You said:\n' + dataProcessed.join('\n'))
}
