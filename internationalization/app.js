const date = new Date('2018-03-11T21:10:00')

function formatDate(date, locale) {
  return new Intl.DateTimeFormat(locale).format(date)
}

document.getElementById('en-us-date').textContent = formatDate(date, 'en-US')
document.getElementById('pt-br-date').textContent = formatDate(date, 'pt-BR')
