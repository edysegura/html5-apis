const dialog = document.getElementById('color-settings')
const p = document.getElementById('returnedValue')

// prettier-ignore
const [
  showDialogButton,
  closeButton,
  cancelButton,
  confirmButton
] = document.querySelectorAll('button')

// this is necessary to avoid scrollbar flicker the content when the dialog is opened/closed
const toggleScrollbar = (hide) => {
  if (!hide) {
    document.body.style.paddingRight = 0
    document.body.style.overflow = 'auto'
    return
  }
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth
  document.body.style.paddingRight = scrollbarWidth + 'px'
  document.body.style.overflow = 'hidden'
}

showDialogButton.addEventListener('click', () => {
  dialog.showModal()
  toggleScrollbar(true)
})

const buttons = [
  { button: closeButton, value: 'closed' },
  { button: cancelButton, value: 'cancelled' },
  { button: confirmButton, value: 'confirmed' },
]

buttons.forEach(({ button, value }) => {
  button.addEventListener('click', () => {
    dialog.close(value)
  })
})

dialog.addEventListener('close', (event) => {
  toggleScrollbar()
  console.log('Dialog event', event.target.returnValue)
  p.textContent = `The ${dialog.returnValue} event was trigged.`
})
