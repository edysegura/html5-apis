'use strict'

const dialog = document.getElementById('color-settings')
const colors = document.querySelector('select')

const [
  showDialogButton,
  cancelButton,
  confirmButton
] = document.querySelectorAll('button')

showDialogButton.addEventListener('click', () => {
  dialog.showModal && dialog.showModal()
  dialog.open = true
})

colors.addEventListener('change', () => {
  confirmButton.value = colors.value
})

dialog.addEventListener('close', event => {
  console.log(dialog.returnValue)
})
