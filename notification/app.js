'use strict'

const [enableButton, notificationButton] = document.querySelectorAll('button')

function updatePermissionStatus() {
  const statusDiv = document.getElementById('permission-status')
  if (!statusDiv) return
  let status = Notification.permission
  let color = ''
  switch (status) {
    case 'granted':
      color = 'var(--pico-success)'
      break
    case 'denied':
      color = 'var(--pico-danger)'
      break
    default:
      color = 'var(--pico-muted-color)'
  }
  statusDiv.textContent = `Notification permission: ${status}`
  statusDiv.style.color = color
}

function enableNotification() {
  Notification.requestPermission().then((permission) => {
    updatePermissionStatus()
    console.log('Notification permission: ' + permission)
  })
}

function showNotification() {
  const notificationParams = {
    body: 'This is the notification body, enjoy using this feature!',
    icon: 'https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_48-512.png',
  }
  const notification = new Notification('Warning', notificationParams)
  const delay = 5000
  setTimeout(() => notification.close(), delay)
}

enableButton.addEventListener('click', () => enableNotification())
notificationButton.addEventListener('click', () => showNotification())
updatePermissionStatus()
