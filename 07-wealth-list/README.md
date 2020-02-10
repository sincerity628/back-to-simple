# 07-wealth-list

### :eyes: demo: [07-wealth-list](https://sincerity628.github.io/back-to-simple/07-wealth-list/index.html)
### :muscle: What can I learn in this project? DOM Array Methods!!!
- add user: forEach()
- double: map()
```js
// it will return a new array
```
- sort: sort()
```js
const arr = [1, 2, 100, 55, 68, 628];

// sort(compareFunction(a, b));

// descending order
arr.sort((a, b) => b - a);
// [628, 100, 68, 55, 2, 1]

// ascending order
arr.sort((a, b) => a - b);
// [1, 2, 55, 68, 100, 628]
```
- show only millionaires: filter()
```js
const arr = [12, 23, 20, 18, 19, 25];

const under20 = arr.filter(item => {
  return item < 20;
});

console.log(under20);
// [12, 18, 19]
```
- calculate entire wealth: reduce()
```js
const arr = [1, 2, 3, 4, 5];

// reduce(reducer(acc, num), initial value);
// accumulator

const total = arr.reduce((acc, num) => acc + num, 0);

console.log(total);
// 15
```
