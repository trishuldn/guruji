const crypto = require("crypto");


function sign(url, secret, ttlSec = 600) {
const exp = Math.floor(Date.now()/1000) + ttlSec;
const data = `${url}.${exp}`;
const sig = crypto.createHmac("sha256", secret).update(data).digest("hex");
return `${url}?exp=${exp}&sig=${sig}`;
}


exports.handler = async (event) => {
const secret = process.env.SIGNED_DOWNLOAD_SECRET || "dev_secret";
const { product_id, order_id } = event.queryStringParameters || {};
if (!product_id || !order_id) return { statusCode: 400, body: "product_id and order_id required" };
// TODO: verify order paid in DB
const fileUrl = `https://example-cdn.com/downloads/${product_id}.zip`; // replace later
const signed = sign(fileUrl, secret, 600);
return { statusCode: 200, body: JSON.stringify({ url: signed, expires_in: 600 }) };
};
