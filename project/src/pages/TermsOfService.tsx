import React from 'react';
import { FileText } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-yellow-100 space-y-6">
        <div className="flex items-center space-x-3 border-b border-yellow-200 pb-4">
          <FileText className="h-8 w-8 text-red-800" />
          <h1 className="text-3xl font-bold text-red-900">Terms of Service</h1>
        </div>

        <p className="text-sm text-gray-500">Last updated: August 5, 2026</p>

        <section className="space-y-3 text-gray-700 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-red-900">1. Portfolio Demo Disclaimer</h2>
          <p>
            AMAIRA is a showcase e-commerce portfolio web application. All transactions processed on this platform use demo sandbox modes and do not process real currency or physical shipments.
          </p>
        </section>

        <section className="space-y-3 text-gray-700 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-red-900">2. Intellectual Property</h2>
          <p>
            All traditional artwork, branding, logo designs, and software code presented on this website are protected under copyright and portfolio showcase license rights.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
