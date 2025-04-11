const button = document.querySelector('button')
const p = document.querySelector('p')

const firstObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes') {
      console.log(
        `The ${
          mutation.attributeName
        } attribute was modified to ${mutation.target.getAttribute(
          mutation.attributeName,
        )}.`,
      )
    }
  })
})

const secondObserver = new MutationObserver((mutations) => {
  console.log(`The attribute aria-hidden has been modified to ${p.ariaHidden}.`)
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
