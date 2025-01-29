if (window.saveInMemory) {
  const pre = document.querySelector('pre')
  pre.textContent = JSON.stringify(window.saveInMemory, null, 2)
}
