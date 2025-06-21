/* global WebImporter */
export default function parse(element, { document }) {
  // Find all card elements in the grid
  const cards = element.querySelectorAll('.card');
  // Initialize the table cells with the required header
  const cells = [['Cards']];
  // For each card, assemble the card content
  cards.forEach((card) => {
    const cardBody = card.querySelector('.card-body');
    if (!cardBody) {
      // If for some reason we have a card without content, skip
      return;
    }
    // Compose the cell content
    const content = [];
    // The avatar/name/company row
    const headerRow = cardBody.querySelector('.flex-horizontal');
    if (headerRow) {
      content.push(headerRow);
    }
    // The testimonial/main text
    // Assume there is only one p with the content
    const mainText = cardBody.querySelector('p');
    if (mainText) {
      content.push(mainText);
    }
    // Only push if there is actual content
    if (content.length > 0) {
      cells.push([content]);
    }
  });
  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
