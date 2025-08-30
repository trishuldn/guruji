const crypto = require("crypto");

const products = {
  students: "/static/products/AI_Prompt_Pack_Students.pdf",
  freelancers: "/static/products/AI_Prompt_Pack_Freelancers.pdf",
  smb: "/static/products/AI_Prompt_Pack_SMB.pdf",
  career: "/static/products/AI_Prompt_Pack_Career.pdf",
  mega: "/static/products/Mega_Pack_2025.zip"
};

exports.handler = async (event) => {
  const { product, token } = event.queryStringParameters;

  if (!product || !products[product]) {
    return { statusCode: 400, body: "Invalid request" };
  }

  // TODO: Verify token properly (HMAC expiry check)
  if (token !== "demo123") {
    return { statusCode: 403, body: "Unauthorized" };
  }

  return {
    statusCode: 302,
    headers: {
      Location: products[product]
    }
  };
};
