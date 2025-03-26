import { NextApiRequest, NextApiResponse } from 'next';
import { getMockTaxResponse, handleFileUpload } from '../../utils/mock-responses';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { messages, data } = req.body;
    
    // Simulate file upload handling
    if (data?.file) {
      const fileResponse = await handleFileUpload(data.file);
      return res.status(200).json(fileResponse);
    }

    // Simulate AI response generation
    const mockResponse = getMockTaxResponse(messages);
    
    return res.status(200).json({
      id: Date.now().toString(),
      content: mockResponse,
      role: 'assistant'
    });
  }

  // Handle other HTTP methods
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}