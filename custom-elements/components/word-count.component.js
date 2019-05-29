class WordCount extends HTMLElement {
  constructor() {
    super()
    this.root = this.attachShadow({ mode: 'open' })
    this.setText(this.getAttribute('text'))
  }

  setText(text) {
    this.root.innerHTML = `
      <p>${text} <span>| has ${this.count(text)} word(s)</span></p>
    `
  }

  count(text) {
    return text.split(/\s+/g).length
  }
}

customElements.define('word-count', WordCount)
