const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// the random user api is not working
const users = [
  'Barbara Landry',
  'Leon Ray',
  'Rosina Manning',
  'Maverick Drummond',
  'Kianna Martins',
  'Ace Humphreys',
  'Nial Mansell',
  'Aliyah Osborn',
  'Forrest Collier',
  'Tahir Golden',
  'Marcelina Leal',
  'Darsh Spence',
  'Md Cordova',
  'John Sykes',
  'Aaisha Vickers',
  'Sarah Rowland',
  'Braden Huynh',
  'Khadeeja Harper',
  'Lottie Phelps',
  'Bianca Driscoll',
  'Tayyib Dickens',
  'Tegan Flowers',
  'Gregor Chase',
  'Shanae Lennon',
  'Daniaal Gibbs',
  'Anniyah Paine',
  'Carly Knowles',
  'Harvir Harris',
  'Demi-Lee Ahmed',
  'Herbie Roberson',
  'Deniz Jordan',
  'Myles Morton',
  'Bernice Needham',
  'Nabila Mccallum',
  'Izaan Iles',
  'Lila Warner',
  'Ali Witt',
  'Wendy Gonzalez',
  'Kobie Cain',
  'Brittney Lamb'
];

// to store the user objects
let data = [];

// get the first 3 initial person
getRandomUser();
getRandomUser();
getRandomUser();

// async function getRandomUser() {
//   const res = await fetch('https://cors-anywhere.herokuapp.com/https://randomuser.me/api/');
//   const data = await res.json();
//
//   const user = data.results[0];
//   const newUser = {
//     name: `${user.name.first} ${user.name.last}`,
//     wealth: Math.floor(Math.random() * 1000000)
//   };
//
//   addData(newUser);
// }

function getRandomUser() {
  const user = {
    name: users[Math.floor(Math.random() * users.length)],
    wealth: Math.floor(Math.random() * 1000000)
  };

  addData(user);
}

// add the new user to the data array
function addData(user) {
  data.push(user);

  updateDOM();
}

// double everyone's wealth! yeah!
function doubleWealth() {
  data = data.map(item => {
    return {
      ...item,
      wealth: item.wealth * 2
    };
  });

  updateDOM();
}

// sort by the richest
function sortWealth() {
  data.sort((a, b) => b.wealth - a.wealth);

  updateDOM();
}

// filter the wealth
function showMillionaires() {
  data = data.filter(item => item.wealth > 1000000);

  updateDOM();
}

// calculate the total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => acc + user.wealth, 0);

  const wealthEl = document.createElement('h3');
  wealthEl.innerHTML = `
  Total Wealth: <strong>${ formatWealth(wealth) }</strong>
  `;

  main.appendChild(wealthEl);
}

// update the DOM
function updateDOM(providedData = data) {
  // clear the main tag
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    let element = document.createElement('div');
    element.classList.add('person');

    element.innerHTML = `
      <strong>${ item.name }</strong> ${ formatWealth(item.wealth) }
    `;

    main.appendChild(element);
  });
}

// format the number of wealth
function formatWealth(number) {
  return '$ ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// event listener
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleWealth);
sortBtn.addEventListener('click', sortWealth);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
