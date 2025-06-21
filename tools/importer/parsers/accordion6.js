/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row using the block name exactly as required
  const cells = [['Accordion']];

  // Get all immediate child accordions (handle multiple accordion items)
  const accordionItems = element.querySelectorAll(':scope > .accordion.w-dropdown');

  accordionItems.forEach((item) => {
    // Title: find .w-dropdown-toggle then its .paragraph-lg (if present)
    let titleCell = '';
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      const paragraph = toggle.querySelector('.paragraph-lg');
      titleCell = paragraph || '';
    }
    // Content: find .accordion-content.w-dropdown-list then its .utility-padding-all-1rem.utility-padding-horizontal-0
    let contentCell = '';
    const nav = item.querySelector('.accordion-content.w-dropdown-list');
    if (nav) {
      // Look for the inner content wrapper
      const contentWrapper = nav.querySelector('.utility-padding-all-1rem.utility-padding-horizontal-0');
      if (contentWrapper) {
        contentCell = contentWrapper;
      } else {
        // Fallback to using nav itself
        contentCell = nav;
      }
    }
    cells.push([titleCell, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
