import React from 'react';
import { X, FileText, FileImage } from 'lucide-react';

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove }) => {
  const renderFileIcon = () => {
    const fileType = file.type.split('/')[0];
    switch (fileType) {
      case 'image':
        return <FileImage className="text-blue-500" />;
      case 'application':
        return <FileText className="text-blue-500" />;
      default:
        return <FileText className="text-blue-500" />;
    }
  };

  const renderPreview = () => {
    const fileType = file.type.split('/')[0];
    if (fileType === 'image') {
      return (
        <img 
          src={URL.createObjectURL(file)} 
          alt="File preview" 
          className="max-h-32 max-w-full object-cover rounded-lg"
        />
      );
    }
    return null;
  };

  return (
    <div className="p-4 bg-blue-50 border-t flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        {renderFileIcon()}
        <span className="text-sm text-gray-700">{file.name}</span>
      </div>
      
      {renderPreview()}
      
      <button 
        onClick={onRemove} 
        className="ml-auto bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default FilePreview;