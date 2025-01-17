'use strict'

class App {
  constructor() {
    this.estimateStorageQuota()
  }

  async estimateStorageQuota() {
    const estimate = await navigator.storage.estimate()
    this.showValue('usage', estimate.usage)
    this.showValue('quota', estimate.quota)
    this.calculateUsage(estimate)
  }

  showValue(elementId, value) {
    document.getElementById(elementId).textContent =
      ((value / 1024) / 1024).toFixed(2)
  }

  calculateUsage({ usage, quota }) {
    document.getElementById('percent').textContent =
      (usage * 100 / quota).toFixed(0)
  }
}

new App()