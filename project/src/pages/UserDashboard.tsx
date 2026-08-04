import React, { useState, useEffect } from 'react';
import { User, Package, MapPin, LogOut, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const UserDashboard: React.FC = () => {
  const { user, token, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState<boolean>(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    // Fetch user orders from backend API
    fetch(`${API_BASE_URL}/api/orders/my-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data)) setOrders(data);
      })
      .catch(() => {})
      .finally(() => setLoadingOrders(false));
  }, [isAuthenticated, token, navigate]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800">Please Log In</h2>
        <p className="text-gray-500 text-sm mt-1 mb-6">You must be logged in to view your account dashboard.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 bg-red-800 text-white rounded-full font-medium hover:bg-red-700 transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-900 to-amber-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center text-2xl font-bold border border-white/20">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-amber-200 text-sm">{user.email}</p>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-medium transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="md:col-span-1 space-y-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${
              activeTab === 'orders' ? 'bg-red-800 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-yellow-50'
            }`}
          >
            <Package className="h-5 w-5" />
            <span>Order History</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${
              activeTab === 'profile' ? 'bg-red-800 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-yellow-50'
            }`}
          >
            <User className="h-5 w-5" />
            <span>Profile Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${
              activeTab === 'addresses' ? 'bg-red-800 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-yellow-50'
            }`}
          >
            <MapPin className="h-5 w-5" />
            <span>Saved Addresses</span>
          </button>
        </div>

        {/* Tab Panel Content */}
        <div className="md:col-span-3">
          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl p-6 border border-yellow-100 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-red-900 border-b border-gray-100 pb-3">My Orders</h2>

              {loadingOrders ? (
                <p className="text-sm text-gray-500 py-8 text-center">Loading your order history...</p>
              ) : orders.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Package className="h-12 w-12 text-yellow-300 mx-auto mb-3 stroke-1" />
                  <p className="text-base font-semibold text-gray-700">No orders placed yet</p>
                  <p className="text-xs text-gray-500 mt-1 mb-4">When you place orders, they will appear here live.</p>
                  <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-red-800 text-white text-xs font-semibold rounded-full hover:bg-red-700 transition-colors"
                  >
                    Shop Now
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id || order._id}
                      className="border border-yellow-200 rounded-xl p-5 bg-gradient-to-r from-yellow-50/30 to-white"
                    >
                      <div className="flex flex-wrap justify-between items-center border-b border-yellow-100 pb-3 mb-3 gap-2">
                        <div>
                          <span className="text-xs text-gray-500 block">Order ID</span>
                          <span className="text-sm font-mono font-bold text-red-900">{order.id || order._id}</span>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 block">Placed On</span>
                          <span className="text-xs font-medium text-gray-700">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {order.status || 'Processing'}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {order.items?.map((item, i) => (
                          <div key={i} className="flex justify-between text-xs text-gray-700">
                            <span>
                              {item.name} (x{item.quantity})
                            </span>
                            <span className="font-semibold text-gray-900">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center border-t border-yellow-100 pt-3 mt-3">
                        <span className="text-xs font-semibold text-gray-500">Total Amount</span>
                        <span className="text-base font-bold text-red-900">₹{order.totalAmount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl p-6 border border-yellow-100 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-red-900 border-b border-gray-100 pb-3">Personal Profile</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Full Name</label>
                  <p className="text-base font-semibold text-gray-900 mt-1">{user.name}</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Email Address</label>
                  <p className="text-base font-semibold text-gray-900 mt-1">{user.email}</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Account Status</label>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mt-1">
                    <ShieldCheck className="h-4 w-4" /> Active Authenticated User
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="bg-white rounded-2xl p-6 border border-yellow-100 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-red-900 border-b border-gray-100 pb-3">Default Delivery Address</h2>
              <p className="text-sm text-gray-600">
                123 Lotus Heritage Blvd, Bandra West, Mumbai, Maharashtra 400050
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
