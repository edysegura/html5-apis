const videoUrl = 'sintel.mp4'

const videoWrapper = document.getElementById('video-wrapper')
const downloadBtn = document.getElementById('download-btn')
const abortBtn = document.getElementById('abort-btn')
const reports = document.getElementById('reports')

let controller
let progressAnimation
let animationFrame = 0

downloadBtn.addEventListener('click', fetchVideo)
abortBtn.addEventListener('click', abortDownload)

async function fetchVideo() {
  controller = new AbortController()
  const signal = controller.signal

  setDownloadState()

  try {
    const response = await fetch(videoUrl, { signal })

    if (!response.ok) {
      throw new Error(`Failed to fetch video: ${response.status}`)
    }

    runAnimation()
    setTimeout(() => console.log('Body used: ', response.bodyUsed), 1)

    const videoBlob = await response.blob()
    renderVideo(videoBlob)
    reports.textContent = 'Video ready to play'
  } catch (error) {
    reports.textContent =
      error.name === 'AbortError'
        ? 'Download canceled'
        : `Download error: ${error.message}`
    downloadBtn.classList.remove('hidden')
  } finally {
    abortBtn.classList.add('hidden')
    stopAnimation()
  }
}

function abortDownload() {
  controller?.abort()
  console.log('Download aborted')
}

function setDownloadState() {
  downloadBtn.classList.add('hidden')
  abortBtn.classList.remove('hidden')
  videoWrapper.classList.add('hidden')
  removeExistingVideo()
  reports.textContent = 'Video awaiting download...'
}

function renderVideo(videoBlob) {
  const video = document.createElement('video')

  video.controls = true
  video.src = URL.createObjectURL(videoBlob)
  videoWrapper.appendChild(video)
  videoWrapper.classList.remove('hidden')
  downloadBtn.classList.add('hidden')
}

function removeExistingVideo() {
  const existingVideo = videoWrapper.querySelector('video')

  if (!existingVideo) {
    return
  }

  URL.revokeObjectURL(existingVideo.src)
  existingVideo.remove()
}

function runAnimation() {
  progressAnimation = setInterval(() => {
    const progressDots = '.'.repeat(animationFrame++ % 4)
    reports.textContent = `Download occurring; waiting for video player to be constructed${progressDots}`
  }, 300)
}

function stopAnimation() {
  clearInterval(progressAnimation)
  animationFrame = 0
}
