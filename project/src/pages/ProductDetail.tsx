import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw, ArrowLeft, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { useCartWishlist } from '../context/CartWishlistContext';

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Traditional Kundan Necklace Set",
    price: 2999,
    originalPrice: 5999,
    image: "https://images.pexels.com/photos/32077584/pexels-photo-32077584.jpeg",
    category: "Ornaments",
    rating: 4.5,
    reviews: 128,
    discount: 50,
    description: "Crafted by master artisans, this royal Kundan necklace set features exquisite hand-set stones and premium gold plating. Perfect for weddings, festive celebrations, and heirloom collections.",
    inStock: true
  },
  {
    id: 2,
    name: "Ayurvedic Face Cream",
    price: 899,
    originalPrice: 1299,
    image: "https://images.pexels.com/photos/7148534/pexels-photo-7148534.jpeg",
    category: "Skincare",
    rating: 4.8,
    reviews: 256,
    discount: 30,
    description: "Formulated with pure Kumkumadi Tailam, saffron, and sandalwood oil, this nourishing night cream repairs dull skin and imparts a radiant natural glow.",
    inStock: true
  },
  {
    id: 3,
    name: "Designer Silk Saree",
    price: 3499,
    originalPrice: 6999,
    image: "https://desigiftsusa.com/cdn/shop/products/247561399_212053007729168_7044059845176090578_n_2048x.jpg?v=1702842362",
    category: "Garments",
    rating: 4.7,
    reviews: 89,
    discount: 50,
    description: "Woven with pure Kanjivaram silk threads and intricate zari embroidery, this vibrant royal saree embodies timeless elegance and luxury.",
    inStock: true
  },
  {
    id: 4,
    name: "Rose Gold Perfume",
    price: 1599,
    originalPrice: 2299,
    image: "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Perfume",
    rating: 4.6,
    reviews: 175,
    discount: 30,
    description: "An intoxicating blend of wild Damask rose, warm amber, and golden jasmine blossoms. Long-lasting fragrance crafted for special evenings.",
    inStock: true
  },
  {
    id: 5,
    name: "Organic Hair Oil",
    price: 699,
    originalPrice: 999,
    image: "https://images.pexels.com/photos/4408447/pexels-photo-4408447.jpeg",
    category: "Haircare",
    rating: 4.4,
    reviews: 312,
    discount: 30,
    description: "Cold-pressed coconut and sesame oil infused with 18 traditional herbs including Bhringraj, Amla, and Hibiscus to strengthen hair roots.",
    inStock: true
  },
  {
    id: 6,
    name: "Bridal Makeup Kit",
    price: 2499,
    originalPrice: 4999,
    image: "https://images.pexels.com/photos/4620873/pexels-photo-4620873.jpeg",
    category: "Makeup",
    rating: 4.9,
    reviews: 94,
    discount: 50,
    description: "All-in-one luxury bridal palette including high-pigment eyeshadows, liquid lipstick trio, highlighter, and long-wear setting spray.",
    inStock: true
  }
];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCartWishlist();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  useEffect(() => {
    // Check static list first
    const found = SAMPLE_PRODUCTS.find((p) => String(p.id) === String(id));
    if (found) {
      setProduct(found);
    } else {
      // Try backend fetch if backend is active
      fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products/${id}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) setProduct(data);
        })
        .catch(() => {});
    }
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
        <p className="text-gray-600 mt-2 mb-6">The product you are looking for does not exist or has been removed.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-red-800 text-white rounded-full font-medium hover:bg-red-700 transition-colors"
        >
          Back to Store
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-sm text-red-800 hover:text-red-600 mb-6 font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Products</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-yellow-100">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[450px] object-cover rounded-2xl shadow-md border border-yellow-200"
          />
          {product.discount && (
            <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
              {product.discount}% OFF
            </span>
          )}
          <button
            onClick={() => toggleWishlist(product)}
            className={`absolute top-4 right-4 p-3 rounded-full shadow-md transition-colors ${
              inWishlist ? 'bg-red-800 text-white' : 'bg-white text-gray-600 hover:text-red-600'
            }`}
          >
            <Heart className={`h-6 w-6 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Details & Purchase Controls */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-yellow-700 tracking-wider uppercase">{product.category}</span>
            <h1 className="text-3xl font-bold text-red-900 mt-1 mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? 'fill-current text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-800">{product.rating}</span>
              <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline space-x-3 mb-6">
              <span className="text-3xl font-extrabold text-red-900">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                In Stock & Ready to Ship
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
              {product.description ||
                "Authentic handcrafted beauty & fashion item curated from traditional Indian artisans."}
            </p>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 font-bold text-gray-700"
                >
                  -
                </button>
                <span className="text-sm font-bold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 font-bold text-gray-700"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-white shadow-lg flex items-center justify-center space-x-2 transition-all ${
                  addedSuccess
                    ? 'bg-emerald-600'
                    : 'bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-700 hover:to-amber-600'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="h-5 w-5" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5" />
                    <span>Add {quantity} to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 border rounded-xl transition-colors ${
                  inWishlist
                    ? 'border-red-800 text-red-800 bg-red-50'
                    : 'border-gray-300 text-gray-600 hover:border-red-800 hover:text-red-800'
                }`}
              >
                <Heart className={`h-6 w-6 ${inWishlist ? 'fill-current text-red-800' : ''}`} />
              </button>
            </div>

            {/* Value Highlights */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 text-center">
              <div className="p-2">
                <Truck className="h-5 w-5 text-red-800 mx-auto mb-1" />
                <span className="text-xs text-gray-600 block">Fast Express Delivery</span>
              </div>
              <div className="p-2">
                <ShieldCheck className="h-5 w-5 text-red-800 mx-auto mb-1" />
                <span className="text-xs text-gray-600 block">100% Authentic Guaranteed</span>
              </div>
              <div className="p-2">
                <RefreshCw className="h-5 w-5 text-red-800 mx-auto mb-1" />
                <span className="text-xs text-gray-600 block">Easy 7-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
