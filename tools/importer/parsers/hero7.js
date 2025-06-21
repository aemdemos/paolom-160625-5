/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout div
  const grid = element.querySelector('.w-layout-grid');
  let img = null;
  let contentDiv = null;

  if (grid) {
    // Get direct children (image and text block)
    const children = Array.from(grid.children);
    img = children.find(el => el.tagName === 'IMG');
    contentDiv = children.find(el => el.tagName === 'DIV');
  }

  // Compose content cell (heading, subheading, CTAs)
  let contentCell = [];
  if (contentDiv) {
    // Gather all direct children in order (including text nodes)
    const nodes = [];
    for (const child of contentDiv.childNodes) {
      // Only collect nodes with content
      if (child.nodeType === Node.ELEMENT_NODE || (child.nodeType === Node.TEXT_NODE && child.textContent.trim() !== '')) {
        nodes.push(child);
      }
    }
    if (nodes.length > 0) {
      contentCell = nodes;
    }
  }

  // Compose the table according to the Hero block spec
  const tableCells = [
    ['Hero'],
    [img ? img : ''],
    [contentCell.length ? contentCell : '']
  ];

  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}
