const draggableList = document.getElementById('draggable-list');
const checkBtn = document.getElementById('check');

// the correct order
const cities = [
  'Chongqing',
  'Shanghai',
  'Beijing',
  'Chengdu',
  'Tianjin',
  'Gunagzhou',
  'Baoding',
  'Harbin',
  'Suzhou',
  'Shenzhen'
];

const listItems = [];

let dragIndex;

createList();

// function
// create the list items into the DOM
function createList() {
  // get the cities in random order every loading
  [...cities]
    .map(item => ({ value: item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(item => item.value)
    .forEach((city, index) => {
      const cityItem = document.createElement('li');
      // custom attribute 'data-...'
      cityItem.setAttribute('data-index', index);

      cityItem.innerHTML = `
        <span class="number">${ index + 1 }</span>
        <div class="draggable" draggable="true">
          <p class="city-name">${ city }</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

      listItems.push(cityItem);

      draggableList.appendChild(cityItem);
    });

  addEventListeners();
}

function dragStart() {
  console.log('drag start.');
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function dragOver() {
  console.log('drag over.');
}

function dragDrop() {
  console.log('drop.');
}

// add all the drag & drop event listeners
function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const draggableListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  draggableListItems.forEach(item => {
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
  });
}
