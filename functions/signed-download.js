const crypto = require("crypto");

const products = {
  students: "/static/products/AI_Prompt_Pack_Students.pdf",
  freelancers: "/static/products/AI_Prompt_Pack_Freelancers.pdf",
  smb: "/static/products/AI_Prompt_Pack_SMB.pdf",
  career: "/static/products/AI_Prompt_Pack_Career.pdf",
  mega: "/static/products/Mega_Pack_2025.zip"
};

function verifyToken(token, secret) {
  try {
    const [payload, signature] = token.split(".");
    const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
    if (expected !== signature) return null;

    const data = JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
    if (Date.now() > data.exp) return null;

    return data;
  } catch {
    return null;
  }
}

exports.handler = async (event) => {
  const { product, token } = event.queryStringParameters;
  const secret = process.env.SIGNED_DOWNLOAD_SECRET;

  if (!product || !products[product] || !token) {
    return { statusCode: 400, body: "Invalid request" };
  }

  const data = verifyToken(token, secret);
  if (!data || data.product !== product) {
    return { statusCode: 403, body: "Unauthorized or expired link" };
  }

  return {
    statusCode: 302,
    headers: {
      Location: products[product]
    }
  };
};
