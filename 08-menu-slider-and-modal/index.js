const toggleBtn = document.getElementById('toggle');
const openBtn = document.getElementById('open');
const closeBtn = document.getElementById('close');
const modal = document.getElementById('modal');

// event listener
toggleBtn.addEventListener('click', () => document.body.classList.toggle('show-nav'));
openBtn.addEventListener('click', () => modal.classList.add('show-modal'));
closeBtn.addEventListener('click', () => modal.classList.remove('show-modal'));

// close modal by clicking outside the modal
window.addEventListener('click', e =>
  e.target == modal ? modal.classList.remove('show-modal') : false
);
