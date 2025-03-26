# Tax Assistant Chatbot

## Project Overview
A Next.js-based AI-powered tax assistant chatbot designed to help users with tax-related inquiries, document uploads, and interactive guidance through individual tax return questions.

## Key Features
- Interactive AI-powered chat interface
- Document upload functionality
- Suggested follow-up questions
- Simulated tax document analysis
- Responsive design with Tailwind CSS

## Tech Stack
- Frontend Framework: Next.js (React)
- State Management: TanStack Query (React Query)
- Styling: Tailwind CSS
- AI Integration: Vercel AI SDK

## Prerequisites
- Node.js (v18 or later)
- npm or yarn

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/yourusername/tax-assistant-chatbot.git
cd tax-assistant-chatbot
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure
- `components/`: 
  - Reusable UI components
  - Chat interface elements
  - File preview and upload components
- `pages/`: Next.js page components
- `utils/`: 
  - Utility functions
  - Mock response generators
- `styles/`: Global CSS and Tailwind configuration

## Implementation Details
### Chat Interface
- Uses Vercel AI SDK's `useChat` hook
- Displays conversation in chat bubbles
- Supports text and file-based interactions

### File Upload
- Supports drag-and-drop file uploads
- Clipboard image paste functionality
- Simulated file analysis with mock responses

### Interaction Flow
1. User enters name
2. Chat interface becomes active
3. Users can:
   - Ask tax-related questions
   - Upload tax documents
   - Use suggested quick-reply questions

## Current Limitations
- Uses mock/simulated AI responses
- File upload is placeholder functionality
- No actual backend AI processing

## Simulated Capabilities
- Basic tax information Q&A
- Document upload simulation
- Suggested follow-up questions
- Placeholder tax insights dashboard

## Future Improvements
- Implement actual AI-powered backend
- Enhanced document analysis
- More comprehensive tax calculation logic
- Advanced error handling
- Integration with real tax calculation APIs
- Expand mock response sophistication
- Add more detailed tax insights
- Implement real-time document parsing

## Assumptions
- Focused on frontend implementation
- Mock responses simulate AI interaction
- UI/UX is primary demonstration point

## Development Notes
- Tailwind CSS used for responsive design
- Vercel AI SDK provides chat interface structure
- TanStack Query ready for future API integration

