# 12-my-music-player

### :eyes: demo: [12-demo](http://47.98.249.108:3001/12-my-music-player/index.html)

---

### :musical_note: wait for loading the music...

![music](./screen-shots/music.png)

---

### :musical_note: the pink gradient background

- [tutorial1 here](https://www.runoob.com/css3/css3-gradients.html)

- [tutorial2 here](https://developer.mozilla.org/zh-CN/docs/Web/CSS/linear-gradient)

style:
```css
body {
  background-image: linear-gradient(
    0deg,
    rgba(247, 247, 247, 1) 23.8%,
    rgba(252, 221, 221, 1) 92%
  );
  height: 100vh;
}
```

---

### :musical_note: the music cover animation (when the '.music-container' div has the class '.play' the animation effect is going to run)

- [animation tutorial](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation)

template:
```html
<body>
  <div class="music-container">
    <div class="image-container">
      <img src="./imgage/img.png" alt="music-cover" />
    </div>
  </div>
</body>
```

style:
```css
.image-container img {
  animation: rotate 4s linear infinite;
  animation-play-state: paused;
}

/* condition */
.music-container.play .image-container img {
  animation-play-state: running;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

```

---

### :musical_note: add the little white circle on the cover image

before:

![cover-before](./screen-shots/circle-before.png)

after:

![cover-after](./screen-shots/circle-after.png)

template:

![player-structure](./screen-shots/circle-structure.png)

```html
<body>
  <div class="image-container">
    <img src="./images/image.png" alt="cover-image" />
  </div>
</body>
```

style:
```css
.image-container {
  position: relative;
}

/* the white circle */
.image-container::after {
  content: '';
  background-color: #fff;
  width: 20px;
  height: 20px;
  position: absolute;
  left: 50%;
  bottom: 100%;
  border-radius: 50%;
  transform: translate(50%, -50%);
}
```
