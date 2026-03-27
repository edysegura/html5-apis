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

  async render() {
    const user = this.getAttribute('user')
    const data = await GithubProfileService.fetchUserProfile(user)
    this.root.innerHTML = `
      ${this.style()}
      <img src="${data.avatar_url}" alt="" />
      <pre>${this.mainFields(data)}</pre>
    `
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
