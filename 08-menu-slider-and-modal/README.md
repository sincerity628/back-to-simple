# 08-Menu-slider-and-modal(css heavy)

### :eyes: demo: [08-demo](http://47.98.249.108:3001/08-menu-slider-and-modal/index.html)

### :thinking: how to center an object (.child in .father)?

tamplate:
```html
<body>
  <div class="father">
    <div class="child">...content</div>
  </div>
</body>
```

- solution one
```css
.father {
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  hieght: 100vh;
}
```

- solution two
```css
.father {
  hieght: 100vh;
  postion: relative;
}

.child {
  postion: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### :thinking: how to create the 'fade-in' animation?

template:
```html
<body>
  <div class="content">...content</div>
</body>
```

- solution
```css
:root {
  --fade-duration: 1s;
}

.content {
  animation-name: myfade;
  animation-duration: var(--fade-duration);
}

@keyframes myfade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
```
