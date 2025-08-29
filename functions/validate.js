exports.handler = async (event) => {
// With Netlify Identity enabled, you can inspect headers["authorization"] for Bearer JWT
// and optionally verify it via Netlify Identity endpoint. For MVP, just return ok if present.
const auth = event.headers["authorization"] || "";
const ok = auth.startsWith("Bearer ");
return { statusCode: ok ? 200 : 401, body: JSON.stringify({ ok }) };
};
