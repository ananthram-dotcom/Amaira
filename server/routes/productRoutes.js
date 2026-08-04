const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

const SAMPLE_PRODUCTS = [
  {
    name: "Traditional Kundan Necklace Set",
    price: 2999,
    originalPrice: 5999,
    image: "https://images.pexels.com/photos/32077584/pexels-photo-32077584.jpeg",
    category: "Ornaments",
    rating: 4.5,
    reviews: 128,
    discount: 50,
    description: "Crafted by master artisans, this royal Kundan necklace set features exquisite hand-set stones and premium gold plating."
  },
  {
    name: "Ayurvedic Face Cream",
    price: 899,
    originalPrice: 1299,
    image: "https://images.pexels.com/photos/7148534/pexels-photo-7148534.jpeg",
    category: "Skincare",
    rating: 4.8,
    reviews: 256,
    discount: 30,
    description: "Formulated with pure Kumkumadi Tailam, saffron, and sandalwood oil, this night cream repairs dull skin."
  },
  {
    name: "Designer Silk Saree",
    price: 3499,
    originalPrice: 6999,
    image: "https://desigiftsusa.com/cdn/shop/products/247561399_212053007729168_7044059845176090578_n_2048x.jpg?v=1702842362",
    category: "Garments",
    rating: 4.7,
    reviews: 89,
    discount: 50,
    description: "Woven with pure Kanjivaram silk threads and intricate zari embroidery."
  },
  {
    name: "Rose Gold Perfume",
    price: 1599,
    originalPrice: 2299,
    image: "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Perfume",
    rating: 4.6,
    reviews: 175,
    discount: 30,
    description: "An intoxicating blend of wild Damask rose, warm amber, and golden jasmine blossoms."
  },
  {
    name: "Organic Hair Oil",
    price: 699,
    originalPrice: 999,
    image: "https://images.pexels.com/photos/4408447/pexels-photo-4408447.jpeg",
    category: "Haircare",
    rating: 4.4,
    reviews: 312,
    discount: 30,
    description: "Cold-pressed coconut and sesame oil infused with 18 traditional herbs including Bhringraj."
  },
  {
    name: "Bridal Makeup Kit",
    price: 2499,
    originalPrice: 4999,
    image: "https://images.pexels.com/photos/4620873/pexels-photo-4620873.jpeg",
    category: "Makeup",
    rating: 4.9,
    reviews: 94,
    discount: 50,
    description: "All-in-one luxury bridal palette including high-pigment eyeshadows and setting spray."
  }
];

// @route   GET /api/products
router.get('/', async (req, res) => {
  try {
    let products = await Product.find({});
    if (products.length === 0) {
      // Return sample products if DB is empty
      return res.json(SAMPLE_PRODUCTS.map((p, i) => ({ ...p, id: i + 1 })));
    }
    res.json(products);
  } catch (err) {
    res.json(SAMPLE_PRODUCTS.map((p, i) => ({ ...p, id: i + 1 })));
  }
});

// @route   GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) return res.json(product);

    const foundFallback = SAMPLE_PRODUCTS.find((_, i) => String(i + 1) === String(req.params.id));
    if (foundFallback) return res.json({ ...foundFallback, id: req.params.id });

    res.status(404).json({ message: 'Product not found' });
  } catch (err) {
    const foundFallback = SAMPLE_PRODUCTS.find((_, i) => String(i + 1) === String(req.params.id));
    if (foundFallback) return res.json({ ...foundFallback, id: req.params.id });
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;
