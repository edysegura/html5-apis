const shareFileButton = document.querySelector('#shareFileBtn')
const shareTextButton = document.querySelector('#shareTextBtn')
const statusEl = document.querySelector('#status') || {
  textContent: '',
  setAttribute: () => {},
}
shareFileButton.addEventListener('click', () => {
  shareImage('study.png')
})
shareTextButton.addEventListener('click', shareText)

async function shareImage(imageUrl) {
  console.log(`clicked shareImageAsset: ${imageUrl}`)
  statusEl.textContent = 'Preparing file to share...'
  const fetchedImage = await fetch(imageUrl)
  const blobImage = await fetchedImage.blob()
  const fileName = imageUrl.split('/').pop()
  const filesArray = [
    new File([blobImage], fileName, {
      type: 'image/png',
      lastModified: Date.now(),
    }),
  ]
  const shareData = {
    title: fileName,
    files: filesArray,
    url: document.location.origin,
  }
  try {
    if (navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData)
      statusEl.textContent = 'Content shared successfully.'
      return
    }
    statusEl.textContent = 'Sharing not supported for files on this device.'
  } catch (err) {
    console.error(err)
    statusEl.textContent = 'Share failed or was cancelled.'
  }
}

async function shareText() {
  console.log('clicked shareTextData')
  const shareData = {
    title: 'Edy Segura',
    text: 'Fullstack Software Engineer',
    url: document.location.origin,
  }
  try {
    if (navigator.share) {
      statusEl.textContent = 'Opening share dialog...'
      await navigator.share(shareData)
      statusEl.textContent = 'Content shared successfully.'
      return
    }
    await navigator.clipboard.writeText(shareData.url)
    statusEl.textContent = 'URL copied to clipboard.'
    shareTextButton.textContent = 'Copied'
    setTimeout(() => {
      shareTextButton.textContent = 'Share Text'
      statusEl.textContent = ''
    }, 3000)
  } catch (err) {
    console.error(err)
    statusEl.textContent = 'Share failed or was cancelled.'
  }
}
