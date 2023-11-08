const shareFileButton = document.querySelector('#shareFileBtn')
const shareTextButton = document.querySelector('#shareTextBtn')
shareFileButton.addEventListener('click', () => {
  // shareImage('https://content.planetplay.com/carbon-units/Ant_social.png')
  shareImage('study.png')
})
shareTextButton.addEventListener('click', shareText)

async function shareImage(imageUrl) {
  console.log(`clicked shareImageAsset: ${imageUrl}`)
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
  if (navigator.canShare && navigator.canShare(shareData)) {
    await navigator.share(shareData)
  }
  // TODO implements a fallback to download the file
}

async function shareText() {
  console.log('clicked shareTextData')
  const shareData = {
    title: 'Edy Segura',
    text: 'Fullstack Software Engineer',
    url: document.location.origin,
  }
  if (navigator.share) {
    navigator.share(shareData).catch(console.error)
  } else {
    await navigator.clipboard.writeText(shareData.url)
    shareTextButton.textContent = 'Copied to clipboard'
    setTimeout(() => {
      shareTextButton.textContent = 'Share Text'
    }, 3000)
  }
}
