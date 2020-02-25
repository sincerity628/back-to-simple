# 21-particle-effect

### :eyes: demo: [21-demo](http://47.98.249.108:3001/21-particle-effect/index.html)
---

### :heart: P5.js Doc: [link here](https://p5js.org/get-started/)

### :heart: P5.js
- get the mouse position
```js
function setup() {
  createCanvas(width, height);
}

function draw() {
  console.log(mouseX, mouseY);
}
```

- draw the circle when the mouse moves
```js
function setup() {
  createCanvas(width, height);
}

function draw() {
  circle(mouseX, mouseY, circleRadius);
}
```

- get the window width & height
```js
function setup() {
  createCanvas(width, height);
  console.log(width, height);
}

function draw() {}
```

- generate a random number
```js
function setup() {
  createCanvas(width, height);

  // from 0 - 1
  console.log(random());
  // from 0 - max
  console.log(random(max));
  // from min - max
  console.log(random(min, max));
}

function draw() {}
```
