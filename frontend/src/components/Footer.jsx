import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
                      <div className="max-w-7xl mx-auto">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                              <div>
                                  <div className="flex items-center space-x-2 mb-6">
                                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                                          <span className="text-white font-bold text-xl">T</span>
                                      </div>
                                      <span className="text-2xl font-bold">TechToolkit</span>
                                  </div>
                                  <p className="text-gray-400">
                                      Enterprise-grade document solutions for modern businesses.
                                  </p>
                              </div>
                              <div>
                                  <h4 className="font-bold text-lg mb-4">Product</h4>
                                  <ul className="space-y-2 text-gray-400">
                                      {/* <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li> */}
                                      <li><Link to="/alltools" className="hover:text-white transition-colors">Tools</Link></li>
                                      {/* <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li> */}
                                      {/* <li><Link to="/api" className="hover:text-white transition-colors">API</Link></li> */}
                                  </ul>
                              </div>
                              <div>
                                  <h4 className="font-bold text-lg mb-4">Company</h4>
                                  <ul className="space-y-2 text-gray-400">
                                      <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                                      {/* <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li> */}
                                      {/* <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li> */}
                                      {/* <li><Link to="/press" className="hover:text-white transition-colors">Press</Link></li> */}
                                  </ul>
                              </div>
                              <div>
                                  <h4 className="font-bold text-lg mb-4">Legal</h4>
                                  <ul className="space-y-2 text-gray-400">
                                      <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                                      <li><Link to="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                                      <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
                                  </ul>
                              </div>
                          </div>
                          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
                              © 2024 TechToolkit. All rights reserved.
                          </div>
                      </div>
    </footer>
  );
};

export default Footer;