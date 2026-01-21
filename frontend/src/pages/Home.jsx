// src/pages/Home.jsx
import React from 'react';
import Tools from '../components/Tools/Tools';

const Home = () => {
    return (
        <div className="flex flex-col flex-grow">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-blue-50 to-white py-20 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6 tracking-tight">
                        TechToolKit
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                        Your all-in-one digital workspace. We provide a suite of powerful tools to simplify your daily tasks, from document management to developer utilities.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg">
                            Get Started
                        </button>
                        <button className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

            {/* Tools Section with Limit */}
            <Tools limit={5} />

            {/* Features Section */}
            <div className="py-20 px-4 text-center bg-gray-50">
                <h2 className="text-4xl font-bold text-gray-800 mb-16">Why Choose TechToolKit?</h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-5xl mb-6">🚀</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Efficiency First</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Streamline your workflow with tools designed for speed and simplicity. No more switching between multiple apps.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-5xl mb-6">🛡️</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Secure by Design</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Your data privacy is our priority. We process files securely and never store your sensitive information.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-5xl mb-6">💡</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Constantly Evolving</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We're always adding new features and tools based on user feedback to meet your changing needs.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
