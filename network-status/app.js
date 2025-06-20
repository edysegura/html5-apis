'use strict'

function renderStatus(online) {
  const indicator = document.getElementById('status-indicator')
  if (!indicator) return
  if (online) {
    indicator.className = 'status-indicator status-online'
    indicator.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2l4 -4"/></svg>
      <span>Online: You are connected</span>
    `
  } else {
    indicator.className = 'status-indicator status-offline'
    indicator.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="8" x2="16" y2="16"/><line x1="16" y1="8" x2="8" y2="16"/></svg>
      <span>Offline: No internet connection</span>
    `
  }
}

function updateStatus() {
  renderStatus(navigator.onLine)
}

window.addEventListener('offline', updateStatus)
window.addEventListener('online', updateStatus)
document.addEventListener('DOMContentLoaded', updateStatus)
