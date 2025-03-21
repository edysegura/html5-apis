const date = new Date('2018-03-11T21:10:00')
const [enUsSpan, ptBrSpan] = document.querySelectorAll('span')

function formatDate(date, locale) {
  return new Intl.DateTimeFormat(locale).format(date)
}

enUsSpan.textContent = formatDate(date, 'en-US')
ptBrSpan.textContent = formatDate(date, 'pt-BR')
