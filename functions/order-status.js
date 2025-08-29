exports.handler = async (event) => {
const order_id = (event.queryStringParameters || {}).order_id;
if (!order_id) return { statusCode: 400, body: "order_id required" };
// TODO: lookup in DB; for now return pending
return { statusCode: 200, body: JSON.stringify({ status: "pending", order_id }) };
};
