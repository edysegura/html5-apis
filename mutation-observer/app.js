const button = document.querySelector('button')
const p = document.querySelector('p')

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes') {
      console.log(`The ${mutation.attributeName} attribute was modified.`)
    }
  })
})

observer.observe(p, {
  attributes: true,
})

button.addEventListener('click', () => {
  p.ariaHidden = !p.ariaHidden
  p.classList.toggle('hidden')
})
