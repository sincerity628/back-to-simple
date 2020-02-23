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

let dragStartIndex;

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
  dragStartIndex = this.closest('li').getAttribute('data-index');
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = this.getAttribute('data-index');
  swapItem(dragStartIndex, dragEndIndex);

  // clear the drag over background color
  this.classList.remove('over');
}

// swap the drag & drop items
function swapItem(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  // swap
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
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
