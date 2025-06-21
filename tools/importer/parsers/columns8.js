/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate ul children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > ul'));

  // Only proceed if there is at least one column
  if (columns.length === 0) {
    element.remove();
    return;
  }

  // Instead of using createTable (which makes n header cells), build the table manually to get 1 header spanning all
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns';
  th.colSpan = columns.length;
  headerRow.appendChild(th);
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  const row = document.createElement('tr');
  columns.forEach((col) => {
    const td = document.createElement('td');
    td.appendChild(col);
    row.appendChild(td);
  });
  tbody.appendChild(row);
  table.appendChild(tbody);

  element.replaceWith(table);
}
