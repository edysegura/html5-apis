const shareFileButton = document.querySelector('#shareFileBtn')
const shareTextButton = document.querySelector('#shareTextBtn')
shareFileButton.addEventListener('click', shareImage)
shareTextButton.addEventListener('click', shareText)

async function shareImage() {
  console.log('clicked shareImageAsset')
  const response = await fetch('study.png')
  const blobImageAsset = await response.blob()
  const filesArray = [
    new File([blobImageAsset], `study.png`, {
      type: 'image/png',
      lastModified: Date.now(),
    }),
  ]
  const shareData = {
    title: `study.png`,
    files: filesArray,
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
    url: 'https://edysegura.com',
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
