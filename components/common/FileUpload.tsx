import React, { useState, useRef } from 'react';
import { XIcon } from '../IconComponents';

interface FileUploadProps {
    label: string;
    acceptedFileTypes?: string;
    onFileSelect: (file: File | null) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ label, acceptedFileTypes, onFileSelect }) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            onFileSelect(file);
        } else {
            setFileName(null);
            onFileSelect(null);
        }
    };
    
    const clearFile = () => {
        setFileName(null);
        onFileSelect(null);
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    if (fileName) {
        return (
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                </label>
                 <div className="mt-1 flex justify-between items-center px-3 py-2 border border-green-500 bg-green-50 dark:bg-green-900/50 rounded-md">
                    <p className="text-sm text-green-800 dark:text-green-300 truncate">{fileName}</p>
                    <button onClick={clearFile} type="button" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                        <XIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                        <label htmlFor={`file-upload-${label}`} className="relative cursor-pointer bg-transparent rounded-md font-medium text-brand-blue hover:text-brand-blue-dark focus-within:outline-none">
                            <span>Upload a file</span>
                            <input id={`file-upload-${label}`} name={`file-upload-${label}`} type="file" className="sr-only" ref={fileInputRef} onChange={handleFileChange} accept={acceptedFileTypes} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">PDF, DOCX, JPG, PNG</p>
                </div>
            </div>
        </div>
    );
}