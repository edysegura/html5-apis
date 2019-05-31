export default class GithubProfileService {
  static async fetchUserProfile(user) {
    const response = await fetch(`https://api.github.com/users/${user}`)
    const data = await response.json()
    return data
  }
}
