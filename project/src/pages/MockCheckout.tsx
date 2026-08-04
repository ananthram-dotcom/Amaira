import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, ShieldCheck, Truck, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const MockCheckout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCartWishlist();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'demo_card' | 'demo_upi' | 'cod'>('demo_card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);

  const shippingCost = cartTotal >= 1999 ? 0 : 99;
  const grandTotal = cartTotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderPayload = {
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      })),
      totalAmount: grandTotal,
      shippingAddress: shippingInfo,
      paymentMethod,
    };

    try {
      // Post to backend API if available
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(orderPayload),
      });

      if (response.ok) {
        const data = await response.json();
        setConfirmedOrder(data.order);
      } else {
        // Fallback local mock order object for offline / client demo mode
        const mockOrder = {
          id: `AMR-${Math.floor(100000 + Math.random() * 900000)}`,
          items: orderPayload.items,
          totalAmount: grandTotal,
          shippingAddress: shippingInfo,
          paymentMethod,
          status: 'Processing',
          createdAt: new Date().toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        };
        setConfirmedOrder(mockOrder);
      }
    } catch (err) {
      // Local fallback on network error
      const mockOrder = {
        id: `AMR-${Math.floor(100000 + Math.random() * 900000)}`,
        items: orderPayload.items,
        totalAmount: grandTotal,
        shippingAddress: shippingInfo,
        paymentMethod,
        status: 'Processing',
        createdAt: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      };
      setConfirmedOrder(mockOrder);
    } finally {
      setIsSubmitting(false);
      clearCart();
    }
  };

  if (confirmedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-yellow-200">
          <CheckCircle className="h-20 w-20 text-emerald-500 mx-auto mb-4 stroke-1" />
          <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full uppercase tracking-wider">
            Order Confirmed (Portfolio Demo)
          </span>
          <h1 className="text-3xl font-extrabold text-red-900 mt-4 mb-2">Thank You for Your Order!</h1>
          <p className="text-gray-600 text-sm">
            Order Reference ID: <span className="font-mono font-bold text-red-800">{confirmedOrder.id || confirmedOrder._id}</span>
          </p>

          <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200 text-left my-8 space-y-3">
            <h4 className="font-bold text-red-900 border-b border-yellow-200 pb-2">Order Summary</h4>
            {confirmedOrder.items?.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between text-sm">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span className="font-semibold">₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between text-base font-bold text-red-900 pt-3 border-t border-yellow-200">
              <span>Total Paid (Demo)</span>
              <span>₹{confirmedOrder.totalAmount}</span>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2.5 bg-red-800 text-white rounded-full font-medium hover:bg-red-700 transition-colors shadow"
            >
              Return to Shop
            </button>
            <button
              onClick={() => navigate('/account')}
              className="px-6 py-2.5 bg-yellow-100 text-red-800 rounded-full font-medium hover:bg-yellow-200 transition-colors"
            >
              View Order History
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-16 w-16 text-yellow-300 mx-auto mb-4 stroke-1" />
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500 mt-2 mb-6">Add items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 bg-red-800 text-white rounded-full font-medium hover:bg-red-700 transition-colors"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-sm text-red-800 hover:text-red-600 mb-6 font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping & Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6">
            {/* Step 1: Shipping Address */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-yellow-100 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-red-900 flex items-center gap-2">
                <Truck className="h-5 w-5 text-red-800" />
                1. Shipping Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={shippingInfo.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:outline-none"
                    placeholder="Anant Sharma"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:outline-none"
                    placeholder="anant@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Street Address</label>
                  <input
                    type="text"
                    name="street"
                    required
                    value={shippingInfo.street}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:outline-none"
                    placeholder="123 Lotus Heritage Blvd"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:outline-none"
                    placeholder="Mumbai"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">State & Zip Code</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      name="state"
                      required
                      value={shippingInfo.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:outline-none"
                      placeholder="Maharashtra"
                    />
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={shippingInfo.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:outline-none"
                      placeholder="400001"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Options (Portfolio Demo) */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-yellow-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-red-900 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-red-800" />
                  2. Payment Method
                </h2>
                <span className="text-xs bg-yellow-100 text-yellow-800 font-bold px-2.5 py-1 rounded-md">
                  Portfolio Sandbox Mode
                </span>
              </div>

              <div className="space-y-3">
                <label
                  onClick={() => setPaymentMethod('demo_card')}
                  className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'demo_card' ? 'border-red-800 bg-red-50/50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'demo_card'}
                      onChange={() => {}}
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-900">Demo Credit / Debit Card</p>
                      <p className="text-xs text-gray-500">Instant mock approval for testing</p>
                    </div>
                  </div>
                  <CreditCard className="h-5 w-5 text-red-800" />
                </label>

                <label
                  onClick={() => setPaymentMethod('demo_upi')}
                  className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'demo_upi' ? 'border-red-800 bg-red-50/50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'demo_upi'}
                      onChange={() => {}}
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-900">Demo UPI / QR Code</p>
                      <p className="text-xs text-gray-500">Google Pay, PhonePe, Paytm sandbox</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded">UPI</span>
                </label>

                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'cod' ? 'border-red-800 bg-red-50/50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => {}} />
                    <div>
                      <p className="text-sm font-bold text-gray-900">Cash on Delivery (COD)</p>
                      <p className="text-xs text-gray-500">Pay cash upon delivery</p>
                    </div>
                  </div>
                  <Truck className="h-5 w-5 text-gray-600" />
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-white p-6 rounded-2xl border border-yellow-100 shadow-sm flex flex-col justify-between h-fit space-y-6">
          <div>
            <h3 className="text-lg font-bold text-red-900 border-b border-gray-100 pb-3 mb-4">
              Order Summary ({cart.length} items)
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-3">
                    <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-md border" />
                    <div>
                      <p className="font-semibold text-gray-800 text-xs truncate w-32">{product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900 text-xs">₹{product.price * quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-gray-100 pt-4 mt-4 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-red-900 border-t border-gray-200 pt-3">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            form="checkout-form"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-red-800 to-amber-700 text-white font-bold text-sm rounded-xl shadow-lg hover:from-red-700 hover:to-amber-600 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Processing Order...</span>
            ) : (
              <>
                <ShieldCheck className="h-5 w-5" />
                <span>Place Portfolio Order</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MockCheckout;
