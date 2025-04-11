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

const secondObserver = new MutationObserver(() => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      console.log('A child node has been added or removed.')
    }
  })
})

firstObserver.observe(p, {
  attributes: true,
})

button.addEventListener('click', () => {
  p.ariaHidden = !p.ariaHidden
  p.classList.toggle('hidden')
})
