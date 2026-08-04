const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String }
      }
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
      fullName: String,
      email: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      zipCode: String
    },
    paymentMethod: { type: String, default: 'demo_card' },
    status: { type: String, enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Processing' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
