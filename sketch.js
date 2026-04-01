let golShader;
let prevFrame;

function preload() {
  golShader = loadShader('gol.vert', 'gol.frag');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('p5-container'); 
  
  pixelDensity(1);
  noSmooth();
  
  prevFrame = createGraphics(width, height);
  prevFrame.pixelDensity(1);
  prevFrame.noSmooth();
  
  background(0);
  stroke(255);
  shader(golShader);
  golShader.setUniform("normalRes", [1.0/width, 1.0/height]);
}

function draw() {
  line(
    pmouseX - width/2, pmouseY - height/2,
    mouseX - width/2, mouseY - height/2
  );
  
  prevFrame.image(get(), 0, 0);  
  golShader.setUniform('tex', prevFrame);
  rect(-width/2, -height/2, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  prevFrame = createGraphics(width, height);
  prevFrame.pixelDensity(1);
  prevFrame.noSmooth();
  golShader.setUniform("normalRes", [1.0/width, 1.0/height]);
}
