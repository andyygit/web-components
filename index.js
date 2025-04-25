import { Table } from './components/Table.js';

customElements.define('my-table', Table);

document.addEventListener('DOMContentLoaded', () => {
  const table = document.createElement('my-table');
  table.setAttribute('data-url', 'https://jsonplaceholder.typicode.com/todos');
  document.body.appendChild(table);
});
