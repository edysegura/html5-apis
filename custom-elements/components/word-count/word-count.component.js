class WordCount extends HTMLElement {
  constructor() {
    super()
    this.root = this.attachShadow({ mode: 'open' })
    this.render(this.getAttribute('text'))
  }

  render(text) {
    this.root.innerHTML = `
      ${this.style()}
      <p>${text} <span>has ${this.count(text)} word(s)</span></p>
    `
  }

  count(text) {
    return text.split(/\s+/g).length
  }

  style() {
    const { href } = new URL('./word-count.component.css', import.meta.url)
    return `
      <style>
      @import url('${href}');
      </style>
    `
  }
}

customElements.define('word-count', WordCount)
