export class Table extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.jsonResponse = null;
    this.error = null;
  }
  async connectedCallback() {
    this.shadowRoot.innerHTML = 'Fetching data...';
    const dataSourceUrl = this.dataset.url.trim();
    await this.fetchData(dataSourceUrl);
    if (this.error) {
      this.shadowRoot.innerHTML = '';
      this.shadowRoot.innerHTML = this.error;
    } else {
      this.shadowRoot.innerHTML = '';
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/components/Table.css">
        <table>
          <thead><tr></tr></thead>
          <tbody></tbody>
        </table>
      `;
      Object.keys(this.jsonResponse[0]).map((key) => {
        const cell = document.createElement('th');
        cell.innerText = key;
        this.shadowRoot.querySelector('thead tr').append(cell);
      });
      this.shadowRoot.querySelector('tbody').append(...this.setData(this.jsonResponse));
    }
  }

  async fetchData(url) {
    try {
      let response = await fetch(url);
      if (!response.ok) {
        this.error = `Api Error: ${response.status}`;
      }
      this.jsonResponse = await response.json();
    } catch (e) {
      this.error = `Something happened after fetch: ${e}`;
    }
  }

  /**
   * @param data {Object[]}
   */
  setData(data) {
    const rows = data.map((rowData) => {
      const row = document.createElement('tr');
      const cells = Object.values(rowData).map((cellData) => {
        const cell = document.createElement('td');
        cell.innerText = cellData;
        return cell;
      });
      row.append(...cells);
      return row;
    });
    // console.log(rows);
    return rows;
  }
}
