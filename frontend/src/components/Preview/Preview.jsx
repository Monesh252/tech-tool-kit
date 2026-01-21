// src/components/Preview/Preview.jsx
import React from 'react';

const Preview = ({ files, onRemoveFile, onProcess, processing }) => {
    // Helper to format file size
    const formatSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="max-w-2xl mx-auto mt-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-700">Selected Files ({files.length})</h3>
                    <button 
                        onClick={() => onProcess('clear')}
                        className="text-sm text-red-500 hover:text-red-700 font-medium"
                    >
                        Clear All
                    </button>
                </div>
                
                <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                    {files.map((file, index) => (
                        <div key={`${file.name}-${index}`} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-150">
                            <div className="flex items-center gap-4 overflow-hidden">
                                <div className="text-red-500 text-2xl flex-shrink-0">
                                    📄
                                </div>
                                <div className="min-w-0">
                                    <p className="font-medium text-gray-800 truncate">{file.name}</p>
                                    <p className="text-xs text-gray-500">{formatSize(file.size)}</p>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => onRemoveFile(index)}
                                className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                                title="Remove file"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={() => onProcess('merge')}
                    disabled={processing}
                    className={`
                        py-3 px-8 rounded-lg font-bold text-white shadow-lg transform transition-all duration-200
                        ${processing 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-red-500 hover:bg-red-600 hover:-translate-y-1 hover:shadow-xl active:translate-y-0'
                        }
                    `}
                >
                    {processing ? 'Processing...' : 'Merge PDF'}
                </button>
                
                <button
                    onClick={() => onProcess('compress')}
                    disabled={processing}
                    className={`
                        py-3 px-8 rounded-lg font-bold text-white shadow-lg transform transition-all duration-200
                        ${processing 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-500 hover:bg-blue-600 hover:-translate-y-1 hover:shadow-xl active:translate-y-0'
                        }
                    `}
                >
                    {processing ? 'Processing...' : 'Compress PDF'}
                </button>
            </div>
        </div>
    );
};

export default Preview;
