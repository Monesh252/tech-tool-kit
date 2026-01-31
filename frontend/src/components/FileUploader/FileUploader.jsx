// src/components/FileUploader/FileUploader.jsx
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = ({ onFilesSelected, multiple = true, accept = '.pdf', maxFiles = 10, maxSize = 50 * 1024 * 1024 }) => {
    const [uploadProgress, setUploadProgress] = useState({});
    const [error, setError] = useState('');

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        setError('');
        
        // Handle rejected files
        if (rejectedFiles.length > 0) {
            const reasons = rejectedFiles.map(file => {
                if (file.file.size > maxSize) {
                    return `${file.file.name}: File too large (max ${maxSize / (1024 * 1024)}MB)`;
                }
                if (file.errors[0]?.code === 'file-invalid-type') {
                    return `${file.file.name}: Invalid file type`;
                }
                if (file.errors[0]?.code === 'too-many-files') {
                    return `Maximum ${maxFiles} files allowed`;
                }
                return `${file.file.name}: Unknown error`;
            });
            setError(reasons.join(', '));
        }

        // Simulate upload progress for accepted files
        if (acceptedFiles.length > 0) {
            const progressData = {};
            acceptedFiles.forEach((file, index) => {
                progressData[file.name] = 0;
                // Simulate progress
                const interval = setInterval(() => {
                    progressData[file.name] = Math.min(100, progressData[file.name] + 10);
                    setUploadProgress({...progressData});
                    
                    if (progressData[file.name] === 100) {
                        clearInterval(interval);
                        // Simulate processing completion
                        setTimeout(() => {
                            delete progressData[file.name];
                            setUploadProgress({...progressData});
                        }, 500);
                    }
                }, 100);
            });
            
            onFilesSelected(acceptedFiles);
        }
    }, [onFilesSelected, maxFiles, maxSize]);

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf']
        },
        multiple,
        maxFiles,
        maxSize
    });

    const baseClasses = "border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-500 mx-auto max-w-2xl relative overflow-hidden";
    const activeClasses = "border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 scale-105 shadow-xl";
    const rejectClasses = "border-red-400 bg-gradient-to-br from-red-50 to-pink-50";
    const normalClasses = "border-blue-200 hover:border-blue-300 bg-gradient-to-br from-white to-blue-50/50 shadow-lg hover:shadow-2xl";

    return (
        <div className="space-y-6">
            <div
                {...getRootProps()}
                className={`
                    ${baseClasses}
                    ${isDragActive ? activeClasses : normalClasses}
                    ${isDragReject ? rejectClasses : ''}
                    group
                `}
            >
                {/* Animated background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 animate-slide"></div>
                    <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-purple-400 to-blue-400 animate-slide-reverse"></div>
                </div>

                <input {...getInputProps()} />

                {/* Upload icon with animation */}
                <div className="relative mb-6">
                    <div className="w-24 h-24 mx-auto relative">
                        {/* Outer ring */}
                        <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
                        
                        {/* Animated ring */}
                        <div className={`absolute inset-4 rounded-full border-4 ${isDragActive ? 'border-blue-400 animate-pulse' : 'border-blue-300'} transition-all duration-300`}></div>
                        
                        {/* File icon */}
                        <div className="absolute inset-6 flex items-center justify-center">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="transition-all duration-300 group-hover:scale-110">
                                <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" 
                                    stroke={isDragActive ? "#3B82F6" : "#1D4ED8"} 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                                <path d="M14 2V8H20" 
                                    stroke={isDragActive ? "#3B82F6" : "#1D4ED8"} 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                                <path d="M16 13H8" 
                                    stroke={isDragActive ? "#3B82F6" : "#1D4ED8"} 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round"
                                />
                                <path d="M16 17H8" 
                                    stroke={isDragActive ? "#3B82F6" : "#1D4ED8"} 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round"
                                />
                                <path d="M10 9H9H8" 
                                    stroke={isDragActive ? "#3B82F6" : "#1D4ED8"} 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        {/* Upload arrow */}
                        {isDragActive && (
                            <div className="absolute -top-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
                                </svg>
                            </div>
                        )}
                    </div>
                </div>

                {/* Text content */}
                <div className="space-y-4">
                    {isDragActive ? (
                        <div className="animate-pulse">
                            <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Release to upload
                            </p>
                            <p className="text-gray-500 mt-2">Drop your PDF files here</p>
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                Upload PDF Files
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {multiple ? 'Drag & drop multiple files or' : 'Drag & drop a file or'}
                            </p>
                        </div>
                    )}
                </div>

                {/* Upload button */}
                <button 
                    type="button"
                    className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                >
                    <span className="text-xl">📁</span>
                    Browse Files
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                </button>

                {/* File info */}
                <div className="mt-6 space-y-2">
                    <p className="text-sm text-gray-500">
                        {multiple ? `Supports multiple files (max ${maxFiles})` : 'Single file only'}
                    </p>
                    <p className="text-sm text-gray-500">
                        Max file size: {maxSize / (1024 * 1024)}MB • PDF only
                    </p>
                </div>
            </div>

            {/* Progress bars for uploaded files */}
            {Object.keys(uploadProgress).length > 0 && (
                <div className="max-w-2xl mx-auto space-y-4">
                    <h4 className="font-semibold text-gray-700">Uploading...</h4>
                    {Object.entries(uploadProgress).map(([fileName, progress]) => (
                        <div key={fileName} className="bg-white rounded-xl p-4 shadow-lg border">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
                                    {fileName}
                                </span>
                                <span className="text-sm font-bold text-blue-600">
                                    {progress}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>Uploading...</span>
                                {progress === 100 && (
                                    <span className="text-green-600 font-semibold flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        Complete
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Error display */}
            {error && (
                <div className="max-w-2xl mx-auto">
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                            </svg>
                        </div>
                        <div>
                            <p className="font-medium text-red-800">Upload Error</p>
                            <p className="text-red-600 text-sm mt-1">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Tips */}
            <div className="max-w-2xl mx-auto">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                    <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="text-blue-600">💡</span>
                        Tips for best results
                    </h5>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Ensure PDF files are not password protected</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Use high-quality scans for better OCR results</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Merge multiple PDFs before splitting or converting</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Check file permissions before processing</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Add custom CSS for animations */}
            <style jsx>{`
                @keyframes slide {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes slide-reverse {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-slide {
                    animation: slide 2s linear infinite;
                }
                .animate-slide-reverse {
                    animation: slide-reverse 2s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default FileUploader;