let targets = [];     
let particles = [];
let score = 0;
let duration = 30;
let startTime;
let state = 'start';
let speedMult = 1;    

function setup() {
  createCanvas(480, 360);
  textFont('Courier New');
  resetTargets();
}

function draw() {
  background(20, 12, 35);
  drawScene();

  if (state === 'start') {
    drawSpider(width / 2, 95, color(30, 20, 40));
    textAlign(CENTER, CENTER);
    fill(150, 255, 90);
    textSize(38);
    text('SPIDER STOMP', width / 2, 160);
    fill(255);
    textSize(14);
    text('The haunted house is crawling with spiders!\nSquish them all. Gold spiders = 5 points.\nHurt the black cat and you lose points!', width / 2, 225);
    fill(255, 160, 0);
    textSize(18);
    text('Click to start', width / 2, 295);
    return;
  }

  if (state === 'over') {
    textAlign(CENTER, CENTER);
    fill(255, 60, 60);
    textSize(36);
    text('THE SPIDERS WIN!', width / 2, 110);
    fill(255);
    textSize(20);
    text('Final score: ' + score, width / 2, 165);
    textSize(14);
    text(rankFor(score), width / 2, 205);
    fill(255, 160, 0);
    textSize(18);
    text('Click to retry', width / 2, 270);
    return;
  }


  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);
  if (timeLeft <= 0) {
    state = 'over';
    return;
  }


  speedMult = lerp(1, 2.5, elapsed / duration);


  if (frameCount % 300 === 0) addTarget('gold', 150);

  if (frameCount % 420 === 0) addTarget('cat', 200);


  for (let i = targets.length - 1; i >= 0; i--) {
    let t = targets[i];

    t.x += t.vx * speedMult;
    t.y += t.vy * speedMult;


    if (t.x < 30 || t.x > width - 30) t.vx *= -1;
    if (t.y < 50 || t.y > height - 40) t.vy *= -1;
    t.x = constrain(t.x, 30, width - 30);
    t.y = constrain(t.y, 50, height - 40);

    drawTarget(t);


    if (t.life !== undefined) {
      t.life--;
      if (t.life <= 0) targets.splice(i, 1);
    }
  }

  updateParticles();


  textAlign(LEFT, TOP);
  fill(255);
  textSize(16);
  text('Score: ' + score, 12, 10);
  textAlign(RIGHT, TOP);
  if (timeLeft <= 5) fill(255, 60, 60);
  text('Time: ' + ceil(timeLeft), width - 12, 10);
}

function mousePressed() {
  if (state === 'start' || state === 'over') {
    state = 'play';
    score = 0;
    particles = [];
    startTime = millis();
    resetTargets();
    return;
  }

  for (let i = targets.length - 1; i >= 0; i--) {
    let t = targets[i];
    if (dist(mouseX, mouseY, t.x, t.y) < 28) {
      if (t.type === 'spider') {
        score += 1;
        burst(t.x, t.y, color(120, 255, 60));

        targets.splice(i, 1);
        addTarget('spider');
      } else if (t.type === 'gold') {
        score += 5;
        burst(t.x, t.y, color(255, 215, 0));
        targets.splice(i, 1);
      } else if (t.type === 'cat') {
        score = max(0, score - 3);
        burst(t.x, t.y, color(255, 60, 60));
        targets.splice(i, 1);
      }
      return; 
    }
  }
}


function resetTargets() {
  targets = [];
  for (let i = 0; i < 3; i++) addTarget('spider');
}


function addTarget(type, life) {
  let sp = random(1.5, 2.5);
  if (type === 'gold') sp = random(3, 4);
  if (type === 'cat') sp = random(1, 1.5);

  let angle = random(TWO_PI);
  targets.push({
    type: type,
    x: random(60, width - 60),
    y: random(80, height - 60),
    vx: cos(angle) * sp,
    vy: sin(angle) * sp,
    life: life 
  });
}


function drawTarget(t) {
  if (t.type === 'spider') drawSpider(t.x, t.y, color(30, 20, 40));
  if (t.type === 'gold') drawSpider(t.x, t.y, color(255, 200, 0));
  if (t.type === 'cat') drawCat(t.x, t.y);
}

