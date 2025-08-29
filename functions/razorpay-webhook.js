const crypto = require("crypto");
const { PRODUCTS } = require("./_utils/products.js");


exports.handler = async (event) => {
if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };


const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
if (!webhookSecret) return { statusCode: 500, body: "Missing webhook secret" };


const payload = event.body || "";
const signature = event.headers["x-razorpay-signature"] || event.headers["X-Razorpay-Signature"];
const digest = crypto.createHmac("sha256", webhookSecret).update(payload).digest("hex");
if (digest !== signature) return { statusCode: 401, body: "Invalid signature" };


// Parse event and act (idempotent)
const evt = JSON.parse(payload);
// Minimal sample: you would store orders/fulfill here.
// evt.payload.payment.entity or evt.payload.order.entity depending on webhook type


// TODO: write to DB (Supabase/Netlify DB), generate license, send email


return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
