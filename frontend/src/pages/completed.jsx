import React from "react";
import { Link } from "react-router-dom";

const Completed = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-2xl shadow-lg max-w-md">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">PDF Processing Complete!</h1>
          <p className="text-gray-600 mb-8">
            Your file has been processed successfully and downloaded.
          </p>
          <div className="space-y-4">
            <Link
              to="/"
              className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Back to Home
            </Link>
            <Link
              to="/tools"
              className="block w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300"
            >
              Process Another File
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Completed;