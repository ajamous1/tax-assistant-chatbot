import { NextApiRequest, NextApiResponse } from 'next';
import { getMockTaxResponse, handleFileUpload } from '../../utils/mock-responses';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { messages } = req.body;
      const lastMessage = messages[messages.length - 1];

      let response;
      // Check if it's a file upload simulation
      if (lastMessage.content.includes('upload')) {
        response = await handleFileUpload(lastMessage);
      } else {
        // Generate a mock tax-related response
        const responseText = getMockTaxResponse(messages);
        
        response = {
          id: Date.now().toString(),
          content: responseText,
          role: 'assistant'
        };
      }

      return res.status(200).json(response);
    } catch (error) {
      console.error('API Error:', error);
      return res.status(500).json({ 
        error: 'Failed to process request',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}