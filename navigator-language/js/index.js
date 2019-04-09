'use strict'

function addLanguage(language) {
  const ol = document.querySelector('ol')
  const li = document.createElement('li')
  li.textContent = language
  ol.appendChild(li)
}

navigator.languages.forEach(addLanguage)
