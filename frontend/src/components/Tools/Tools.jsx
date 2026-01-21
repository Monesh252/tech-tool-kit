// src/components/Tools/Tools.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const tools = [
    {
        id: 1,
        title: 'Merge PDF',
        description: 'Combine multiple PDFs into one',
        icon: '🔄',
        path: '/merge',
        color: 'bg-red-400'
    },
    {
        id: 2,
        title: 'Split PDF',
        description: 'Extract pages from PDF',
        icon: '✂️',
        path: '/split',
        color: 'bg-teal-400'
    },
    {
        id: 3,
        title: 'Compress PDF',
        description: 'Reduce file size while keeping quality',
        icon: '📉',
        path: '/compress',
        color: 'bg-yellow-400'
    },
    {
        id: 4,
        title: 'PDF to Word',
        description: 'Convert PDF to editable Word',
        icon: '📝',
        path: '/convert',
        color: 'bg-green-400'
    },
    {
        id: 5,
        title: 'PDF to Excel',
        description: 'Extract tables from PDF to Excel',
        icon: '📊',
        path: '/convert',
        color: 'bg-cyan-500'
    },
    {
        id: 6,
        title: 'PDF to PPT',
        description: 'Convert PDF to PowerPoint',
        icon: '📽️',
        path: '/convert',
        color: 'bg-pink-500'
    }
];

const Tools = ({ limit }) => {
    const displayedTools = limit ? tools.slice(0, limit) : tools;
    const showAllToolsCard = limit && tools.length > limit;

    return (
        <div className="py-16 px-8 bg-blue-50">
            <h2 className="text-center text-4xl font-bold text-gray-800 mb-12">
                {limit ? 'Popular Tools' : 'All Available Tools'}
            </h2>
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedTools.map((tool) => (
                    <Link to={tool.path} key={tool.id} className="bg-white p-8 rounded-lg text-center no-underline text-inherit shadow-lg transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex flex-col items-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 ${tool.color}`}>
                            {tool.icon}
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-800">{tool.title}</h3>
                        <p className="text-gray-600 text-sm">{tool.description}</p>
                    </Link>
                ))}
                
                {showAllToolsCard && (
                    <Link to="/alltools" className="bg-white p-8 rounded-lg text-center no-underline text-inherit shadow-lg transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex flex-col items-center justify-center border-2 border-dashed border-blue-300">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 bg-blue-100 text-blue-600">
                            ➔
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-800">All Tools</h3>
                        <p className="text-gray-600 text-sm">Explore our complete collection of tools</p>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Tools;
