# 09-hangman-game

### :eyes: demo: [09-demo](https://sincerity628.github.io/back-to-simple/09-hangman-game/index.html)

---

### :point_down: the hangman svg configuration:
result:

![hangman-result](./screen-shots/hangman-result.png)

template:
```html
<svg height="250" width="200" class="figure-container">
  <!-- Rod -->
  <line x1="60" y1="20" x2="140" y2="20" />
  <line x1="140" y1="20" x2="140" y2="50" />
  <line x1="60" y1="20" x2="60" y2="230" />
  <line x1="20" y1="230" x2="100" y2="230" />

  <!-- Head -->
  <circle cx="140" cy="70" r="20" />
  <!-- Body -->
  <line x1="140" y1="90" x2="140" y2="150" />
  <!-- Arms -->
  <line x1="140" y1="120" x2="120" y2="100" />
  <line x1="140" y1="120" x2="160" y2="100" />
  <!-- Legs -->
  <line x1="140" y1="150" x2="120" y2="180" />
  <line x1="140" y1="150" x2="160" y2="180" />
</svg>
```
style:
```css
.fingure-container {
  fill: transparent;
  stroke: #fff; /* example */
  stoke-width: 4px; /* example */
  stroke-linecap: round; /* the end of the line gonna be round */
}
```
---

### :thinking: how to pick up a random item from an array?
solution:
```js
const array = [1, 2, 3, 4, 5, 6];
const randomNum = array[Math.floor(Math.random() * array.length)];

console.log(randomNum);
// 6(random)
```

---

### :thinking: how to get rid of the line break of a string?
solution:
```js
const str = '
      c
      o
      d
    ';
console.log(str);
/*
  c
  o
  d
*/

const str1 = str.replace(/\n/g, '');
// regular expression: /\n/
// the letter 'g' means globally
// the method will replace all the '\n'(s) no matter where it is
console.log(str1);
// cod
```

---

### :thinking: how to fire some certain functions when user clicking only letters(a to z)?
solution:
```js
// use the key code :)
// keyboard listener
window.addEventListenr('keydown', e => {
  if(e.keyCode < 65 || e.keyCode > 90) return;
  // a or A-keyCode: 65
  // z or Z-keyCode: 90

  // fire some function
  function1();
  function2();
  ...
});
```

---

### :thinking: how to clear an array? (const & let)
```js
let array1 = ['a', 'b', 'c', 'd'];
array1 = [];

const array2 = [1, 2, 3, 4, 5, 6];
array2.splice(0);
```
