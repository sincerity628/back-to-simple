# 23-rock-paper-scissors

### :eyes: demo: [23-demo](http://47.98.249.108:3001/23-rock-paper-scissors/index.html)

---

### :ghost: the css pseudo selector
- documentation1: [link](https://www.w3schools.com/css/css_pseudo_classes.asp)

- documentation2: [link](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)

:raised_hands: note:
```css
/* the difference between :first-child & :first-of-type */

p:first-child
/* the element p that is the first child of its parent */

p:first-of-type
/* the element p that is the first <p> of its parent */
```

style:
```css
/* .score p:first-child */
header .score p:first-of-type {
  background-color: var(--primary-color);
}

/* .score p:last-child */
header .score p:last-of-type {
  background-color: var(--dark-color);
}```
