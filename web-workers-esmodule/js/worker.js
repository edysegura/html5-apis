import { times } from 'https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm'

self.onmessage = ({ data }) => {
  // do something heavy processing here
  times(3, () => console.log('Heavy processing...'))
  self.postMessage('You said: ' + data)
}
