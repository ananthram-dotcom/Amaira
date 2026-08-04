const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    image: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    reviews: { type: Number, default: 10 },
    discount: { type: Number },
    description: { type: String },
    inStock: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
