const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  for (const key of data.values()) {
    console.log(key);
  }
});