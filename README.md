# UniBot - OAU Admission Assistant

UniBot is an AI-powered chatbot designed to help students navigate their way to admission at Obafemi Awolowo University (OAU). Built with Next.js 15, TypeScript, and Tailwind CSS, it provides an intuitive interface for students to get information about admission requirements, application processes, courses, and campus life.

## Features

- 🤖 **Intelligent Chat Interface**: Clean, modern chat UI with real-time messaging
- 🎯 **Quick Options**: Pre-defined question categories for common inquiries
- 💬 **Conversation History**: Maintains context throughout the chat session
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- ⚡ **Fast Performance**: Built with Next.js 15 for optimal performance

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Project Structure

```
app/
├── components/
│   ├── ChatInterface.tsx    # Main chat interface component
│   ├── Message.tsx          # Individual message component
│   └── WelcomeMessage.tsx   # Welcome screen with quick options
├── types/
│   └── chat.ts             # TypeScript type definitions
├── api/
│   └── chat/
│       └── route.ts        # API endpoint for chat functionality
├── layout.tsx              # Root layout component
├── page.tsx                # Main page component
└── globals.css             # Global styles
```

## LLM Integration

The chatbot is currently set up with mock responses but is designed for easy integration with LLM providers like:

### Gemini Integration
```typescript
// In app/api/chat/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const result = await model.generateContent([
  {
    role: 'user',
    parts: [{ text: message }]
  }
]);
```

### OpenAI Integration
```typescript
// In app/api/chat/route.ts
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are UniBot, a helpful AI assistant for OAU admission...'
      },
      ...conversationHistory,
      { role: 'user', content: message }
    ]
  })
});
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# For Gemini
GEMINI_API_KEY=your_gemini_api_key_here

# For OpenAI
OPENAI_API_KEY=your_openai_api_key_here

# For other LLM providers
LLM_API_KEY=your_api_key_here
LLM_API_ENDPOINT=your_api_endpoint_here
```

## Customization

### Adding New Quick Options
Edit `app/components/WelcomeMessage.tsx` to add new quick option categories:

```typescript
const quickOptions = [
  // ... existing options
  {
    id: 'new-category',
    title: '🆕 New Category',
    description: 'Description of the new category'
  }
];
```

### Modifying Chat Responses
Update the mock response logic in `app/api/chat/route.ts` or integrate with your preferred LLM provider.

### Styling
The application uses Tailwind CSS. Modify the classes in the component files to customize the appearance.

## Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm start
   ```

3. **Deploy to your preferred platform** (Vercel, Netlify, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please open an issue in the repository or contact the development team.

---

Built with ❤️ for OAU students
