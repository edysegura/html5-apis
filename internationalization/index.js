const date = new Date('2018-03-11T21:10:00')

function formatDate(date, locale) {
  return new Intl.DateTimeFormat(locale).format(date)
}

console.log(formatDate(date, 'en-US'))
console.log(formatDate(date, 'en-GB'))
console.log(formatDate(date, 'pt-BR'))