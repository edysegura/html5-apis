const PORT = 3001
const HOST = 'localhost'

Deno.serve({
  hostname: HOST,
  port: PORT,
  handler(req) {
    const url = new URL(req.url)

    if (url.pathname !== '/events') {
      return new Response('Not Found', { status: 404 })
    }

    const encoder = new TextEncoder()
    let intervalId

    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(`data: connected at ${Date.now()}\n\n`),
        )

        intervalId = setInterval(() => {
          controller.enqueue(encoder.encode(`data: tick ${Date.now()}\n\n`))
        }, 5000)
      },
      cancel() {
        if (intervalId) {
          clearInterval(intervalId)
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      },
    })
  },
})

console.log(
  `Server running at http://${HOST}:${PORT}/events\n🛑 CTRL+C to stop`,
)

// deno run --allow-net server.js
