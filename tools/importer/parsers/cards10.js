/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Locate the direct cards container (the grid with links)
  let cardsContainer = null;
  // Try common container classnames for Webflow grid blocks
  const gridContainers = element.querySelectorAll('.grid-layout, .w-layout-grid, .container');
  for (const grid of gridContainers) {
    // Find a grid containing direct children that are (or contain) anchor.card
    const anchors = grid.querySelectorAll(':scope > a.utility-link-content-block');
    if (anchors.length) {
      cardsContainer = grid;
      break;
    }
  }
  // Fallback: if not found, try any anchor in the element
  if (!cardsContainer) {
    cardsContainer = element.querySelector('.utility-link-content-block')?.parentElement || element;
  }
  // Step 2: Get all cards
  const cards = cardsContainer.querySelectorAll(':scope > a.utility-link-content-block');
  // Step 3: Build table rows
  const rows = [['Cards (cards10)']];
  cards.forEach(card => {
    // Image cell
    const imageDiv = card.querySelector('.utility-aspect-3x2');
    const img = imageDiv ? imageDiv.querySelector('img') : null;
    // Text cell: label, heading, description (all stacked)
    const textContent = [];
    // Label (small text above heading)
    const label = card.querySelector('.paragraph-sm.utility-margin-bottom-0-5rem');
    if (label && label.textContent.trim()) {
      textContent.push(label);
    }
    // Heading
    const heading = card.querySelector('h3, .h3-heading');
    if (heading && heading.textContent.trim()) {
      textContent.push(heading);
    }
    // Description
    const desc = card.querySelector('.paragraph-sm.utility-margin-bottom-0');
    if (desc && desc.textContent.trim()) {
      textContent.push(desc);
    }
    rows.push([
      img,
      textContent.length > 1 ? textContent : (textContent[0] || '')
    ]);
  });
  // Step 4: Create and replace with table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
