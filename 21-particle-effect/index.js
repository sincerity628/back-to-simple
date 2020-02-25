const particles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  const particlesLength = Math.floor(width / 10);
  for(let i = 0; i < particlesLength; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(213, 47, 98);

  particles.forEach((p, index) => {
    p.update();
    p.draw();
    p.connect(particles.slice(index));
    p.checkMouse(particles.slice(index));
  });
}

class Particle {
  constructor() {
    // position
    this.pos = createVector(random(width), random(height));
    // veloity
    this.vel = createVector(random(-2, 2), random(-2, 2));
    // size
    this.size = 10;
  }

  // draw a single particle
  draw() {
    noStroke(); // no border
    circle(this.pos.x, this.pos.y, this.size);
    fill('rgba(255, 255, 255, 0.5)');
  }

  // update the movement by adding the velocity
  update() {
    this.pos.add(this.vel);
    this.checkEdge();
  }

  // check the edges
  checkEdge() {
    if(this.pos.x - this.size / 2 < 0 || this.pos.x + this.size / 2 > width) {
      // change the direction
      this.vel.x *= -1;
    }
    if(this.pos.y - this.size / 2 < 0 || this.pos.y + this.size / 2 > height) {
      this.vel.y *= -1;
    }
  }

  // connect the particles
  connect(particles) {
    particles.forEach(p => {
      const d = dist(this.pos.x, this.pos.y, p.pos.x, p.pos.y);
      if(d < 120) {
        stroke(`rgba(255, 255, 255, 0.2)`);
        line(this.pos.x, this.pos.y, p.pos.x, p.pos.y);
      }
    });
  }

  // check the mouse movement
  checkMouse(particles) {
    particles.forEach(p => {
      const d = dist(this.pos.x, this.pos.y, mouseX, mouseY);
      if(d < 30) {
        if(mouseX > width / 2) {
          this.pos.x -= random(20);
        } else {
          this.pos.x += random(20);
        }

        if(mouseY > height / 2) {
          this.pos.y -= random(20);
        } else {
          this.pos.y += random(20);
        }
      }
    });
  }
}
