'use strict'

const [enableButton, notificationButton] = document.querySelectorAll('button')

function enableNotification() {
  Notification.requestPermission().then((permission) =>
    console.log('Notification permission: ' + permission),
  )
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
