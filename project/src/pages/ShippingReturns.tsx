import React from 'react';
import { Truck, RefreshCw } from 'lucide-react';

const ShippingReturns: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-yellow-100 space-y-6">
        <div className="flex items-center space-x-3 border-b border-yellow-200 pb-4">
          <Truck className="h-8 w-8 text-red-800" />
          <h1 className="text-3xl font-bold text-red-900">Shipping & Returns Policy</h1>
        </div>

        <section className="space-y-3 text-gray-700 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-red-900 flex items-center gap-2">
            <Truck className="h-5 w-5 text-amber-700" /> Free Shipping Threshold
          </h2>
          <p>
            We offer FREE express shipping across India on all orders over ₹1,999. Standard shipping flat rate of ₹99 applies for orders under ₹1,999.
          </p>
        </section>

        <section className="space-y-3 text-gray-700 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-red-900 flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-amber-700" /> Easy 7-Day Hassle-Free Returns
          </h2>
          <p>
            If you receive a damaged or unsatisfied item, you may request a replacement or full refund within 7 days of delivery.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingReturns;
