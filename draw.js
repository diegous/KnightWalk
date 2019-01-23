const nSquares = 10;
let pathFinder;
let [lastX, lastY] = [0,0];
let step, steps, prevStep;
let stepCounter = 0;
let stepDrawer;
let nextXInput, nextYInput;

function setup() {
  drawBackground(nSquares);
  drawBoard(nSquares);

  fill('#222222');
  stroke(126);
  strokeWeight(2);

  nextXInput = createInput('9');
  nextYInput = createInput('9');
  nextButton = createButton("Go to coordinates");

  nextXInput.size(15);
  nextYInput.size(15);
  nextButton.mousePressed(saleTravesia);

  drawNumber([lastX, lastY]);
}

function saleTravesia() {
  const x = parseInt(nextXInput.value());
  const y = parseInt(nextYInput.value());
  const pathFinder = new PathFinder(lastX, lastY, nSquares);

  steps = pathFinder.pathTo(x, y);

  // Draw first number
  step = steps.shift();

  stepDrawer = setInterval(drawStep, 500);
}

function drawBoard(n) {
  drawTiles(nSquares);
  drawCoordinates(nSquares);
}

function drawStep() {
  // Stop animation after drawing last step
  if (steps.length === 0) {
    clearInterval(stepDrawer);
  } else {
    prevStep = step;
    step = steps.shift();
    [lastX, lastY] = step;
    drawNumber(step);
    drawLine(prevStep, step);
  }
}

function drawNumber(step) {
  const x = 42 + 50 * step[0];
  const y = 55 + 50 * step[1];

  text(stepCounter++, x, y);
}

function drawLine(start, end) {
  const coor = (coord) => 50 + coord * 50;
  let x1, y1, x2, y2;

  x1 = coor(start[0]);
  y1 = coor(start[1]);
  x2 = coor(end[0]);
  y2 = coor(end[1]);

  line(x1, y1, x2, y2);
}








function drawBackground(n) {
  const boardSize = (n * 50) + 50
  createCanvas(boardSize, boardSize);
  background('#222222');
}

function drawTiles(n) {
  const squarePos = (coord) => 25 + coord * 50;
  const squareSize = 48;

  fill('#fafafa');
  noStroke();

  for (var x = n - 1; x >= 0; x--) {
    for (var y = n - 1; y >= 0; y--) {
      rect(squarePos(x), squarePos(y), squareSize, squareSize);
    }
  }
}

function drawCoordinates(n) {
  textSize(20);

  for (var i = n - 1; i >= 0; i--) {
    text(i, 42 + i*50, 20); // Top coordinates
    text(i, 7, 55 + i*50);  // Left side coordinates
  }
}
