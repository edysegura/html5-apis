import { set as idbSet, get as idbGet, keys as idbKeys }
  from 'https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval.mjs';

class App {

  constructor() {
    this.setupButton();
    this.listLocalStorageValues();
  }

  setupButton() {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.saveToStorage(form);
    });
  }

  saveToStorage(form) {
    const key = form.key.value;
    const value = form.value.value;
    if (key && value) {
      idbSet(key, value)
        .then(() => {
          this.listLocalStorageValues();
          form.reset();
        });
    }
  }

  async listLocalStorageValues() {
    const lsValues = document.getElementById('lsValues');

    const toHtml = async (key) => {
      const value = await idbGet(key);
      return `<p>${key}: ${value}</p>`;
    };

    const keys = await idbKeys();
    const htmlOutput = await Promise.all(keys.map(toHtml));

    lsValues.innerHTML = htmlOutput.join('');
  }
}

new App();
