import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TechToolKit</h3>
            <p className="text-gray-300">
              Your one-stop solution for all digital requirements. Secure, fast, and easy to use.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/tools" className="text-gray-300 hover:text-white">All Tools</Link></li>
              <li><Link to="/tools/merge" className="text-gray-300 hover:text-white">Merge PDF</Link></li>
              <li><Link to="/tools/split" className="text-gray-300 hover:text-white">Split PDF</Link></li>
              <li><Link to="/tools/compress" className="text-gray-300 hover:text-white">Compress PDF</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} TechToolKit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;