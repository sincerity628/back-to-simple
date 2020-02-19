const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const url = 'https://api.lyrics.ovh';

//function
// search the songs from the api
async function searchSongs(term) {
  const res = await fetch(`${ url }/suggest/${ term }`);
  const data = await res.json();

  showData(data);
}

// show the songs & the artists to DOM
function showData(data) {
  if(data.data.length === 0) {
    result.innerHTML = `<p>There is no result...</p>`;
    return;
  }
  // let output = '';
  //
  // data.data.forEach(song => {
  //   output += `
  //     <li>
  //       <span>
  //         <strong>${ song.title }</strong>
  //         - ${ song.artist.name }
  //       </span>
  //       <button
  //         class="btn"
  //         data-artist="${song.artist.name}"
  //         data-songname="${song.title}"
  //       >Get Lyrics</button>
  //     </li>
  //   `;
  // });
  //
  // result.innerHTML = `
  //   <ul class="songs">${ output }</ul>
  // `;

  // the second way
  result.innerHTML = `
    <ul class="songs">
      ${ data
          .data
          .map(song => `
            <li>
              <span>
                <strong>${ song.title }</strong>
                - ${ song.artist.name }
              </span>
              <button
                class="btn"
                data-artist="${song.artist.name}"
                data-songtitle="${song.title}"
              >Get Lyrics</button>
            </li>
          `)
          .join('')
        }
    </ul>
  `;

  more.innerHTML = `
    ${ data.prev ? `
        <button
          class="btn"
          onclick="loadMoreSongs('${data.prev}')"
        >Prev</button>
      ` : '' }
    ${ data.next ? `
        <button
          class="btn"
          onclick="loadMoreSongs('${data.next}')"
        >Next</button>
      ` : '' }
  `;
}

// load next page of songs or previous page of songs
async function loadMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${ url }`);
  const data = await res.json();

  showData(data);
}

// get the lyrics from the api & show it in DOM
async function getLyrics(artist, title) {
  const res = await fetch(`${ url }/v1/${ artist }/${ title }`);
  const data = await res.json();

  if(data.error) {
    result.innerHTML = `<p>${ data.error }</p>`;
    more.innerHTML = '';
    return;
  }

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br />');

  result.innerHTML = `
    <h2>
      <strong>${ title }</strong> - ${ artist }
    </h2>
    <span>${ lyrics }</span>
  `;

  // clear the pagination
  more.innerHTML = '';
}

// event listener
form.addEventListener('submit', e => {
  e.preventDefault();

  const searchTerm = search.value;
  if(!searchTerm) return;

  searchSongs(searchTerm);
});

// get the lyrics button click
result.addEventListener('click', e => {
  const clickedEl = e.target;

  if(clickedEl.tagName !== 'BUTTON') return;

  const artist = clickedEl.getAttribute('data-artist');
  const title = clickedEl.getAttribute('data-songtitle');

  getLyrics(artist, title);
});
