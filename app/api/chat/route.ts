import { NextRequest, NextResponse } from 'next/server';
import { ChatRequest, ChatResponse } from '../../types/chat';

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message, 
      // conversationHistory 

    } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // TODO: Integrate with your LLM provider (Gemini, OpenAI, etc.)
    // This is a placeholder response - replace with actual API call
    
    // Example integration structure:
    // const response = await fetch('YOUR_LLM_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.LLM_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     messages: [
    //       {
    //         role: 'system',
    //         content: 'You are UniBot, a helpful AI assistant that helps students navigate admission to Obafemi Awolowo University (OAU). Provide accurate, helpful information about admission requirements, application processes, courses, campus life, and other OAU-related topics. Be friendly, encouraging, and informative.'
    //       },
    //       ...conversationHistory.map(msg => ({
    //         role: msg.role,
    //         content: msg.content
    //       })),
    //       {
    //         role: 'user',
    //         content: message
    //       }
    //     ]
    //   })
    // });

    // For now, return a mock response
    const mockResponse = generateMockResponse(message);
    
    const response: ChatResponse = {
      response: mockResponse
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Mock response generator - remove this when integrating with actual LLM
function generateMockResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('medicine') || lowerMessage.includes('medical')) {
    return "For Medicine at OAU, you'll need excellent grades in Biology, Chemistry, Physics, and English. The UTME cutoff mark is typically 200+, and you'll need to pass the Post-UTME screening. The course duration is 6 years. Would you like to know more about the application process or other requirements?";
  }
  
  if (lowerMessage.includes('apply') || lowerMessage.includes('application')) {
    return "To apply to OAU, you need to: 1) Register for UTME through JAMB, 2) Choose OAU as your first choice, 3) Meet the cutoff mark, 4) Register for Post-UTME screening, 5) Submit required documents. The application portal usually opens in March-April. Do you need help with any specific step?";
  }
  
  if (lowerMessage.includes('course') || lowerMessage.includes('program')) {
    return "OAU offers a wide range of courses across faculties including Arts, Sciences, Engineering, Law, Medicine, Agriculture, and more. Popular programs include Medicine, Law, Engineering, Computer Science, and Business Administration. What specific field interests you?";
  }
  
  if (lowerMessage.includes('campus') || lowerMessage.includes('life')) {
    return "OAU has a vibrant campus life! The university is located in Ile-Ife, Osun State, known for its beautiful campus with modern facilities. There are numerous student clubs, sports facilities, libraries, and cultural activities. The campus is safe and student-friendly. Would you like to know about accommodation options?";
  }
  
  if (lowerMessage.includes('scholarship') || lowerMessage.includes('financial')) {
    return "OAU offers various scholarships and financial aid options including merit-based scholarships, need-based grants, and external funding opportunities. There are also government scholarships like the Federal Government Scholarship Scheme. The financial aid office can help you explore all available options.";
  }
  
  if (lowerMessage.includes('requirement') || lowerMessage.includes('cutoff')) {
    return "Admission requirements vary by course, but generally include: 5 credits in relevant subjects (including English and Math), minimum UTME score (varies by course), and passing the Post-UTME screening. Some competitive courses like Medicine have higher requirements. What course are you interested in?";
  }
  
  return "Thank you for your question! I'm here to help you with any information about OAU admission, courses, campus life, or application processes. Could you please be more specific about what you'd like to know?";
}
