import { useState } from 'react';
import { useChat } from '@ai-sdk/react'
import { TaxInsightsChart } from '../components/tax-insights-chart';
import { FileUpload } from '../components/ui/file-upload';
import { ChatMessage } from '../components/ui/chat-message';

export default function TaxAssistantChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const suggestedQuestions = [
    'What is a W-2?',
    'How do tax brackets work?',
    'Tell me about standard deductions'
  ];

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-tax-primary">
          Tax Assistant Chatbot
        </h1>
        
        <div className="chat-messages mb-4 h-96 overflow-y-auto">
          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} />
          ))}
        </div>

        <FileUpload onFileSelect={setSelectedFile} />

        <form onSubmit={handleSubmit} className="mt-4">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask a tax question..."
            className="w-full p-2 border rounded"
          />
          <button 
            type="submit" 
            className="mt-2 w-full bg-tax-secondary text-white p-2 rounded"
          >
            Send
          </button>
        </form>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Suggested Questions:</h3>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <button 
                key={q} 
                onClick={() => handleSubmit({ preventDefault: () => {}, currentTarget: { value: q } } as any)}
                className="bg-gray-200 px-3 py-1 rounded text-sm"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <TaxInsightsChart />
      </div>
    </div>
  );
}