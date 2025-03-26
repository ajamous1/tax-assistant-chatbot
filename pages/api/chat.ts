import { NextApiRequest, NextApiResponse } from 'next';

const MOCK_RESPONSES = [
  "For W-2 forms, you'll need to report all income from your employer.",
  "Tax brackets determine the percentage of tax you pay based on your income level.",
  "Standard deductions reduce your taxable income. For 2023, it's $13,850 for single filers.",
  "To maximize deductions, consider itemizing if your deductions exceed the standard deduction."
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Simulate a random AI response
    const mockResponse = 
      MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];

    return res.status(200).json({
      id: Date.now().toString(),
      content: mockResponse,
      role: 'assistant'
    });
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}