import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { Message } from 'ai';
import { DollarSign, FileUp, Send, Loader2 } from 'lucide-react';
import { TaxInsightsDashboard } from '../components/tax-insights-dashboard';
import { FilePreview } from './file-preview';
import { getMockTaxResponse, handleFileUpload } from '../utils/mock-responses';

export default function TaxAssistantChat() {
  const [userName, setUserName] = useState('');
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showDashboard, setShowDashboard] = useState(false);

  const { 
    messages, 
    input, 
    handleInputChange, 
    setMessages,
    handleSubmit: originalHandleSubmit 
  } = useChat({
    api: '/api/chat',
    initialMessages: []
  });

  // Name entry handler
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setIsNameEntered(true);
    }
  };

  // File upload handlers
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // Paste file handler
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            const file = items[i].getAsFile();
            if (file) {
              handleFileSelect(file);
            }
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, []);

  // Suggested questions generator
  useEffect(() => {
    const questions = [
      'How do tax brackets work?',
      'Tell me about deductions',
      'How can I reduce my tax liability?',
      'What are tax credits?'
    ];
    setSuggestedQuestions(questions);
  }, []);

  // Custom submit handler to include file and username context
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Allow submission with input text OR selected file
    const shouldSubmit = input.trim() || selectedFile;
    if (!shouldSubmit) return;

    // Add user message if input exists
    const userMessage: Message | null = input.trim() 
      ? {
          id: Date.now().toString(),
          content: input,
          role: 'user' as const
        }
      : null;

    // Add file message if file is present
    const fileMessage: Message | null = selectedFile
      ? {
          id: Date.now().toString(),
          content: `File uploaded: ${selectedFile.name}`,
          role: 'data' as const
        }
      : null;

    // Simulate AI response
    const aiResponse: Message = {
      id: Date.now().toString(),
      content: getMockTaxResponse([
        ...(userMessage ? [userMessage] : []),
        ...(fileMessage ? [fileMessage] : [])
      ]),
      role: 'assistant' as const
    };

    // Update messages
    setMessages((prevMessages) => [
      ...prevMessages, 
      ...(userMessage ? [userMessage] : []),
      ...(fileMessage ? [fileMessage] : []),
      aiResponse
    ]);

    // Reset input and file
    handleInputChange({ 
      target: { value: '' } 
    } as React.ChangeEvent<HTMLInputElement>);
    setSelectedFile(null);

    // Show dashboard more contextually
    setShowDashboard(true);
  };

  // Handler for suggested questions
  const handleSuggestedQuestion = (question: string) => {
    // Directly submit the suggested question
    const syntheticEvent = {
      preventDefault: () => {},
      target: { value: question }
    } as unknown as React.FormEvent<HTMLFormElement>;

    // Set input and immediately submit
    handleInputChange({ 
      target: { value: question } 
    } as React.ChangeEvent<HTMLInputElement>);

    handleSubmit(syntheticEvent);
  };

  if (!isNameEntered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <DollarSign className="mx-auto mb-4 text-blue-500" size={48} />
          <h2 className="text-2xl font-bold mb-4 text-blue-800">
            Welcome to Tax Assistant
          </h2>
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Start Chat
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <div className="container mx-auto max-w-4xl px-4 py-8 flex-grow">
        <div className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col h-[90vh]">
          {/* Personalized Header */}
          <div className="px-6 py-8 bg-blue-50">
            <h2 className="text-3xl font-bold text-blue-800">
              Hi, {userName}, how can I help you today?
            </h2>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex items-start space-x-3 ${
                  message.role === 'user' 
                    ? 'justify-end' 
                    : 'justify-start'
                }`}
              >
                <div 
                  className={`
                    max-w-[70%] 
                    p-3 
                    rounded-lg 
                    ${
                      message.role === 'user' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-blue-200 text-blue-900'
                    }
                  `}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {/* File Upload and Preview */}
          {selectedFile && (
            <FilePreview 
              file={selectedFile} 
              onRemove={() => setSelectedFile(null)} 
            />
          )}

          {/* File Upload Area */}
          <div 
            className={`
              p-4 
              border-t 
              transition-all 
              duration-300 
              ${isDragging ? 'bg-blue-100 border-blue-300' : 'bg-white'}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
              accept="image/*,application/pdf"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center bg-blue-50 border border-blue-200 text-blue-700 p-3 rounded-lg hover:bg-blue-100"
            >
              <FileUp className="mr-2" />
              Upload Tax Document
            </button>
          </div>

          {/* Chat Input */}
          <form 
            onSubmit={handleSubmit} 
            className="p-4 bg-blue-50 border-t flex items-center space-x-2"
          >
            <input
              value={input}
              onChange={handleInputChange}
              placeholder={`Ask anything tax-related...`}
              className="flex-grow px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              disabled={!input.trim() && !selectedFile}
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </form>

          {/* Suggested Questions Section */}
          <div className="p-4 bg-blue-50 border-t flex space-x-2 overflow-x-auto">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                onClick={() => handleSuggestedQuestion(question)}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200"
              >
                {question}
              </button>
            ))}
          </div>

          {/* Conditional Dashboard Rendering */}
          {showDashboard && (
            <div className="mt-4">
              <TaxInsightsDashboard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}