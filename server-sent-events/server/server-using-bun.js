const PORT = 3000
const HOST = 'localhost'

Bun.serve({
  port: PORT,
  host: HOST,
  routes: {
    '/events': (request, server) => {
      // SSE streams are often quiet between events. By default,
      // Bun.serve closes connections after 10 seconds of inactivity.
      // Disable the idle timeout for this request so the stream
      // stays open indefinitely.
      server.timeout(request, 0)

      return new Response(
        async function* () {
          yield `data: connected at ${Date.now()}\n\n`

          // Emit a tick every 5 seconds until the client disconnects.
          // When the client goes away, the generator is returned
          // (cancelled) and this loop stops automatically.
          while (true) {
            await Bun.sleep(5000)
            yield `data: tick ${Date.now()}\n\n`
          }
        },
        {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
            'Access-Control-Allow-Origin': '*',
          },
        },
      )
    },
  },
})

console.log(`Server running at http://${HOST}:${PORT}/events`)
