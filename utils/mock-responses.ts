export function getMockTaxResponse(messages: any[]) {
    const lastUserMessage = messages[messages.length - 1].content;
  
    const taxResponses: { [key: string]: string } = {
      'what is a w-2': 'A W-2 form is a wage and tax statement that employers provide to employees, reporting annual salary and the amount of taxes withheld from their paycheck.',
      'standard deduction': 'The standard deduction is a fixed amount that reduces the income you arere taxed on. For 2023, it is $13,850 for single filers and $27,700 for married couples filing jointly.',
      'tax brackets': 'Tax brackets determine the percentage of your income you will pay in federal income tax. The U.S. uses a progressive tax system where different portions of your income are taxed at different rates.',
      'filing status': 'Filing status determines your standard deduction, tax rates, and eligibility for certain credits. The main statuses are Single, Married Filing Jointly, Married Filing Separately, and Head of Household.',
      'default': 'I can help you with general tax-related questions. Ask me about W-2 forms, deductions, tax brackets, or filing status.'
    };
  
    // Find the most relevant response, fallback to default
    const response = Object.entries(taxResponses).find(([key]) => 
      lastUserMessage.toLowerCase().includes(key)
    )?.[1] || taxResponses['default'];
  
    return response;
  }
  
  export async function handleFileUpload(file: any) {
    // Simulate file upload processing
    return {
      content: `Uploaded document: ${file.name}. Simulating document analysis...`,
      role: 'assistant'
    };
  }