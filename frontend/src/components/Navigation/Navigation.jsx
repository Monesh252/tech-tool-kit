// src/components/Navigation/Navigation.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="bg-white shadow-md py-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
                <div className="logo">
                    <Link to="/" className="text-2xl font-bold text-blue-600 no-underline flex items-center gap-2">
                        <span>TechToolKit</span>
                    </Link>
                </div>

                <div className="hidden md:flex gap-8">
                    <Link to="/" className="text-gray-600 font-medium no-underline transition-colors duration-300 hover:text-blue-600">Home</Link>
                    <Link to="/alltools" className="text-gray-600 font-medium no-underline transition-colors duration-300 hover:text-blue-600">All Tools</Link>
                    <Link to="#" className="text-gray-600 font-medium no-underline transition-colors duration-300 hover:text-blue-600">About</Link>
                    <Link to="#" className="text-gray-600 font-medium no-underline transition-colors duration-300 hover:text-blue-600">Contact</Link>
                </div>

                <div className="flex gap-4">
                    <button className="py-2 px-6 rounded-lg font-semibold cursor-pointer transition-all duration-300 bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">Login</button>
                    <button className="py-2 px-6 rounded-lg font-semibold cursor-pointer transition-all duration-300 bg-blue-600 border-2 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700">Sign Up</button>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
