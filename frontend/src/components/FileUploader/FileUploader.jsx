// src/components/FileUploader/FileUploader.jsx
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = ({ onFilesSelected, multiple = true, accept = '.pdf' }) => {
    const onDrop = useCallback((acceptedFiles) => {
        onFilesSelected(acceptedFiles);
    }, [onFilesSelected]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf']
        },
        multiple
    });

    const baseClasses = "border-2 border-dashed border-blue-600 rounded-xl p-12 text-center bg-blue-50 cursor-pointer transition-all duration-300 mx-auto max-w-xl";
    const activeClasses = "bg-blue-100 border-blue-700";

    return (
        <div
            {...getRootProps()}
            className={`${baseClasses} ${isDragActive ? activeClasses : ''}`}
        >
            <input {...getInputProps()} />

            <div className="mb-4"> {/* upload-icon */}
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="mx-auto">
                    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="#3366CC" strokeWidth="2"/>
                    <path d="M14 2V8H20" stroke="#3366CC" strokeWidth="2"/>
                    <path d="M12 18V12" stroke="#3366CC" strokeWidth="2"/>
                    <path d="M9 15H15" stroke="#3366CC" strokeWidth="2"/>
                </svg>
            </div>

            <div className="upload-text">
                {isDragActive ? (
                    <p className="text-xl font-bold text-blue-600">Drop the files here ...</p>
                ) : (
                    <>
                        <p className="text-2xl font-bold text-blue-600 mb-2">Select PDF files</p>
                        <p className="text-gray-500 mb-6">or drop files here</p>
                    </>
                )}
            </div>

            <button className="bg-blue-600 text-white border-none py-3 px-8 rounded-md text-base font-semibold cursor-pointer transition-colors duration-300 hover:bg-blue-700">
                Select Files
            </button>
        </div>
    );
};

export default FileUploader;
