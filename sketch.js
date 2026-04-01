let golShader;
let prevFrame;
let pixelSize = 5; // CHANGE THIS NUMBER to make pixels bigger or smaller!

function preload() {
  golShader = loadShader('gol.vert', 'gol.frag');
}

function setup() {
  // Create a smaller canvas based on your pixel size
  let canvas = createCanvas(windowWidth / pixelSize, windowHeight / pixelSize, WEBGL);
  canvas.parent('p5-container'); 
  
  // Stretch the small canvas to fit the whole screen
  canvas.style('width', '100vw');
  canvas.style('height', '100vh');
  canvas.style('image-rendering', 'pixelated'); // Keeps the chunky pixels crisp
  
  pixelDensity(1);
  noSmooth();
  
  prevFrame = createGraphics(width, height);
  prevFrame.pixelDensity(1);
  prevFrame.noSmooth();
  
  // Keep the internal engine running on black/white, the shader flips it later
  background(0);
  stroke(255);
  strokeWeight(2); // Makes the mouse draw a slightly thicker line
  
  shader(golShader);
  golShader.setUniform("normalRes", [1.0/width, 1.0/height]);
}

function draw() {
  // Adjust the mouse coordinates so they map to the chunky grid
  let mx = mouseX / pixelSize;
  let my = mouseY / pixelSize;
  let pmx = pmouseX / pixelSize;
  let pmy = pmouseY / pixelSize;

  line(
    pmx - width/2, pmy - height/2,
    mx - width/2, my - height/2
  );
  
  prevFrame.image(get(), 0, 0);  
  golShader.setUniform('tex', prevFrame);
  rect(-width/2, -height/2, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth / pixelSize, windowHeight / pixelSize);
  let canvas = select('canvas');
  canvas.style('width', '100vw');
  canvas.style('height', '100vh');
  
  prevFrame = createGraphics(width, height);
  prevFrame.pixelDensity(1);
  prevFrame.noSmooth();
  golShader.setUniform("normalRes", [1.0/width, 1.0/height]);
}
