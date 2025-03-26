import React, { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileSelect(file);
    setFileName(file ? file.name : null);
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
        className="
          w-full 
          flex items-center justify-center 
          bg-blue-50 
          border border-blue-200 
          text-blue-700 
          p-3 
          rounded-lg 
          hover:bg-blue-100 
          transition-colors
          group
        "
      >
        <UploadCloud className="mr-2 text-blue-500 group-hover:text-blue-600" />
        {fileName 
          ? `Selected: ${fileName}` 
          : 'Upload Tax Document'}
      </button>
    </div>
  );
};