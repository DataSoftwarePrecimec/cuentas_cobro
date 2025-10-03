import { URL } from "./constants.js";

export async function onRequest(context) {
  try {
    let body                = await context.request.json();
    globalThis.session_code = crypto.randomUUID();
    body.session_code       = globalThis.session_code;
    body.cmd                = "send_code";
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const text = await response.text();
    return new Response(text, {
      status: response.status,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Fallo en el envio del código", detalles: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
