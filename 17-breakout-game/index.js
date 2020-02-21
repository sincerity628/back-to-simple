const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// set the ball props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: 4
};

// set the paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0
};

// the total score
let score = 0;

// set the brick props
const brickInfo = {
  w: 70,
  h: 20,
  offsetX: 45,
  offsetY: 60,
  padding: 10,
  visible: true
};

// create the bricks
const brickColumnCount = 9;
const brickRowCount = 5;
let bricks = [];

for(let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for(let j = 0; j < brickColumnCount; j++) {
    const x = j * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = i * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

// draw the ball on the canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#745c97';
  ctx.fill();
  ctx.closePath();
}

// draw the paddle on the canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = '#745c97';
  ctx.fill();
  ctx.closePath();
}

// draw the score on the canvas
function drawScore() {
  ctx.beginPath();
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${ score }`, canvas.width - 100, 40);
  ctx.closePath();
}

// draw the bricks on the canvas
function drawBricks() {
  bricks.forEach(row => {
    row.forEach(brick => {
      ctx.beginPath();
      ctx.fillRect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? '#745c97' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
}

// draw everything on the canvas
function draw() {
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

draw();

// event listener
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));
