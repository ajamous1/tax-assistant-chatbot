export function getMockTaxResponse(messages: any[]) {
    const lastMessage = messages[messages.length - 1].content;
    
    const responses: {[key: string]: string} = {
      'W-2': 'A W-2 form is an annual wage and tax statement that employers provide to employees, reporting total wages earned and taxes withheld.',
      'standard deduction': 'The standard deduction is a fixed amount that reduces the income on which you are taxed, varying based on filing status and age.',
      // Add more mock responses
    };
  
    return responses[lastMessage] || 'I can help you with tax-related questions. What would you like to know?';
  }
  
  export async function handleFileUpload(file: File) {
    // Simulate file upload processing
    return {
      status: 'success',
      message: `File ${file.name} uploaded successfully. I detected it as a W-2 form.`
    };
  }