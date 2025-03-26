'use strict'

const dialog = document.getElementById('color-settings')

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

// prettier-ignore
const [
  showDialogButton,
  closeButton,
  cancelButton,
  confirmButton
] = document.querySelectorAll('button')

showDialogButton.addEventListener('click', () => {
  dialog.showModal()
  toggleScrollbar(true)
})

closeButton.addEventListener('click', () => {
  dialog.close()
})

cancelButton.addEventListener('click', () => {
  dialog.close()
})

dialog.addEventListener('close', () => {
  toggleScrollbar()
  console.log('Dialog returned value', dialog.returnValue)
})
