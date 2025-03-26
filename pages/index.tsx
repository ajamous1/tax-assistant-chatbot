import React, { useState } from 'react';
import { useChat } from '@ai-sdk/react'
import { Send, Paperclip } from 'lucide-react';
import { TaxInsightsChart } from '../components/tax-insights-chart';

export default function TaxAssistantChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat'
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const suggestedQuestions = [
    'How do tax brackets work?', 
    'What are standard deductions?', 
    'How can I maximize my tax savings?'
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div 
            key={m.id} 
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`
                max-w-[80%] 
                px-4 py-2 
                rounded-2xl 
                ${m.role === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-800 border'}
              `}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t">
        {selectedFile && (
          <div className="mb-2 text-sm text-gray-600 flex items-center">
            <Paperclip className="mr-2 h-4 w-4" />
            {selectedFile.name}
          </div>
        )}

        <div className="flex items-center space-x-2">
          <label className="cursor-pointer">
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileUpload}
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <Paperclip className="text-gray-500 hover:text-gray-700" />
          </label>

          <form onSubmit={handleSubmit} className="flex-grow flex">
            <input 
              value={input}
              onChange={handleInputChange}
              placeholder="Send a message"
              className="
                flex-grow 
                px-3 
                py-2 
                rounded-l-xl 
                border 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-500
              "
            />
            <button 
              type="submit" 
              className="
                bg-blue-500 
                text-white 
                px-4 
                py-2 
                rounded-r-xl 
                hover:bg-blue-600
              "
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>

        <div className="mt-2 flex space-x-2 overflow-x-auto pb-2">
          {suggestedQuestions.map((question) => (
            <button
              key={question}
              onClick={() => {
                handleSubmit({
                  preventDefault: () => {},
                  currentTarget: { value: question }
                } as any);
              }}
              className="
                px-3 
                py-1 
                bg-gray-100 
                text-gray-700 
                rounded-full 
                text-sm 
                hover:bg-gray-200
              "
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {messages.length > 0 && (
        <div className="p-4">
          <TaxInsightsChart />
        </div>
      )}
    </div>
  );
}