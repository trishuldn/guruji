const crypto = require("crypto");

const products = {
  students: "/static/products/AI_Prompt_Pack_Students.pdf",
  freelancers: "/static/products/AI_Prompt_Pack_Freelancers.pdf",
  smb: "/static/products/AI_Prompt_Pack_SMB.pdf",
  career: "/static/products/AI_Prompt_Pack_Career.pdf",
  mega: "/static/products/Mega_Pack_2025.zip"
};

exports.handler = async (event) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = event.headers["x-razorpay-signature"];
    const body = event.body;

    const expectedSignature = crypto.createHmac("sha256", secret).update(body).digest("hex");

    if (expectedSignature !== signature) {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid signature" }) };
    }

    const payload = JSON.parse(body);
    const product = payload.payload.payment.entity.notes.product;

    if (!products[product]) {
      return { statusCode: 400, body: JSON.stringify({ error: "Unknown product" }) };
    }

    // TODO: send email with signed link here
    const downloadUrl = `/api/signed-download?product=${product}&token=demo123`;

    return { statusCode: 200, body: JSON.stringify({ success: true, downloadUrl }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
