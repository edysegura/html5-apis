import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 8000);

const types = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".mp4", "video/mp4"],
]);

createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
  const filepath = normalize(join(root, decodeURIComponent(pathname)));

  if (!resolve(filepath).startsWith(resolve(root))) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const { size } = statSync(filepath);
    response.writeHead(200, {
      "Content-Type": types.get(extname(filepath)) || "application/octet-stream",
      "Content-Length": size,
    });
    createReadStream(filepath).pipe(response);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}).listen(port, () => {
  console.log(`Serving ${root} at http://localhost:${port}/`);
});
