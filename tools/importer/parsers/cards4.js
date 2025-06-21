/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the table with header row
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Find all cards (direct <a> children)
  const cards = element.querySelectorAll(':scope > a.utility-link-content-block');

  cards.forEach(card => {
    // Image: first .utility-aspect-1x1 img
    let img = null;
    const imgWrapper = card.querySelector('.utility-aspect-1x1');
    if (imgWrapper) {
      img = imgWrapper.querySelector('img');
    }

    // Tag (optional)
    let tagText = '';
    const tagDiv = card.querySelector('.tag-group');
    if (tagDiv) tagText = tagDiv.textContent.trim();
    // Heading (required)
    const heading = card.querySelector('h3, .h4-heading');
    // Description (optional)
    const desc = card.querySelector('p');

    // Compose content for text cell
    const textContent = [];
    // Tag (if present)
    if (tagText) {
      const tagElem = document.createElement('div');
      tagElem.textContent = tagText;
      tagElem.className = 'cards4-tag';
      textContent.push(tagElem);
    }
    // Heading (if present)
    if (heading) {
      // Use the original heading element to preserve semantics
      textContent.push(heading);
    }
    // Description (if present)
    if (desc) {
      textContent.push(desc);
    }
    rows.push([
      img,
      textContent
    ]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
