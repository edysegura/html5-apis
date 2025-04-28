// using https://webhook.site/ to test the sendBeacon API
// navigator.sendBeacon is used to send data to a server asynchronously
// without blocking the page unload process
// This is useful for sending analytics data when the user navigates away from the page

window.addEventListener('visibilitychange', () => {
  const analyticsData = {
    eventType: 'page_visibility_change',
    timestamp: new Date().toISOString(),
    tab: document.visibilityState,
    url: window.location.href,
  }
  navigator.sendBeacon(
    'https://webhook.site/1785a997-2a2e-444b-bda7-452bd414f21a',
    JSON.stringify(analyticsData),
  )
})

window.addEventListener('beforeunload', () => {
  const analyticsData = {
    eventType: 'page_before_unload',
    timestamp: new Date().toISOString(),
    url: window.location.href,
  }
  navigator.sendBeacon(
    'https://webhook.site/1785a997-2a2e-444b-bda7-452bd414f21a',
    JSON.stringify(analyticsData),
  )
})
