import React, { useRef } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileSelect(file);
  };

  return (
    <div className="file-upload mb-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full bg-gray-200 p-2 rounded hover:bg-gray-300"
      >
        Upload Tax Document
      </button>
    </div>
  );
};