function drawScene() {
  noStroke();


  fill(255, 240, 200, 40);
  ellipse(90, 70, 90, 90);
  fill(255, 240, 200);
  ellipse(90, 70, 60, 60);
  fill(230, 215, 170);
  ellipse(80, 62, 12, 12);
  ellipse(100, 80, 9, 9);


  fill(10, 6, 18);
  rect(290, 150, 150, 160);          
  rect(270, 190, 40, 120);       
  triangle(280, 150, 365, 85, 450, 150); 
  triangle(262, 190, 290, 150, 318, 190); 
  rect(390, 100, 20, 40);           


  let flicker = random() > 0.04 ? 255 : 90;
  fill(255, 190, 40, flicker);
  rect(310, 175, 28, 36);
  rect(392, 175, 28, 36);
  rect(352, 120, 26, 26);
  fill(10, 6, 18);
  rect(323, 175, 2, 36);
  rect(405, 175, 2, 36);


  fill(60, 25, 15);
  rect(350, 255, 30, 55);

  
  fill(30, 22, 40);
  rect(0, 305, 480, 55);


  fill(200, 200, 230, 25);
  ellipse(150 + sin(frameCount * 0.01) * 40, 300, 220, 40);
  ellipse(380 + cos(frameCount * 0.013) * 40, 315, 240, 36);
}


function drawSpider(x, y, bodyCol) {

  stroke(red(bodyCol), green(bodyCol), blue(bodyCol));
  if (red(bodyCol) < 100) stroke(110, 90, 130); 
  strokeWeight(2.5);
  noFill();
  for (let i = 0; i < 4; i++) {
    let wiggle = sin(frameCount * 0.4 + i) * 4;
    let yy = y - 12 + i * 8;

    line(x, y, x - 22, yy + wiggle);
    line(x - 22, yy + wiggle, x - 30, yy + 12 + wiggle);
    line(x, y, x + 22, yy - wiggle);
    line(x + 22, yy - wiggle, x + 30, yy + 12 - wiggle);
  }


  noStroke();
  fill(bodyCol);
  ellipse(x, y + 5, 30, 34);
  ellipse(x, y - 14, 20, 20);

 
  fill(255, 40, 40);
  ellipse(x - 5, y - 16, 6);
  ellipse(x + 5, y - 16, 6);


  if (red(bodyCol) > 200) {
    fill(255, 255, 255, 150);
    ellipse(x - 5, y, 6, 10);
  }
}


function drawCat(x, y) {
  noStroke();
  fill(15, 15, 20);
  ellipse(x, y + 8, 38, 30);       
  ellipse(x, y - 10, 28, 26);      
  triangle(x - 13, y - 16, x - 5, y - 20, x - 12, y - 32); 
  triangle(x + 13, y - 16, x + 5, y - 20, x + 12, y - 32); 


  noFill();
  stroke(15, 15, 20);
  strokeWeight(5);
  arc(x + 20, y + 8, 24, 30, -HALF_PI, HALF_PI);
  noStroke();


  fill(120, 255, 100);
  ellipse(x - 6, y - 10, 7, 9);
  ellipse(x + 6, y - 10, 7, 9);
  fill(0);
  rect(x - 7, y - 14, 2, 8);
  rect(x + 5, y - 14, 2, 8);
}


function burst(x, y, c) {
  for (let i = 0; i < 20; i++) {
    particles.push({
      x: x,
      y: y,
      vx: random(-4, 4),
      vy: random(-4, 4),
      size: random(4, 9),
      life: 255,
      col: c
    });
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.15; 
    p.life -= 7;

    noStroke();
    fill(red(p.col), green(p.col), blue(p.col), p.life);
    ellipse(p.x, p.y, p.size);

    if (p.life <= 0) particles.splice(i, 1);
  }
}


function rankFor(s) {
  if (s >= 40) return 'Spider Slayer Supreme';
  if (s >= 25) return 'Bug Squisher Pro';
  if (s >= 12) return 'Brave Little Stomper';
  return 'You screamed and ran away...';
}
