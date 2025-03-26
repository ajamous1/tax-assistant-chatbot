# Tax Assistant Chatbot

## Project Overview
This is a Next.js-based tax assistant chatbot that allows users to interact with an AI to get tax-related information and upload tax documents.

## Tech Stack
- Frontend: Next.js (React)
- State Management: TanStack Query
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
- `components/`: Reusable UI components
- `pages/`: Next.js page components
- `utils/`: Utility functions and helpers
- `styles/`: Global CSS and Tailwind configuration

## Features
- Interactive tax assistant chat interface
- File upload for tax documents
- Suggested follow-up questions
- Simulated AI responses

## Limitations
- Current implementation uses mock responses
- File upload is simulated
- Actual AI integration would require backend API

## Future Improvements
- Implement actual AI-powered responses
- Add comprehensive document analysis
- Enhance tax calculation logic
- Improve error handling and validation