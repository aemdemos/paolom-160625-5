/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches the block name and variant as required
  const headerRow = ['Cards (cards2)'];
  const cells = [headerRow];

  // Each card is a direct child div.flex-vertical.x-center
  const cards = element.querySelectorAll(':scope > div.flex-vertical.x-center');

  cards.forEach((card) => {
    // First cell: icon SVG container ('.icon-container')
    const icon = card.querySelector('.icon-container');
    // Reference the icon container directly, or use null if not found
    const iconCell = icon || '';

    // Second cell: Title + Description (keep original nodes for structure)
    const contents = [];
    const heading = card.querySelector('h3, h2, h4, h5, h6');
    if (heading) contents.push(heading);
    // Look for all <p> siblings after heading
    let next = heading ? heading.nextElementSibling : null;
    while (next) {
      if (next.tagName && next.tagName.toLowerCase() === 'p') {
        contents.push(next);
      }
      next = next.nextElementSibling;
    }
    // In some cases, description might come before heading or heading may be missing
    if (contents.length === 0) {
      // fallback: push all <p> in this card
      card.querySelectorAll('p').forEach(p => contents.push(p));
    }
    // If content is empty, fallback to card's textContent
    let textCell = contents.length ? contents : card.textContent.trim();
    cells.push([iconCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
