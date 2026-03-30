import hljs from 'https://cdn.jsdelivr.net/npm/highlight.js@11.11.1/+esm'
import GithubProfileService from './github-profile.service.js'

class GithubProfile extends HTMLElement {
  constructor() {
    super()
    this.root = this.attachShadow({ mode: 'open' })
    this.render()
  }

  mainFields(data) {
    const { name, followers, bio } = data
    return JSON.stringify({ name, followers, bio }, null, 2)
  }

  syntaxHighlight() {
    const code = this.root.querySelector('pre')
    code.classList.add('language-json')
    hljs.highlightElement(code)
  }

  async render() {
    const user = this.getAttribute('user')
    const data = await GithubProfileService.fetchUserProfile(user)
    this.root.innerHTML = `
      ${this.style()}
      <img src="${data.avatar_url}" alt="" />
      <pre>${this.mainFields(data)}</pre>
    `
    this.syntaxHighlight()
  }

  style() {
    const { href } = new URL('./github-profile.css', import.meta.url)
    return `
      <style>
        @import "${href}";
      </style>
    `
  }
}

customElements.define('github-profile', GithubProfile)
