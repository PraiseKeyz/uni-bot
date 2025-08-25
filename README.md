# UniBot - OAU Admission Assistant 🤖

A modern, AI-powered chatbot interface designed to help students navigate the admission process for Obafemi Awolowo University (OAU). Built with Next.js 15, TypeScript, and Tailwind CSS.

## ✨ Features

### 🎯 Core Functionality
- **AI-Powered Chat**: Intelligent responses to admission-related queries
- **Device Authentication**: Persistent chat history using unique device IDs
- **Real-time Communication**: Instant responses with loading states
- **Rich Message Formatting**: Beautiful, structured responses with markdown support

### 📱 Responsive Design
- **Mobile-First**: Full-screen chat experience on mobile devices
- **Tablet Optimized**: Perfect layout for tablet users
- **Desktop Friendly**: Centered layout with proper margins
- **Cross-Platform**: Works seamlessly across all devices

### 🎨 User Experience
- **Preloader**: Engaging loading animation on app start
- **Welcome Screen**: Friendly introduction with quick action buttons
- **Quick Questions**: Pre-defined common queries for easy access
- **Loading States**: Smooth animations and progress indicators
- **Error Handling**: Graceful error recovery with user-friendly messages

### 🔧 Technical Features
- **TypeScript**: Full type safety and better development experience
- **Modern React**: Built with React 18 and Next.js 15 App Router
- **Tailwind CSS**: Utility-first styling for consistent design
- **Local Storage**: Persistent device authentication
- **API Integration**: Seamless backend communication

## 🏗️ Architecture

### Frontend Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useEffect, useRef)
- **Build Tool**: Next.js built-in bundler

### Backend Integration
- **API Endpoint**: `https://unibot-model.onrender.com`
- **Authentication**: Device-based with UUID v4
- **Chat History**: Persistent conversation storage
- **Response Formatting**: Markdown-like syntax support

### Key Components
```
app/
├── components/
│   ├── ChatInterface.tsx    # Main chat interface
│   ├── Message.tsx          # Individual message component
│   ├── Preloader.tsx        # Loading animation
│   └── WelcomeMessage.tsx   # Welcome screen
├── utils/
│   ├── auth.ts              # Device authentication
│   └── formatResponse.tsx   # Message formatting
├── types/
│   └── chat.ts              # TypeScript interfaces
└── page.tsx                 # Main application entry
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd uni-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📖 Usage Guide

### For Students
1. **Start the Application**: Open the app in your browser
2. **Welcome Screen**: Read the introduction and click "Start Chatting"
3. **Ask Questions**: Type your admission-related questions
4. **Quick Questions**: Use the suggested questions for common topics
5. **Chat History**: Your conversations are automatically saved

### Common Questions You Can Ask
- "What are the admission requirements for Medicine?"
- "How do I apply for OAU?"
- "What courses are available?"
- "Tell me about campus life"
- "Are there scholarships available?"
- "What's the UTME cut-off mark?"

## 🔧 Configuration

### Environment Variables

The application uses environment variables for configuration. Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp env.example .env.local
```

#### Available Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://unibot-model.onrender.com

# Development API URL (uncomment for local development)
# NEXT_PUBLIC_API_URL=http://localhost:3000

# Other Configuration
NEXT_PUBLIC_APP_NAME=UniBot
NEXT_PUBLIC_APP_DESCRIPTION=OAU Admission Assistant
```

**Important Notes:**
- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- `.env.local` is automatically ignored by Git
- For production, set environment variables in your hosting platform

### Customization
- **Colors**: Update the color scheme in Tailwind config
- **API Endpoint**: Modify the `API_URL` in `ChatInterface.tsx`
- **Styling**: Customize components using Tailwind classes

## 🎨 Design System

### Color Palette
- **Primary**: `#2e2e4c` (Deep Blue-Gray)
- **Background**: `#f8f9fa` (Light Gray)
- **Accent**: `#b8b9c5` (Muted Blue-Gray)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Yellow)
- **Error**: `#ef4444` (Red)

### Typography
- **Headings**: Inter font family
- **Body**: System font stack
- **Code**: Monospace font

### Spacing
- **Mobile**: Compact spacing for full-screen experience
- **Tablet**: Balanced spacing for optimal readability
- **Desktop**: Generous spacing with proper margins

## 🔒 Security & Privacy

### Device Authentication
- **Unique IDs**: Each device gets a unique UUID v4 identifier
- **Local Storage**: Device IDs are stored locally, not on servers
- **No Personal Data**: No personal information is collected or stored

### Data Handling
- **Chat History**: Stored securely on backend servers
- **No Tracking**: No analytics or tracking scripts
- **Privacy First**: Minimal data collection approach

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Configure build settings similarly
- **AWS Amplify**: Use Next.js preset
- **Self-hosted**: Build and serve static files

## 🐛 Troubleshooting

### Common Issues

**Chat history not loading**
- Check internet connection
- Clear browser cache and reload
- Verify API endpoint is accessible

**Messages not sending**
- Ensure backend service is running
- Check browser console for errors
- Verify device ID is generated

**Styling issues**
- Clear browser cache
- Check Tailwind CSS is properly loaded
- Verify responsive breakpoints

### Development Tips
- Use browser dev tools to inspect network requests
- Check console for any error messages
- Test on different devices for responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OAU**: For providing admission information
- **Next.js Team**: For the amazing framework
- **Tailwind CSS**: For the utility-first CSS framework
- **React Team**: For the powerful UI library

## 📞 Support

For support, please contact:
- **Email**: [support@unibot.com](mailto:support@unibot.com)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)

---

**Made with ❤️ for OAU students**
