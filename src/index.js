const express = require('express');
const ledger = require('./ledger');
const script = require('./script');

const app = express();
app.use(express.json());

app.post('/api/coupons', async (req, res) => {
  const coupon = `coupons:${req.body["code"]}`;

  const r = await ledger.execute(script('create-coupon'), {
    coupon,
    budget: req.body["budget"],
  });

  const mr = await ledger.setAccountMeta(coupon, {
    value: {
      type: "monetary",
      value: req.body["value"],
    },
  });

  res.json(r);
});

app.post('/api/redeem', async (req, res) => {
  const coupon = `coupons:${req.body["code"]}`;
  const wallet = `users:${req.body["user_id"]}:wallet`;

  const r = await ledger.execute(script('redeem-coupon'), {
    coupon,
    wallet,
  });

  res.json(r);
});

app.post('/api/payment', async (req, res) => {
  const wallet = `users:${req.body["user_id"]}:wallet`;
  const payment = `payments:${req.body["payment_id"]}`;
  const order = `orders:${req.body["order_id"]}`;
  const total = req.body["total"];

  const r = await ledger.execute(script('payment'), {
    wallet,
    payment,
    order,
    total,
  });

  res.json(r);
});

app.post('/api/split', async (req, res) => {
  const order = `orders:${req.body["order_id"]}`;
  const restaurant = `restaurants:${req.body["restaurant_id"]}`;
  const rider = `riders:${req.body["rider_id"]}`;
  const delivery_price = req.body["delivery_price"];

  const r = await ledger.execute(script('split'), {
    order,
    restaurant,
    rider,
    delivery_price,
  });

  res.json(r);
});

app.post('/api/payout', async (req, res) => {
  const account = req.body['account'];

  const r = await ledger.execute(script('payout'), {
    account,
  });

  res.json(r);
});

app.listen(3001);