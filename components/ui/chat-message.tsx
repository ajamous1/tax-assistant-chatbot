import React from 'react';
import { Message } from 'ai';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`mb-4 p-3 rounded ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
      <strong>{message.role === 'user' ? 'You' : 'Tax Assistant'}: </strong>
      {message.content}
    </div>
  );
};