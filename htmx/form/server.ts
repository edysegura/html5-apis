const port = Number(Bun.env.PORT ?? 3000);

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const notFound = new Response("Not found", { status: 404 });

async function serveFile(path: string, contentType: string) {
  const file = Bun.file(path);

  if (!(await file.exists())) {
    return notFound;
  }

  return new Response(file, {
    headers: {
      "content-type": contentType,
    },
  });
}

async function fetchAddress(request: Request) {
  const formData = await request.formData();
  const zipCode = String(formData.get("zipCode") ?? "").replace(/\D/g, "");

  if (!/^\d{8}$/.test(zipCode)) {
    return new Response(
      `<tr class="error"><td colspan="5">Enter a valid Brazilian CEP with 8 digits.</td></tr>`,
      {
        status: 400,
        headers: { "content-type": "text/html; charset=utf-8" },
      },
    );
  }

  const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);

  if (!response.ok) {
    return new Response(
      `<tr class="error"><td colspan="5">Could not fetch address for ${escapeHtml(zipCode)}.</td></tr>`,
      {
        status: 502,
        headers: { "content-type": "text/html; charset=utf-8" },
      },
    );
  }

  const address = await response.json();

  if (address.erro) {
    return new Response(
      `<tr class="error"><td colspan="5">No address found for ${escapeHtml(zipCode)}.</td></tr>`,
      {
        status: 404,
        headers: { "content-type": "text/html; charset=utf-8" },
      },
    );
  }

  return new Response(
    `<tr>
      <td>${escapeHtml(address.cep ?? "")}</td>
      <td>${escapeHtml(address.logradouro ?? "")}</td>
      <td>${escapeHtml(address.bairro ?? "")}</td>
      <td>${escapeHtml(address.localidade ?? "")}</td>
      <td>${escapeHtml(address.uf ?? "")}</td>
    </tr>`,
    {
      headers: { "content-type": "text/html; charset=utf-8" },
    },
  );
}

Bun.serve({
  port,
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/" && request.method === "GET") {
      return serveFile("index.html", "text/html; charset=utf-8");
    }

    if (url.pathname === "/style.css" && request.method === "GET") {
      return serveFile("style.css", "text/css; charset=utf-8");
    }

    if (url.pathname === "/address" && request.method === "POST") {
      return fetchAddress(request);
    }

    return notFound;
  },
});

console.log(`Listening on http://localhost:${port}`);
