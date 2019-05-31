class GithubProfile extends HTMLElement {
  constructor() {
    super()
    this.root = this.attachShadow({mode: 'open'})
    this.render()
  }

  mainFields(data) {
    const properties = ['name', 'followers', 'bio']

    const fewProperties = (newData, property) => {
      newData[property] = data[property]
      return newData
    }

    const mainFields = properties.reduce(fewProperties, {})
    return JSON.stringify(mainFields, null, 2)
  }

  async fetchUserProfile(user) {
    const response = await fetch(`https://api.github.com/users/${user}`)
    const data = await response.json()
    return data
  }

  async render() {
    const user = this.getAttribute('user')
    const data = await this.fetchUserProfile(user)
    this.root.innerHTML = `
      ${ this.style() }
      <img src="${data.avatar_url}" alt="" />
      <pre>${this.mainFields(data)}</pre>
    `
  }

  style() {
    return `
      <style>
        img {
          width: 100px;
          height: 100px;
        }
      </style>
    `
  }
}

customElements.define('github-profile', GithubProfile)
