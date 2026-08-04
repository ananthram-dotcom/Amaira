import React from 'react';
import { Shield } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-yellow-100 space-y-6">
        <div className="flex items-center space-x-3 border-b border-yellow-200 pb-4">
          <Shield className="h-8 w-8 text-red-800" />
          <h1 className="text-3xl font-bold text-red-900">Privacy Policy</h1>
        </div>

        <p className="text-sm text-gray-500">Last updated: August 5, 2026</p>

        <section className="space-y-3 text-gray-700 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-red-900">1. Information We Collect</h2>
          <p>
            At AMAIRA Indian Beauty, we collect personal information necessary to fulfill your orders and enhance your portfolio shopping experience. This includes your name, email address, phone number, and delivery address.
          </p>
        </section>

        <section className="space-y-3 text-gray-700 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-red-900">2. How We Use Your Information</h2>
          <p>
            Your information is used strictly to process orders, manage user authentication, send transaction updates, and improve website navigation. We do not sell or rent your personal data to third parties.
          </p>
        </section>

        <section className="space-y-3 text-gray-700 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-red-900">3. Data Security & Cookies</h2>
          <p>
            We implement standard encryption techniques (SSL/TLS) and HTTP-only cookie security measures to protect your account credentials and browsing sessions.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
