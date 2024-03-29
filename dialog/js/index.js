'use strict'

const dialog = document.getElementById('color-settings')
const colors = document.querySelector('select')

// prettier-ignore
const [
  showDialogButton,
  cancelButton,
  confirmButton
] = document.querySelectorAll('button')

showDialogButton.addEventListener('click', () => {
  dialog.showModal()
})

colors.addEventListener('change', () => {
  confirmButton.value = colors.value
})

dialog.addEventListener('close', () => {
  console.log('Dialog returned value', dialog.returnValue)
  document.body.style.backgroundColor = dialog.returnValue
})
