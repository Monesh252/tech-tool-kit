import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Completed = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Simple check icon SVG
  const CheckIcon = () => (
    <svg 
      className="w-12 h-12 text-green-500" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="M5 13l4 4L19 7" 
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckIcon />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Processing Complete
          </h1>
          
          {/* Description */}
          <p className="text-gray-600 mb-8">
            Your file has been successfully processed and downloaded.
          </p>

          {/* Status Cards */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 min-w-[120px]">
              <div className="text-green-500 font-bold mb-1">✓</div>
              <div className="text-sm text-gray-600">Processed</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 min-w-[120px]">
              <div className="text-blue-500 font-bold mb-1">↓</div>
              <div className="text-sm text-gray-600">Downloaded</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/"
              className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              to="/alltools"
              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium border border-gray-300 hover:border-gray-400 transition-colors"
            >
              Process Another
            </Link>
          </div>

          {/* Additional Links */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-gray-500 text-sm mb-4">Other tools you might find useful:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                to="/merge"
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
              >
                Merge PDF
              </Link>
              <Link
                to="/compress"
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
              >
                Compress PDF
              </Link>
              <Link
                to="/split"
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
              >
                Split PDF
              </Link>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Your files are automatically deleted from our servers for privacy.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Completed;