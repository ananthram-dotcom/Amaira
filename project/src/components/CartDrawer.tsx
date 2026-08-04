import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartWishlist } from '../context/CartWishlistContext';

const FREE_SHIPPING_THRESHOLD = 1999;

const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCartWishlist();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (promoCode.trim().toUpperCase() === 'AMAIRA10') {
      setDiscountPercent(10);
      setPromoSuccess('10% discount applied!');
    } else if (promoCode.trim().toUpperCase() === 'FESTIVE20') {
      setDiscountPercent(20);
      setPromoSuccess('20% festive discount applied!');
    } else {
      setPromoError('Invalid code. Try "AMAIRA10" or "FESTIVE20"');
    }
  };

  const discountAmount = Math.round((cartTotal * discountPercent) / 100);
  const finalTotal = cartTotal - discountAmount;
  const progressToFreeShipping = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black z-50"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-amber-50 to-red-50 border-b border-yellow-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="h-6 w-6 text-red-800" />
                <h2 className="text-xl font-bold text-red-900">Your Cart</h2>
                <span className="bg-red-800 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)} items
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-gray-500 hover:text-red-800 rounded-full hover:bg-yellow-100 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Free Shipping Meter */}
            <div className="bg-yellow-50 px-6 py-3 border-b border-yellow-200 text-sm">
              {cartTotal >= FREE_SHIPPING_THRESHOLD ? (
                <p className="text-emerald-700 font-medium">🎉 Congratulations! You unlocked FREE shipping!</p>
              ) : (
                <p className="text-gray-700">
                  Add <span className="font-bold text-red-800">₹{FREE_SHIPPING_THRESHOLD - cartTotal}</span> more to get <span className="font-semibold">FREE Shipping</span>!
                </p>
              )}
              <div className="w-full bg-yellow-200 h-2 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-yellow-500 to-red-600 h-full transition-all duration-300"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-12">
                  <ShoppingBag className="h-16 w-16 text-yellow-300 mb-4 stroke-1" />
                  <p className="text-lg font-medium text-gray-700">Your cart is currently empty</p>
                  <p className="text-sm text-gray-500 mt-1 mb-6">Explore our curated collection of authentic Indian beauty items.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2.5 bg-red-800 text-white text-sm font-medium rounded-full hover:bg-red-700 transition-colors shadow-md"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex items-center space-x-4 p-3 bg-gradient-to-r from-yellow-50/50 to-white rounded-xl border border-yellow-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg border border-yellow-200"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h4>
                      <p className="text-xs text-yellow-700 font-medium">{product.category}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm font-bold text-red-800">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="p-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors text-gray-600"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-bold text-gray-800 w-5 text-center">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="p-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors text-gray-600"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-4">
                {/* Promo Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. AMAIRA10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-yellow-600 text-white text-xs font-semibold rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {promoError && <p className="text-xs text-red-600">{promoError}</p>}
                {promoSuccess && <p className="text-xs text-emerald-600 font-medium">{promoSuccess}</p>}

                {/* Subtotals */}
                <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">₹{cartTotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Discount ({discountPercent}%)</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span>{cartTotal >= FREE_SHIPPING_THRESHOLD ? 'FREE' : '₹99'}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-red-900 pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>₹{finalTotal + (cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99)}</span>
                  </div>
                </div>

                {/* Proceed Button */}
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3 bg-gradient-to-r from-red-800 to-amber-700 text-white font-semibold text-sm rounded-xl shadow-lg hover:from-red-700 hover:to-amber-600 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Mock Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
