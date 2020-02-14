const balence = document.getElementById('balence'),
  money_plus = document.getElementById('money-plus'),
  money_minus = document.getElementById('money-minus'),
  list = document.getElementById('list'),
  form = document.getElementById('form'),
  text = document.getElementById('text'),
  amount = document.getElementById('amount');

// const dummyTransactions = [
//   { id: 1, text: 'apple', amount: -5 },
//   { id: 2, text: 'book', amount: -20 },
//   { id: 3, text: 'lucky money', amount: 100 }
// ];

let localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions =
  localStorage.getItem('transactions') !== null ?
    localStorageTransactions : [];

function addTransaction(e) {
  e.preventDefault();
  if(!text.value || !amount.value) return;

  const transaction = {
    id: getRandomId(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);

  addTransactionToDOM(transaction);
  updateValues();
  updateLocalStorage();

  text.value = '';
  amount.value = '';
}

function getRandomId() {
  return Math.floor(Math.random() * 10000000);
}

function addTransactionToDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${ transaction.text }
    <span>${ sign }${ Math.abs(transaction.amount) }</span>
    <button class="delete-btn" onClick="deleteTransaction(${transaction.id})">
      <i class="fas fa-times"></i>
    </button>
  `;

  list.appendChild(item);
}

// update the balence, income & expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const sum =
    amounts
    .reduce((acc, item) => (acc + item), 0)
    .toFixed(2);

  const income =
    amounts
      .filter(amount => amount > 0)
      .reduce((acc, item) => (acc + item), 0)
      .toFixed(2);

  const expense =
    ( amounts
        .filter(amount => amount < 0)
        .reduce((acc, item) => (acc + item), 0)
        * (-1) )
    .toFixed(2);

  balence.innerText = `¥${ sum }`;
  money_plus.innerText = `¥${ income }`;
  money_minus.innerText = `¥${ expense }`;
}

function deleteTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// init data
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionToDOM);
  updateValues();
}

init();

// event listener
form.addEventListener('submit', addTransaction);
