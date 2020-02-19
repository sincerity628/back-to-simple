const postsContainer = document.getElementById('posts-container');
const filter = document.getElementById('filter');
const loading = document.querySelector('.loader');

const limit = 5;
let page = 1;

// fetch the posts from API
async function fetchPost() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page={page}`
  );

  const data = await res.json();
  return data;
}

// set the data to the DOM
async function showPosts() {
  const posts = await fetchPost();

  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
      <div class="number">${ post.id }</div>
      <div class="post-info">
        <h2 class="post-title">${ post.title }</h2>
        <p class="post-body">${ post.body }</p>
      </div>
    `;

    postsContainer.appendChild(postEl);
  });
}

// show loader & fetch more posts
function showLoading() {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1500);
}

// filter the posts depend on the input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();

  const posts = document.querySelectorAll('.post');
  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if(title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

showPosts();

// event listener
window.addEventListener('scroll', () => {
  const {
    scrollHeight,
    scrollTop,
    clientHeight
  } = document.documentElement;

  if(scrollTop + clientHeight > scrollHeight - 5) {
    showLoading();
  } else {
    loading.classList.remove('show');
  }
});

filter.addEventListener('input', filterPosts);
