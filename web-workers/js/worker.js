'use strict'

importScripts(
  'https://rawgit.com/Marak/faker.js/master/examples/browser/js/faker.js'
)

faker.locale = 'pt_BR'

console.time('Generate data')
const data = []
for (let index = 0; index < 1000000; index++) {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()

  const fakePerson = {
    name: `${firstName} ${lastName}`,
    email: faker.internet.email(firstName, lastName).toLowerCase(),
    country: faker.address.country()
  }

  data.push(fakePerson)
}
console.timeEnd('Generate data')

self.onmessage = event => {
  const peopleByCountry = data.filter(person => person.country === event.data)
  self.postMessage(peopleByCountry)
}
