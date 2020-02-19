const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const url = '';

// event listener
form.addEventListener('submit', e => {
  e.preventDefault();
  
  const searchTerm = e.target.value;
  console.log(searchTerm);
});
