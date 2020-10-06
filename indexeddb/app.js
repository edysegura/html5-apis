import { set as idbSet, get as idbGet, keys as idbKeys }
  from 'https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval.mjs';

class App {

  constructor() {
    this.setupButton();
    this.listLocalStorageValues();
  }

  setupButton() {
    const button = document.querySelector('button');
    button.addEventListener('click', () => {
      this.saveToStorage();
    });
  }

  saveToStorage() {
    const keyInput = document.getElementById('key');
    const valueInput = document.getElementById('value');
    if (keyInput.value && valueInput.value) {
      idbSet(keyInput.value, valueInput.value)
        .then(() => {
          this.listLocalStorageValues();
          keyInput.value = valueInput.value = "";
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
