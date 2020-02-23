# 19-sortable-list

### :eyes: demo: [19-demo](http://47.98.249.108:3001/19-sortable-list/index.html)

- the drag & drop API documentation: [link](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API)

---
### :poop: the css pseudo selector
- documentation1: [link](https://www.w3schools.com/css/css_pseudo_classes.asp)

- documentation2: [link](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)

style(example):
```css
/* all of the li items except the last one */
.draggable-list li:not(:last-of-type) {
  ...
}
```

---

### :poop: about the Node.appendChild

in swapItem function:
```js
// swap the drag & drop items
function swapItem(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  // swap
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}
```

### :bangbang: notice:

The **Node.appendChild()** method adds a node to the end of the list of children of a specified parent node. :bangbang: If the given child is a reference to an **existing** node in the document, **appendChild() moves it from its current position to the new position.**

- reference(The MDN Doc): [link](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)
