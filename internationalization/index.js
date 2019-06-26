const date = new Date('2018-03-11T21:10:00')
const [ enUsSpan, enGbSpan ] = document.querySelectorAll('span')

function formatDate(date, locale) {
  return new Intl.DateTimeFormat(locale).format(date)
}

enUsSpan.textContent = formatDate(date, 'en-US')
enGbSpan.textContent = formatDate(date, 'en-GB')