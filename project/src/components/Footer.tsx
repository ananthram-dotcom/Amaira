import React from 'react';
import { Heart, Mail, Phone, MapPin, Instagram, Facebook, Twitter, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-red-950 text-yellow-100 pt-12 pb-8 border-t-4 border-yellow-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-wide text-yellow-400">AMAIRA</h3>
            <p className="text-xs text-yellow-200/80 leading-relaxed">
              Curated authentic Indian beauty, traditional ornaments, ayurvedic skincare, and designer ethnic wear.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 bg-red-900/50 hover:bg-yellow-600 hover:text-red-950 rounded-full transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-red-900/50 hover:bg-yellow-600 hover:text-red-950 rounded-full transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-red-900/50 hover:bg-yellow-600 hover:text-red-950 rounded-full transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-yellow-400 transition-colors">Home & Catalog</Link></li>
              <li><Link to="/wishlist" className="hover:text-yellow-400 transition-colors">My Wishlist</Link></li>
              <li><Link to="/account" className="hover:text-yellow-400 transition-colors">User Account & Orders</Link></li>
              <li><Link to="/checkout" className="hover:text-yellow-400 transition-colors">Portfolio Checkout</Link></li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider">Policies & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/privacy-policy" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-yellow-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/shipping-returns" className="hover:text-yellow-400 transition-colors">Shipping & Returns</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider">Customer Support</h4>
            <div className="space-y-2 text-xs text-yellow-200/80">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-yellow-500" /> Bandra West, Mumbai, MH 400050</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-yellow-500" /> +91 1800 200 4567</p>
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-yellow-500" /> support@amairabeauty.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-red-900 pt-6 flex flex-wrap justify-between items-center text-xs text-yellow-200/60 gap-4">
          <p>© 2026 AMAIRA Indian Beauty. Portfolio Demonstration Website.</p>
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="h-4 w-4" /> SSL Encrypted Sandbox Mode
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;