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
        p {
          font-family: Verdana;
        }
        span {
          color: #aaa;
          opacity: 0;
          transition: opacity 0.8s;
        }
        span::before {
          content: "➡️ ";
          color: pink;
        }
        p:hover span {
          opacity: 1;
        }
      </style>
    `
  }
}

customElements.define('word-count', WordCount)
