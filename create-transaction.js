import midtransClient from 'midtrans-client';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { amount, productName } = req.body;

  if (!amount || !productName) {
    return res.status(400).json({ message: 'Invalid request data' });
  }

  const snap = new midtransClient.Snap({
    isProduction: true,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
  });

  try {
    const parameter = {
      transaction_details: {
        order_id: `order-${Date.now()}`,
        gross_amount: amount,
      },
      item_details: [
        {
          id: 'item1',
          price: amount,
          quantity: 1,
          name: productName,
        },
      ],
      credit_card: {
        secure: true,
      },
    };

    const transaction = await snap.createTransaction(parameter);
    return res.status(200).json({ token: transaction.token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
