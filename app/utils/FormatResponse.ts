/**
 * Utility function to format a response string into styled HTML with Tailwind CSS.
 * Handles markdown-like formatting (bold, lists, paragraphs) and sources.
 * @param {string} responseText - The raw response text to format.
 * @returns {string} - Formatted HTML string.
 */
 function FormatResponse(responseText: string) {
    // Split the text into paragraphs (double newlines)
    const paragraphs = responseText.split('\n\n').filter((line: string)  => line.trim());
  
    // Process each paragraph
    const formattedParagraphs = paragraphs.map((paragraph: string)   => {
      // Handle bold text (e.g., *text* -> <strong>text</strong>)
      paragraph = paragraph.replace(/\*([^*]+)\*/g, '<strong class="font-bold">$1</strong>');
  
      // Check if the paragraph is a numbered list (e.g., "1. Item")
      if (/^\d+\.\s/.test(paragraph)) {
        const lines = paragraph.split('\n').filter((line: string) => line.trim());
        const listItems = lines.map((line: string) => {
          // Remove the number (e.g., "1. ") and format
          const content = line.replace(/^\d+\.\s/, '').trim();
          // Handle sources (e.g., "(Source: Dataset.pdf - Relevance: 64.2%)")
          const sourceMatch = content.match(/(\(Source:[^\)]+\))/);
          let formattedContent = content;
          if (sourceMatch) {
            formattedContent = content.replace(
              sourceMatch[0],
              `<span class="text-sm text-gray-500 italic">${sourceMatch[0]}</span>`
            );
          }
          return `<li class="ml-6">${formattedContent}</li>`;
        });
        return `<ol class="list-decimal list-outside ml-4 mb-4">${listItems.join('')}</ol>`;
      }
  
      // Check if the paragraph is a bullet list (e.g., "* Item")
      if (paragraph.startsWith('* ')) {
        const lines = paragraph.split('\n').filter((line: string) => line.trim());
        const listItems = lines.map((line: string) => {
          // Remove the bullet (e.g., "* ") and format
          const content = line.replace(/^\*\s/, '').trim();
          // Handle sources
          const sourceMatch = content.match(/(\(Source:[^\)]+\))/);
          let formattedContent = content;
          if (sourceMatch) {
            formattedContent = content.replace(
              sourceMatch[0],
              `<span class="text-sm text-gray-500 italic">${sourceMatch[0]}</span>`
            );
          }
          return `<li class="ml-6">${formattedContent}</li>`;
        });
        return `<ul class="list-disc list-outside ml-4 mb-4">${listItems.join('')}</ul>`;
      }
  
      // Handle headings (lines starting with text followed by colon, e.g., "General Academic Requirements:")
      if (/^[A-Za-z\s]+\:/.test(paragraph)) {
        const headingMatch = paragraph.match(/^([A-Za-z\s]+)\:/);
        if (headingMatch) {
          const headingText = headingMatch[1].trim();
          const content = paragraph.replace(/^[A-Za-z\s]+\:/, '').trim();
          // Handle sources in the content
          const sourceMatch = content.match(/(\(Source:[^\)]+\))/);
          let formattedContent = content;
          if (sourceMatch) {
            formattedContent = content.replace(
              sourceMatch[0],
              `<span class="text-sm text-gray-500 italic">${sourceMatch[0]}</span>`
            );
          }
          return `
            <h3 class="text-lg font-semibold text-gray-800 mt-4 mb-2">${headingText}</h3>
            <p class="text-gray-700 mb-4">${formattedContent}</p>
          `;
        }
      }
  
      // Handle sources in regular paragraphs
      const sourceMatch = paragraph.match(/(\(Source:[^\)]+\))/);
      let formattedParagraph = paragraph;
      if (sourceMatch) {
        formattedParagraph = paragraph.replace(
          sourceMatch[0],
          `<span class="text-sm text-gray-500 italic">${sourceMatch[0]}</span>`
        );
      }
      return `<p class="text-gray-700 mb-4">${formattedParagraph}</p>`;
    });
  
    // Wrap everything in a container with Tailwind styles
    return `
      <div class="max-w-3xl mx-auto p-4 text-gray-700">
        ${formattedParagraphs.join('')}
      </div>
    `;
  }

    export default FormatResponse;