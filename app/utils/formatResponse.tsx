import React from 'react';

// Response Formatting Utility
// Formats plain text responses into well-structured, readable content

export interface FormattedResponse {
  content: string;
  hasFormatting: boolean;
}

export const formatResponse = (responseText: string): FormattedResponse => {
  if (!responseText || typeof responseText !== 'string') {
    return { content: responseText, hasFormatting: false };
  }

  let formattedText = responseText;

  // Handle bold text (**text** or *text*) - do this first
  formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formattedText = formattedText.replace(/\*(.*?)\*/g, '<strong>$1</strong>');

  // Handle italic text (_text_)
  formattedText = formattedText.replace(/_(.*?)_/g, '<em>$1</em>');

  // Handle code snippets (text in backticks)
  formattedText = formattedText.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>');

  // Handle important notes or warnings - do this before paragraph processing
  formattedText = formattedText.replace(
    /<strong>Note:<\/strong>(.*?)(?=\n\n|\n$|$)/gi,
    '<div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-4"><p class="text-blue-800"><strong>Note:</strong>$1</p></div>'
  );

  formattedText = formattedText.replace(
    /<strong>Important:<\/strong>(.*?)(?=\n\n|\n$|$)/gi,
    '<div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4"><p class="text-yellow-800"><strong>Important:</strong>$1</p></div>'
  );

  formattedText = formattedText.replace(
    /<strong>Warning:<\/strong>(.*?)(?=\n\n|\n$|$)/gi,
    '<div class="bg-red-50 border-l-4 border-red-400 p-4 my-4"><p class="text-red-800"><strong>Warning:</strong>$1</p></div>'
  );

  // Split into paragraphs and process each one
  const paragraphs = formattedText.split(/\n\n+/);
  const processedParagraphs = paragraphs.map(paragraph => {
    const trimmedParagraph = paragraph.trim();
    if (!trimmedParagraph) return '';

    // Handle numbered lists
    if (/^\d+\.\s/.test(trimmedParagraph)) {
      const lines = trimmedParagraph.split('\n').filter(line => line.trim());
      const listItems = lines.map(line => {
        const content = line.replace(/^\d+\.\s/, '').trim();
        return `<li class="mb-1">${content}</li>`;
      }).join('');
      return `<ol class="list-decimal list-inside space-y-1 mb-4">${listItems}</ol>`;
    }

    // Handle bullet lists
    if (/^[*\-]\s/.test(trimmedParagraph)) {
      const lines = trimmedParagraph.split('\n').filter(line => line.trim());
      const listItems = lines.map(line => {
        const content = line.replace(/^[*\-]\s/, '').trim();
        return `<li class="mb-1">${content}</li>`;
      }).join('');
      return `<ul class="list-disc list-inside space-y-1 mb-4">${listItems}</ul>`;
    }

    // Handle headings (lines ending with colon)
    if (/<strong>([^:]+):<\/strong>$/.test(trimmedParagraph)) {
      const headingMatch = trimmedParagraph.match(/<strong>([^:]+):<\/strong>/);
      if (headingMatch) {
        return `<h3 class="text-lg font-semibold text-gray-800 mt-6 mb-3">${headingMatch[1]}</h3>`;
      }
    }

    // Handle subheadings (lines with colon but not bold)
    if (/^[^<].*:$/.test(trimmedParagraph)) {
      const headingText = trimmedParagraph.replace(/:$/, '');
      return `<h4 class="text-base font-medium text-gray-700 mt-4 mb-2">${headingText}</h4>`;
    }

    // Regular paragraph - handle single newlines as <br>
    const paragraphWithBreaks = trimmedParagraph.replace(/\n/g, '<br>');
    return `<p class="mb-3">${paragraphWithBreaks}</p>`;
  });

  // Join paragraphs and clean up
  formattedText = processedParagraphs.filter(p => p).join('\n');

  // Clean up empty paragraphs and extra spacing
  formattedText = formattedText.replace(/<p class="mb-3"><\/p>/g, '');
  formattedText = formattedText.replace(/<p class="mb-3"><br><\/p>/g, '');

  // Check if any formatting was applied
  const hasFormatting = formattedText !== responseText || 
    formattedText.includes('<strong>') || 
    formattedText.includes('<em>') || 
    formattedText.includes('<ul>') || 
    formattedText.includes('<ol>') || 
    formattedText.includes('<h3>') || 
    formattedText.includes('<h4>') ||
    formattedText.includes('<code>') ||
    formattedText.includes('bg-blue-50') ||
    formattedText.includes('bg-yellow-50') ||
    formattedText.includes('bg-red-50');

  return {
    content: formattedText,
    hasFormatting
  };
};

// Helper function to create a formatted message component
export const createFormattedMessage = (text: string): React.ReactElement => {
  const { content, hasFormatting } = formatResponse(text);
  
  if (hasFormatting) {
    return (
      <div 
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }
  
  return <p className="text-sm md:text-base leading-relaxed">{text}</p>;
};

