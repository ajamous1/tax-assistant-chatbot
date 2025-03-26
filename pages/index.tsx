import React, { useState } from 'react';
import { useChat } from '@ai-sdk/react'
import { FileUpload } from '../components/ui/file-upload';
import { ChatMessage } from '../components/ui/chat-message';
import { TaxInsightsChart } from '../components/tax-insights-chart';

export default function TaxAssistantChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat'
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const suggestedQuestions = [
    'What is a W-2 form?', 
    'Explain standard deductions', 
    'How do tax brackets work?'
  ];

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    // TODO: Implement actual file upload logic
    if (file) {
      handleSubmit({
        preventDefault: () => {},
        currentTarget: { 
          value: `I want to upload a document: ${file.name}`
        }
      } as any);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow container mx-auto max-w-2xl px-4 py-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-[80vh]">
          {/* Chat Messages Area */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>

          {/* File Upload */}
          <div className="p-4 border-t">
            <FileUpload onFileSelect={handleFileSelect} />
          </div>

          {/* Chat Input */}
          <form 
            onSubmit={handleSubmit} 
            className="p-4 bg-gray-50 border-t flex items-center space-x-2"
          >
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask a tax-related question..."
              className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </form>

          {/* Suggested Questions */}
          <div className="p-4 bg-gray-50 border-t flex space-x-2 overflow-x-auto">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                onClick={() => {
                  handleSubmit({
                    preventDefault: () => {},
                    currentTarget: { value: question }
                  } as any);
                }}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Tax Insights Chart (optional) */}
        {messages.length > 0 && (
          <div className="mt-4">
            <TaxInsightsChart />
          </div>
        )}
      </div>
    </div>
  );
}