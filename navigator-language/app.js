'use strict'

const languageCountryMap = {
  en: 'gb',
  'en-US': 'us',
  'en-GB': 'gb',
  es: 'es',
  fr: 'fr',
  de: 'de',
  it: 'it',
  pt: 'pt',
  'pt-BR': 'br',
  zh: 'cn',
  ja: 'jp',
  ko: 'kr',
  ru: 'ru',
  ar: 'sa',
  tr: 'tr',
  nl: 'nl',
  pl: 'pl',
  sv: 'se',
  fi: 'fi',
  da: 'dk',
  no: 'no',
  cs: 'cz',
  el: 'gr',
  he: 'il',
  hi: 'in',
  id: 'id',
  th: 'th',
  uk: 'ua',
  vi: 'vn',
}

const languageNameMap = {
  en: 'English',
  'en-US': 'English (US)',
  'en-GB': 'English (UK)',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  'pt-BR': 'Português (Brasil)',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  ru: 'Русский',
  ar: 'العربية',
  tr: 'Türkçe',
  nl: 'Nederlands',
  pl: 'Polski',
  sv: 'Svenska',
  fi: 'Suomi',
  da: 'Dansk',
  no: 'Norsk',
  cs: 'Čeština',
  el: 'Ελληνικά',
  he: 'עברית',
  hi: 'हिन्दी',
  id: 'Bahasa Indonesia',
  th: 'ไทย',
  uk: 'Українська',
  vi: 'Tiếng Việt',
}

function getFlagIcon(lang) {
  let code = languageCountryMap[lang]
  if (!code) {
    const base = lang.split('-')[0]
    code = languageCountryMap[base]
  }
  return code
    ? `<span class="fi fi-${code}" style="margin-right:0.5em;"></span>`
    : '<span style="margin-right:0.5em;">🌐</span>'
}

function getLanguageName(lang) {
  return languageNameMap[lang] || languageNameMap[lang.split('-')[0]] || lang
}

function addToList(language) {
  const ol = document.getElementById('languages-list')
  const li = document.createElement('li')
  li.innerHTML = `
    ${getFlagIcon(language)}
    <strong>${getLanguageName(language)}</strong>
    <small style="color:var(--muted-color);">(${language})</small>
  `
  ol.appendChild(li)
}

navigator.languages.forEach(addToList)
