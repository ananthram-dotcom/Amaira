import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const footerLinks = {
    shop: [
      'Garments',
      'Ornaments',
      'Skincare',
      'Haircare',
      'Perfume',
      'Makeup'
    ],
    help: [
      'Contact Us',
      'Shipping Info',
      'Returns',
      'Size Guide',
      'FAQ',
      'Track Order'
    ],
    company: [
      'About Us',
      'Our Story',
      'Careers',
      'Press',
      'Wholesale',
      'Affiliate Program'
    ],
    legal: [
      'Terms of Service',
      'Privacy Policy',
      'Cookie Policy',
      'Refund Policy',
      'Shipping Policy'
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-red-900 via-red-800 to-red-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold mb-4 text-yellow-400">AMAIRA</h3>
              <p className="text-red-200 mb-6 leading-relaxed">
                Your trusted destination for authentic Indian beauty and fashion. 
                We celebrate the rich heritage of Indian culture through carefully 
                curated products that enhance your natural beauty.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-yellow-400" />
                  <span className="text-red-200">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-yellow-400" />
                  <span className="text-red-200">hello@amaira.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-yellow-400 mt-1" />
                  <span className="text-red-200">123 Fashion Street, Mumbai, Maharashtra 400001</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <a href="#" className="text-red-200 hover:text-yellow-400 transition-colors">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Help</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <a href="#" className="text-red-200 hover:text-yellow-400 transition-colors">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <a href="#" className="text-red-200 hover:text-yellow-400 transition-colors">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-red-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold mb-2 text-yellow-400">Stay Updated</h4>
              <p className="text-red-200">
                Subscribe to our newsletter for the latest offers and collections
              </p>
            </div>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-red-600 rounded-lg text-white placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-yellow-400 text-red-900 rounded-lg font-medium hover:bg-yellow-300 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Social Media & Legal */}
        <div className="mt-8 pt-8 border-t border-red-700">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Social Media */}
            <div className="flex space-x-4">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Youtube, label: 'YouTube' }
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/10 p-3 rounded-full hover:bg-yellow-400 hover:text-red-900 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center space-x-6 text-sm">
              {footerLinks.legal.map((link, index) => (
                <React.Fragment key={link}>
                  <a href="#" className="text-red-200 hover:text-yellow-400 transition-colors">
                    {link}
                  </a>
                  {index < footerLinks.legal.length - 1 && (
                    <span className="text-red-600">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-red-700 text-center">
          <p className="text-red-200">
            © 2024 AMAIRA. All rights reserved. Made with ❤️ in India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;