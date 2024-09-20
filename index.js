const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const taxRate = 5;
const discountPercentage = 10;
const loyaltyRate = 2;

//1
app.get('/cart-total', (req, res) => {
  let newItemPrice = req.query.newItemPrice;
  let cartTotal = req.query.cartTotal;
  let total = Number(newItemPrice) + Number(cartTotal);
  res.send('' + total);
});

//2
app.get('/membership-discount', (req, res) => {
  let cartTotal = req.query.cartTotal;
  let isMember = req.query.isMember;
  let total = Number(cartTotal);

  if (isMember === 'true') {
    total = total - total * 0.1;
  }
  res.send('' + total);
});

//3

app.get('/calculate-tax', (req, res) => {
  let cartTotal = Number(req.query.cartTotal);
  let tax = taxRate * cartTotal * 0.01;
  res.send('' + tax);
});

//4

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = Number(req.query.distance);
  let deliveryTime = 0;
  if (shippingMethod === 'express') {
    deliveryTime = Math.ceil(distance / 100);
  } else if (shippingMethod === 'standard') {
    deliveryTime = Math.ceil(distance / 50);
  }

  res.send('' + deliveryTime);
});

// 5
app.get('/shipping-cost', (req, res) => {
  let weight = Number(req.query.weight);
  let distance = Number(req.query.distance);
  let shoppingCost = weight * distance * 0.1;
  res.send('' + shoppingCost);
});

// 6
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = Number(req.query.purchaseAmount);
  let loyaltyPoints = loyaltyRate * purchaseAmount;
  res.send('' + loyaltyPoints);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
