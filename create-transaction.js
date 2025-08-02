import midtransClient from "midtrans-client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const serverKey = process.env.MIDTRANS_SERVER_KEY;

  let snap = new midtransClient.Snap({
    isProduction: true,
    serverKey: serverKey,
  });

  let parameter = {
    transaction_details: {
      order_id: "order-id-" + Math.round(Math.random() * 100000),
      gross_amount: 10000,
    },
    credit_card: {
      secure: true,
    },
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    res.status(200).json({ token: transaction.token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
