/* global WebImporter */
export default function parse(element, { document }) {
  // The example markdown contains a single table with header 'Embed' and all content in a single cell.
  // All text and structure from the source HTML should be included in that cell.
  // No markdown, no clones, no extra tables, no section metadata.
  // Reference all direct children (including text nodes) so all text is preserved.
  
  const cellContent = Array.from(element.childNodes);
  const cells = [
    ['Embed'],
    [cellContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
