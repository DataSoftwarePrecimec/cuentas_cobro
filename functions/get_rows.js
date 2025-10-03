import { URL } from "./constants.js";

export async function onRequest(context) {
  const response = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cmd: "get_rows",
      session_code: globalThis.session_code
    })
  });
  return new Response(await response.text(), {
    status: response.status,
    headers: { "Content-Type": "application/json" }
  });
}
