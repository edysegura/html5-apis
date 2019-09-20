'use strict'

if ('storage' in navigator && 'estimate' in navigator.storage) {
  navigator.storage.estimate()
    .then(estimate => {
      document.getElementById('usage').textContent = (estimate.usage / 1024) / 1024;
      document.getElementById('quota').textContent = (estimate.quota / 1024) / 1024;
      document.getElementById('percent').textContent =
        (estimate.usage * 100 / estimate.quota).toFixed(0);
    });
}