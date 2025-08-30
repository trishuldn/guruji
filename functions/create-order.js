const Razorpay = require("razorpay");

const products = {
  students: { name: "AI Prompt Pack for Students", amount: 49900, file: "/static/products/AI_Prompt_Pack_Students.pdf" },
  freelancers: { name: "AI Prompt Pack for Freelancers", amount: 79900, file: "/static/products/AI_Prompt_Pack_Freelancers.pdf" },
  smb: { name: "AI Prompt Pack for Small Business", amount: 99900, file: "/static/products/AI_Prompt_Pack_SMB.pdf" },
  career: { name: "AI Prompt Pack for Career", amount: 69900, file: "/static/products/AI_Prompt_Pack_Career.pdf" },
  mega: { name: "Mega Pack Bundle 2025", amount: 149900, file: "/static/products/Mega_Pack_2025.zip" }
};

exports.handler = async (event) => {
  try {
    const { product } = JSON.parse(event.body);
    if (!products[product]) {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid product" }) };
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const order = await razorpay.orders.create({
      amount: products[product].amount,
      currency: "INR",
      receipt: `order_${Date.now()}`,
      notes: { product }
    });

    return { statusCode: 200, body: JSON.stringify(order) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
