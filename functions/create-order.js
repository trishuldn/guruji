const { PRODUCTS } = require("./_utils/products.js");


exports.handler = async (event) => {
if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
try {
const { product_id, quantity = 1, currency = "INR" } = JSON.parse(event.body || "{}");
const item = PRODUCTS[product_id];
if (!item) return { statusCode: 400, body: JSON.stringify({ error: "Invalid product" }) };


const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;
if (!keyId || !keySecret) return { statusCode: 500, body: JSON.stringify({ error: "Missing Razorpay keys" }) };


const amount = item.amount * quantity; // in paise
const receipt = `mog_${product_id}_${Date.now()}`;


const res = await fetch("https://api.razorpay.com/v1/orders", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64")
},
body: JSON.stringify({ amount, currency, receipt, payment_capture: 1 })
});


const data = await res.json();
if (!res.ok) return { statusCode: res.status, body: JSON.stringify(data) };


return {
statusCode: 200,
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ order_id: data.id, amount: data.amount, currency: data.currency, product: item })
};
} catch (e) {
return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
}
};
