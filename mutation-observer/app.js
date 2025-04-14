const button = document.querySelector('button')
const p = document.querySelector('p')
const textarea = document.querySelector('textarea')

const firstObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes') {
      const logMessage = `[first-observer] The ${
        mutation.attributeName
      } attribute was modified to ${mutation.target.getAttribute(
        mutation.attributeName,
      )}.`
      console.log(logMessage)
      textarea.value += `${logMessage}\n`
    }
  })
})

const secondObserver = new MutationObserver((mutations) => {
  const logMessage = `[second-observer] The attribute aria-hidden has been modified to ${p.ariaHidden}.`
  console.log(logMessage)
  textarea.value += `${logMessage}\n`
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
