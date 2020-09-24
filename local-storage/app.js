class App {

  constructor() {
    this.bindButtonListener();
    this.listLocalStorageValues();
  }

  bindButtonListener() {
    const button = document.querySelector('button');
    button.addEventListener('click', () => {
      this.saveToStorage();
    });
  }

  saveToStorage() {
    const keyInput = document.getElementById('key');
    const valueInput = document.getElementById('value');
    if (keyInput.value && valueInput.value) {
      localStorage.setItem(keyInput.value, valueInput.value);
      this.listLocalStorageValues();
      keyInput.value = valueInput.value = "";
    }
  }

  listLocalStorageValues() {
    const lsValues = document.getElementById('lsValues');

    const toHtml = (key) => {
      const value = localStorage.getItem(key);
      return `<p>${key}: ${value}</p>`;
    };

    const htmlOutput = Object.keys(localStorage)
      .map(toHtml)
      .join('');

    lsValues.innerHTML = htmlOutput;
  }
}

new App();
