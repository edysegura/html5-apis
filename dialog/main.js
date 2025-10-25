const dialog = document.getElementById('color-settings')
const p = document.getElementById('returnedValue')
const showDialogButton = document.querySelector('button')

// this is necessary to avoid scrollbar flicker the content when the dialog is opened/closed
const toggleScrollbar = () => {
  if (toggleScrollbar.isHidden) {
    toggleScrollbar.isHidden = false
    document.body.style.paddingRight = 0
    document.body.style.overflow = 'auto'
    return
  }
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth
  document.body.style.paddingRight = scrollbarWidth + 'px'
  document.body.style.overflow = 'hidden'
  toggleScrollbar.isHidden = true
}

showDialogButton.addEventListener('click', () => {
  dialog.showModal()
  toggleScrollbar()
})

// const buttons = [
//   { button: closeButton, value: 'closed' },
//   { button: cancelButton, value: 'cancelled' },
//   { button: confirmButton, value: 'confirmed' },
// ]

// buttons.forEach(({ button, value }) => {
//   button.addEventListener('click', () => {
//     dialog.close(value)
//   })
// })

dialog.addEventListener('close', (event) => {
  toggleScrollbar()
  const returnedValue = event.target.returnValue
  console.log(`Dialog event ${returnedValue}`)
  p.textContent = `The ${returnedValue} event was trigged.`
})
