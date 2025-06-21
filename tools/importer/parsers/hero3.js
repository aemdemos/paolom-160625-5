/* global WebImporter */
export default function parse(element, { document }) {
  // Find grid columns
  const grid = element.querySelector('.w-layout-grid');
  const gridChildren = grid ? Array.from(grid.children) : [];
  // Variables for main content and aside (tags)
  let mainCol = null;
  let asideCol = null;
  gridChildren.forEach(col => {
    if (!mainCol && col.querySelector('.h1-heading')) mainCol = col;
    if (!asideCol && col.querySelector('.eyebrow')) asideCol = col;
  });
  // Content for the last row
  const content = [];
  if (mainCol) {
    // Heading
    const heading = mainCol.querySelector('.h1-heading');
    if (heading) content.push(heading);
    // Paragraphs
    const rich = mainCol.querySelector('.w-richtext');
    if (rich) Array.from(rich.children).forEach(child => content.push(child));
  }
  if (asideCol) {
    // Insert a blank line between columns if both exist
    if (mainCol) content.push(document.createElement('br'));
    // Eyebrow heading
    const eyebrow = asideCol.querySelector('.eyebrow');
    if (eyebrow) content.push(eyebrow);
    // Tags
    const tags = asideCol.querySelectorAll('.tag');
    if (tags.length) {
      // Use a container div to maintain structure
      const tagsContainer = document.createElement('div');
      tags.forEach(tag => {
        // Use the tag (it contains a <div>)
        tagsContainer.append(tag);
      });
      content.push(tagsContainer);
    }
  }
  // Table structure: 1 column x 3 rows (header, bg, content)
  const cells = [
    ['Hero'],
    [''], // No background image in this HTML
    [content]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
