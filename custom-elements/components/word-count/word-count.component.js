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
    return `
      <style>
        @import url('./components/word-count/word-count.component.css');
      </style>
    `
  }
}

customElements.define('word-count', WordCount)
