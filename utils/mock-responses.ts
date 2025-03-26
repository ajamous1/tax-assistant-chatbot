export function getMockTaxResponse(messages: any[]) {
    const lastUserMessage = messages[messages.length - 1].content.toLowerCase();
  
    const taxResponses: { [key: string]: string } = {
      'w-2': 'A W-2 form is a wage and tax statement that employers provide to employees, reporting annual salary and taxes withheld.',
      'standard deduction': 'The standard deduction reduces your taxable income. For 2023, it is $13,850 for single filers and $27,700 for married couples filing jointly.',
      'tax brackets': 'Tax brackets determine your federal income tax rate. The U.S. uses a progressive system where different income portions are taxed at different rates.',
      'filing status': 'Filing status affects your tax rates and deductions. Main statuses include Single, Married Filing Jointly, Married Filing Separately, and Head of Household.',
      'default': 'I can help with tax-related questions about W-2 forms, deductions, tax brackets, and filing status.'
    };
  
    // Find the most relevant response, fallback to default
    const response = Object.entries(taxResponses).find(([key]) => 
      lastUserMessage.includes(key)
    )?.[1] || taxResponses['default'];
  
    return response;
  }
  
  export async function handleFileUpload(message: any) {
    // Simulate file upload processing
    return {
      id: Date.now().toString(),
      content: `Document uploaded successfully. I can help you analyze your tax document.`,
      role: 'assistant'
    };
  }