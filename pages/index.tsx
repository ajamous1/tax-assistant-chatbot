import React, { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { motion, AnimatePresence } from 'motion/react';
import { TaxInsightsChart } from '../components/tax-insights-chart';
import { FileUpload } from '../components/ui/file-upload';
import { ChatMessage } from '../components/ui/chat-message';
import TaxIntelligenceEngine from '../utils/tax-helpers';

export default function TaxAssistantChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    // Enhanced API route configuration
    api: '/api/chat',
    onResponse: async (response) => {
      // Correct method to generate tax insight
      try {
        const insight = await TaxIntelligenceEngine.generateTaxInsight(response.toString());
        // Potential additional processing of the insight
        console.log(insight);
      } catch (error) {
        console.error('Failed to generate tax insight:', error);
      }
    }
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Enhanced suggested questions with more context
  const suggestedQuestions = [
    { 
      text: 'Understanding W-2 Forms', 
      complexity: 'beginner',
      icon: '📄'
    },
    { 
      text: 'Tax Bracket Explanation', 
      complexity: 'intermediate',
      icon: '💡'
    },
    { 
      text: 'Maximizing Deductions', 
      complexity: 'advanced',
      icon: '💰'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-white min-h-screen"
    >
      <div className="bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">
          Intelligent Tax Assistant
        </h1>
        
        <AnimatePresence>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ChatMessage message={m} />
            </motion.div>
          ))}
        </AnimatePresence>

        <FileUpload onFileSelect={setSelectedFile} />

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex space-x-2">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask a detailed tax question..."
              className="flex-grow p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </div>
        </form>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Suggested Explorations:</h3>
          <div className="flex flex-wrap gap-3">
            {suggestedQuestions.map((q) => (
              <button 
                key={q.text} 
                onClick={() => handleSubmit({ 
                  preventDefault: () => {}, 
                  currentTarget: { value: q.text } 
                } as any)}
                className={`
                  px-4 py-2 rounded-full 
                  ${q.complexity === 'beginner' ? 'bg-green-100 text-green-800' : 
                    q.complexity === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'}
                  flex items-center space-x-2
                  hover:scale-105 transition-transform
                `}
              >
                <span>{q.icon}</span>
                <span>{q.text}</span>
              </button>
            ))}
          </div>
        </div>

        <TaxInsightsChart />
      </div>
    </motion.div>
  );
}