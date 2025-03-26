import { Message } from 'ai';

const taxQuestionResponses: Record<string, string> = {
  'how do tax brackets work?': `Tax brackets are income ranges taxed at specific rates. As your income increases, you pay higher rates on portions of your income. For example, in 2025, if you're single:
  • 10% for income up to $11,600
  • 12% for income between $11,601 and $47,150
  • 22% for income between $47,151 and $100,525
  
  Importantly, you don't pay the highest rate on your entire income, only on the portion that falls within each bracket.`,

  'tell me about deductions': `Deductions reduce your taxable income. Common deductions include:
  • Standard deduction ($14,600 for single filers in 2025)
  • Mortgage interest
  • State and local taxes (up to $10,000)
  • Charitable contributions
  • Student loan interest
  • Retirement account contributions (e.g., 401(k), IRA)

  Choose between itemizing deductions or taking the standard deduction, whichever saves you more money.`,

  'how can i reduce my tax liability': `Strategies to reduce tax liability:
  1. Maximize retirement account contributions
  2. Use tax-advantaged accounts like HSA and 529 plans
  3. Harvest investment losses
  4. Claim all eligible credits and deductions
  5. Time your income and expenses strategically
  6. Consider consulting a tax professional for personalized advice`,

  'what are tax credits': `Tax credits directly reduce your tax bill. Some key credits:
  • Earned Income Tax Credit
  • Child Tax Credit
  • Education credits (American Opportunity, Lifetime Learning)
  • Retirement Savings Contributions Credit
  • Clean Energy Vehicle Credit

  Credits are more valuable than deductions because they reduce tax owed dollar-for-dollar.`
};

export function getMockTaxResponse(messages: Message[]): string {
  const lastMessage = messages[messages.length - 1];
  const userQuery = lastMessage.content.toLowerCase();

  // Find the closest matching response
  for (const [question, response] of Object.entries(taxQuestionResponses)) {
    if (userQuery.includes(question.toLowerCase())) {
      return response;
    }
  }

  // Default response for non-matched queries
  return `Thank you for your tax-related inquiry. While I can provide general guidance, for specific tax advice, I recommend consulting a qualified tax professional who can review your unique financial situation.

Some tax topics I can help you with include:
• Tax brackets
• Deductions and credits
• Tax-saving strategies
• General tax information

Would you like to explore any of these areas?`;
}

export async function handleFileUpload(message: Message): Promise<Message> {
  // Simulate file upload processing
  return {
    id: Date.now().toString(),
    content: `I've analyzed the uploaded document. Here's a brief financial overview:
    • Total Income: $75,000
    • Potential Deductions: $12,500
    • Estimated Tax Liability: $11,200
    • Recommended Tax Strategies: Maximize retirement contributions, explore additional deductions

    Would you like a detailed breakdown of these insights?`,
    role: 'assistant'
  };
}