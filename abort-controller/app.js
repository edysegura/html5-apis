const btnClick = document.getElementById('btn-click')
const btnAbort = document.getElementById('btn-abort')

const controller = new AbortController()

btnClick.addEventListener(
  'click',
  (event) => {
    console.log(`👁️ [app.js] button clicked`)
  },
  { signal: controller.signal },
) // pass an AbortSignal to this handler

btnAbort.addEventListener('click', () => {
  controller.abort() // abort the event listener
  console.log(`👁️ [app.js] event listener aborted`)
})
