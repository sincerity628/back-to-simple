# 10-meal-finder

### :eyes: demo: [10-demo](https://sincerity628.github.io/back-to-simple/10-meal-finder/index.html)

---

### :laughing: brief intro
1. search for a meal:

![input](./screen-shots/intro1.png)

- (no result)

![no-result](./screen-shots/no-result.png)

2. click on one of the results

![results](./screen-shots/intro2.png)

3. get the recipe

![the banana pancake recipe](./screen-shots/intro3.png)

4. click on the random button

![random-button](./screen-shots/intro4.png)

5. get a random meal

![rando-meal](./screen-shots/intro5.png)

---

### :smiley: cool stuff
1. responsible

- PC:

![pc-view](./screen-shots/intro6.png)

- Ipad:

![ipad-view](./screen-shots/intro7.png)
![ipad-view](./screen-shots/intro8.png)

- Phone:

![phone-view](./screen-shots/intro9.png)


---

### :poop: add the hover cover effect
result:
- normal:

![normal](./screen-shots/normal.png)

- hover:

![hover](./screen-shots/hover.png)

template:
```html
<body>
  <div class="container">
    <img src="./img.png" alt="img" />
    <div class="info">
      <h3>detail text</h3>
    </div>
  </div>
</body>
```
style:
```css
.container {
  cursor: pointer;
  position: relative;
  height: 180px;
  width: 180px;
  text-align: center;
}

.container img {
  height: 100%;
  width: 100%;
  /* style */
  border: 4px solid #fff;
  border-radius: 2px;
}

.info {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  /* style */
  background-color: rgba(0, 0, 0, 0.7);
  /* animation */
  transition: opacity 0.2s ease-in;
  opacity: 0;
  /* center the content */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* condition */
.container:hover .info {
  opacity: 1;
}
```

---

### :poop: set the custom attribute and get it with js
template:
```html
<body>
  <div id="container"></div>
</body>
```
logic:
```js
const container = document.getElementById('container');

// set the custom attribute 'infoid'
// add 'data-' at the beginning
// 'data-infoid'
container.innerHTML = `
  <div class="info" data-infoid="abcd">some info...</div>
`;

// get it from the DOM
// use the getAttribute method
const infoEl = document.querySelector('.info');

const infoId = infoEl.getAttribute('data-infoid');
console.log(infoId);
// abcd
```
