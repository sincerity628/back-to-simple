const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const againBtn = document.getElementById('again-btn');
const container = document.getElementById('container');
const scoreEl = document.getElementById('score');
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
  dy: -4
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
const brickRowCount = 5;
const brickColumnCount = 9;

const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
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
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
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
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? '#745c97' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
}

// draw everything on the canvas
function draw() {
  // clear the canvas before draw
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

// move the paddle
function movePaddle() {
  paddle.x += paddle.dx;

  // wall detection
  if(paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  } else if(paddle.x < 0) {
    paddle.x = 0;
  }
}

// move the ball
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // wall collision
  if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }

  if(ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  // paddle collision
  if(
    ball.x + ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy *= -1;
  }
  // bricks collision
  bricks.forEach(row => {
    row.forEach(brick => {
      if(brick.visible) {
        if(
          ball.x - ball.size > brick.x && // the right side of the ball
          ball.x + ball.size < brick.x + brick.w && // the left side
          ball.y + ball.size > brick.y && // the bottom side
          ball.y - ball.size < brick.y + brick.h // the top side
        ) {
          ball.dy *= -1;
          brick.visible = false;

          if(!container.classList.contains('show')) {
            increaseScore();
          }
        }
      }
    });
  });

  // check if loose
  if(ball.y + ball.size > canvas.height) {
    scoreEl.innerText = score;
    container.classList.add('show');
  }

}

// increase the score & check if any bricks left
function increaseScore() {
  score++;

  if(score % (brickRowCount * brickColumnCount) === 0) {
    showAllBricks();
  }
}

// show all the bricks again
function showAllBricks() {
  bricks.forEach(row => {
    row.forEach(brick => {
      brick.visible = true;
    });
  });
}

// make the ball back to center;
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;

  ball.dx = 4;
  ball.dy = -4;
}

function playAgain() {
  score = 0;
  showAllBricks();
  resetBall();

  container.classList.remove('show');
}

function keyDown(e) {
  if(e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  } else if(e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
}

function keyUp(e) {
  if(
    e.key === 'Right' ||
    e.key === 'ArrowRight' ||
    e.key === 'Left' ||
    e.key === 'ArrowLeft'
  ) {
    paddle.dx = 0;
  }
}

// the update function
function update() {
  movePaddle();
  moveBall();
  // draw everything
  draw();
  window.requestAnimationFrame(update);
}

update();

// event listener
//keyboard action handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// btn action handlers
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));
againBtn.addEventListener('click', playAgain);
