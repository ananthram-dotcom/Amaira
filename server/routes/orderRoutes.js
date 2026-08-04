const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/orders
router.post('/', protect, async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;

    const order = new Order({
      userId: req.user ? req.user._id : null,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod: paymentMethod || 'demo_card',
      status: 'Processing'
    });

    const createdOrder = await order.save();
    res.status(201).json({
      message: 'Order created successfully (Portfolio Demo)',
      order: {
        id: createdOrder._id,
        items: createdOrder.items,
        totalAmount: createdOrder.totalAmount,
        shippingAddress: createdOrder.shippingAddress,
        paymentMethod: createdOrder.paymentMethod,
        status: createdOrder.status,
        createdAt: createdOrder.createdAt
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/orders/my-orders
router.get('/my-orders', protect, async (req, res) => {
  try {
    if (!req.user) {
      return res.json([]);
    }
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
