export function formatArg(a) {
  if (a === null) return 'null'
  if (a === undefined) return 'undefined'
  if (typeof a === 'object') {
    try {
      return JSON.stringify(a)
    } catch (e) {
      return String(a)
    }
  }
  return String(a)
}

export function appendLog(...args) {
  const ta = document.getElementById('console')
  if (!ta) return
  const timestamp = new Date().toLocaleString()
  const msg = args.map(formatArg).join(' ')
  ta.value += `${timestamp} - ${msg}\n`
  ta.scrollTop = ta.scrollHeight
}

export function logAndMirror(...args) {
  try {
    console.log(...args)
  } catch (e) {
    /* ignore */
  }
  try {
    appendLog(...args)
  } catch (e) {
    console.log('log mirror error', e)
  }
}

export function initConsoleUI() {
  document.addEventListener('DOMContentLoaded', () => {
    const clearBtn = document.getElementById('clearBtn')
    const ta = document.getElementById('console')
    if (clearBtn && ta)
      clearBtn.addEventListener('click', () => {
        ta.value = ''
      })
  })
}
