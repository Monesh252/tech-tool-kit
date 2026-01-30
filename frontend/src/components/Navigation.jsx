import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            ILikePDF
          </Link>

          {/* Nav Links */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>

            {/* ✅ FIXED */}
            <Link to="/alltools" className="text-gray-700 hover:text-blue-600 font-medium">
              All Tools
            </Link>

            <Link to="/merge" className="text-gray-700 hover:text-blue-600 font-medium">
              Merge PDF
            </Link>

            <Link to="/split" className="text-gray-700 hover:text-blue-600 font-medium">
              Split PDF
            </Link>

            <Link to="/compress" className="text-gray-700 hover:text-blue-600 font-medium">
              Compress PDF
            </Link>

            {/* ✅ Login must be Link */}
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
