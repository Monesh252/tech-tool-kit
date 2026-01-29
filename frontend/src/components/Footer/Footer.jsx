// src/components/Footer/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="footer-section">
                    <h3 className="text-xl font-bold mb-4">TechToolKit</h3>
                    <p className="text-gray-400 text-sm">
                        Your one-stop solution for all digital requirements. Secure, fast, and easy to use.
                    </p>
                </div>

                <div className="footer-section">
                    <h3 className="text-lg font-semibold mb-4">Product</h3>
                    <ul className="space-y-2">
                        <li><Link to="/alltools" className="text-gray-400 hover:text-white transition-colors duration-200">All Tools</Link></li>
                        <li><Link to="/merge" className="text-gray-400 hover:text-white transition-colors duration-200">Merge PDF</Link></li>
                        <li><Link to="/split" className="text-gray-400 hover:text-white transition-colors duration-200">Split PDF</Link></li>
                        <li><Link to="/compress" className="text-gray-400 hover:text-white transition-colors duration-200">Compress PDF</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 className="text-lg font-semibold mb-4">Company</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">About Us</Link></li>
                        <li><Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</Link></li>
                        <li><Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</Link></li>
                        <li><Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 className="text-lg font-semibold mb-4">Connect</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-2xl">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-2xl">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-2xl">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center mt-12 pt-8 border-t border-gray-700 text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} TechToolKit. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
