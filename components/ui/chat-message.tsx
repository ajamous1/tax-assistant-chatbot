import React from 'react';
import { Message } from 'ai';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`
      flex items-start space-x-3 mb-4 p-3 rounded-lg
      ${message.role === 'user' 
        ? 'bg-blue-50 border border-blue-100' 
        : 'bg-blue-100 border border-blue-200'}
    `}>
      <div className={`
        w-10 h-10 rounded-full flex items-center justify-center
        ${message.role === 'user' 
          ? 'bg-blue-200 text-blue-800' 
          : 'bg-blue-300 text-blue-900'}
      `}>
        {message.role === 'user' ? 'You' : 'AI'}
      </div>
      <div className="flex-grow">
        <p className="text-gray-800">{message.content}</p>
      </div>
    </div>
  );
};