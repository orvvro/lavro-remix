/**
 * Converts markdown-style bold text (**text**) to HTML <span> elements
 * @param text The input text that may contain **bold** markdown
 * @returns Text with markdown converted to HTML spans with "bold" class
 */
export function formatText(text: any): React.ReactNode {
  if (!text || typeof text !== "string") {
    return text;
  }

  // Convert the text to HTML with bold spans and preserved spaces
  const htmlContent = text
    // Replace spaces with &#32;
    .replace(/ /g, "&#32;")
    // Replace bold markers with spans
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Return the processed HTML
  return <span dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
