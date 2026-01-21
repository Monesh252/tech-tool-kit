// src/pages/ToolsPage.jsx
import React from 'react';
import Tools from '../components/Tools/Tools';

const ToolsPage = ({ tool }) => {
    // If a specific tool is selected, we could show a specific interface
    // For now, we'll just show the tool name or the list of all tools
    
    if (tool) {
        const toolNames = {
            'merge': 'Merge PDF',
            'split': 'Split PDF',
            'compress': 'Compress PDF',
            'convert': 'Convert PDF'
        };

        return (
            <div className="flex flex-col flex-grow bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4 w-full text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">{toolNames[tool] || 'PDF Tool'}</h1>
                    <p className="text-xl text-gray-600 mb-12">
                        {tool === 'merge' && 'Combine PDFs in the order you want with the easiest PDF merger available.'}
                        {tool === 'split' && 'Separate one page or a whole set for easy conversion into independent PDF files.'}
                        {tool === 'compress' && 'Reduce file size while optimizing for maximal PDF quality.'}
                        {tool === 'convert' && 'Convert your PDF to various formats like Word, Excel, and PowerPoint.'}
                    </p>
                    
                    <div className="bg-white p-12 rounded-xl shadow-lg border-2 border-dashed border-gray-300 min-h-[300px] flex flex-col items-center justify-center">
                        <div className="text-6xl mb-6">
                            {tool === 'merge' && '🔄'}
                            {tool === 'split' && '✂️'}
                            {tool === 'compress' && '📉'}
                            {tool === 'convert' && '📝'}
                        </div>
                        <button className="bg-red-500 text-white text-xl font-bold py-4 px-12 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-1">
                            Select PDF files
                        </button>
                        <p className="mt-4 text-gray-500">or drop PDFs here</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-grow">
            <div className="bg-gray-50 py-12 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">All PDF Tools</h1>
                <p className="text-xl text-gray-600">Make use of our collection of PDF tools to process your digital documents.</p>
            </div>
            <Tools />
        </div>
    );
};

export default ToolsPage;
