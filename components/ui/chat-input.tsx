import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  input, 
  handleInputChange, 
  handleSubmit 
}) => {
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-center space-x-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask a tax-related question..."
          className="
            flex-grow 
            px-4 
            py-3 
            border 
            border-blue-200 
            rounded-lg 
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-300 
            bg-blue-50
            text-gray-800
          "
        />
        <button 
          type="submit" 
          className="
            bg-blue-500 
            text-white 
            p-3 
            rounded-lg 
            hover:bg-blue-600 
            transition-colors
            flex 
            items-center 
            justify-center
          "
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};