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
    title: 'PDF to Markdown',
    description: 'Convert PDF to Markdown (.md)',
    icon: '📄',
    path: '/pdf-to-markdown',
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
    path: '/pdf-to-word',
    color: 'bg-green-400'
  },
  {
    id: 5,
    title: 'PDF to CSV',
    description: 'Extract tables from PDF to CSV',
    icon: '📊',
    path: '/pdf-to-csv',
    color: 'bg-cyan-500'
  },
  {
    id: 6,
    title: 'PDF to JPG',
    description: 'Convert PDF pages to JPG images',
    icon: '🖼️',
    path: '/pdf-to-jpg',
    color: 'bg-pink-500'
  },
  {
    id: 7,
    title: "Split PDF",
    description: "Extract selected pages from PDF",
    icon: "✂️",
    path: "/split",
    color: "bg-purple-400"
  },
  {
  id: 8,
    title: "Reorder PDF",
    description: "Change the order of PDF pages",
    icon: "🔀",
    path: "/reorder",
    color: "bg-indigo-400"
  },
  {
    id: 9,
    title: "Delete Pages PDF",
    description: "Remove unwanted pages from PDF",
    icon: "🗑️",
    path: "/delete-pages",
    color: "bg-red-500"
  },
  {
  id: 10,
    title: "Rotate PDF Pages",
    description: "Rotate PDF pages left or right",
    icon: "🔄",
    path: "/rotate",
    color: "bg-indigo-500"
  },
  {
    id: 11,
    title: "Watermark PDF",
    description: "Add text watermark to PDF pages",
    icon: "💧",
    path: "/watermark",
    color: "bg-blue-500"
  },
  {
    id: 12,
    title: "Protect PDF",
    description: "Secure PDF with password protection",
    icon: "🔒",
    path: "/protect",
    color: "bg-gray-600"
  },
  {
  id: 13,
    title: "Unlock PDF",
    description: "Remove password protection",
    icon: "🔓",
    path: "/unlock",
    color: "bg-green-500"
  },
  {
    id: 13,
    title: "Page Numbers",
    description: "Add page numbers to PDF",
    icon: "🔢",
    path: "/page-numbers",
    color: "bg-emerald-500",
  },
  {
    id: 14,
    title: "Extract Images",
    description: "Extract all images from PDF",
    path: "/extract-images",
    icon: "🖼️",
    color: "bg-pink-400"
  },
  {
    id: 15,
    title: "Extract Text",
    description: "Extract all text from PDF",
    path: "/extract-text",
    icon: "📄",
    color: "bg-blue-400"
  },
  {
    id: 16,
    title: "HTML to PDF",
    description: "Convert HTML content to PDF",
    path: "/html-to-pdf",
    icon: "🌐",
    color: "bg-black"
  },
  {
    id: 17,
    title: "URL to PDF",
    description: "Convert a webpage into PDF",
    path: "/url-to-pdf",
    icon: "🌐",
    color: "bg-gray-700"
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

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {displayedTools.map(tool => (
          <Link
            to={tool.path}
            key={tool.id}
            className="bg-white p-8 rounded-lg text-center shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-transform flex flex-col items-center"
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 ${tool.color}`}>
              {tool.icon}
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800">{tool.title}</h3>
            <p className="text-gray-600 text-sm">{tool.description}</p>
          </Link>
        ))}

        {showAllToolsCard && (
          <Link
            to="/alltools"
            className="bg-white p-8 rounded-lg text-center shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-transform flex flex-col items-center justify-center border-2 border-dashed border-blue-300"
          >
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
