const date = new Date('2018-03-11T21:10:00')

function formatDate(date, locale) {
  return new Intl.DateTimeFormat(locale).format(date)
}

const locales = [
  { id: 'en-us-date', locale: 'en-US' },
  { id: 'pt-br-date', locale: 'pt-BR' },
  { id: 'ja-jp-date', locale: 'ja-JP' },
]

locales.forEach(({ id, locale }) => {
  document.getElementById(id).textContent = formatDate(date, locale)
})
