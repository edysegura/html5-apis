const button = document.querySelector('button')
const p = document.querySelector('p')
const textarea = document.querySelector('textarea')

function logger(logMessage) {
  console.log(logMessage)
  textarea.value += `${logMessage}\n`
}

const firstObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes') {
      const logMessage = `[first-observer] The ${
        mutation.attributeName
      } attribute was modified to ${mutation.target.getAttribute(
        mutation.attributeName,
      )}.`
      logger(logMessage)
    }
  })
})

const secondObserver = new MutationObserver(() => {
  const logMessage = `[second-observer] The attribute aria-hidden has been modified to ${p.ariaHidden}.`
  logger(logMessage)
})

firstObserver.observe(p, {
  attributes: true,
})

secondObserver.observe(p, {
  attributes: true,
  attributeFilter: ['aria-hidden'],
})

button.addEventListener('click', () => {
  p.ariaHidden = !p.ariaHidden
  p.title = p.ariaHidden === 'true' ? 'Testing ON' : 'Testing OFF'
  p.classList.toggle('hidden')
})
