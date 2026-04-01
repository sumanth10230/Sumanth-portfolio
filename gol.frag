precision highp float;

varying vec2 vTexCoord;
uniform sampler2D tex;
uniform vec2 normalRes;

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y; // Flips the coordinates so your mouse lines up

  // Get the current state of this pixel
  float center = texture2D(tex, uv).r;

  // Count the 8 neighbors around this pixel
  float neighbors = 0.0;
  neighbors += texture2D(tex, uv + vec2(-1.0, -1.0) * normalRes).r;
  neighbors += texture2D(tex, uv + vec2( 0.0, -1.0) * normalRes).r;
  neighbors += texture2D(tex, uv + vec2( 1.0, -1.0) * normalRes).r;
  neighbors += texture2D(tex, uv + vec2(-1.0,  0.0) * normalRes).r;
  neighbors += texture2D(tex, uv + vec2( 1.0,  0.0) * normalRes).r;
  neighbors += texture2D(tex, uv + vec2(-1.0,  1.0) * normalRes).r;
  neighbors += texture2D(tex, uv + vec2( 0.0,  1.0) * normalRes).r;
  neighbors += texture2D(tex, uv + vec2( 1.0,  1.0) * normalRes).r;

  float nextState = 0.0;

  // Game of Life Rules
  if (center > 0.5) {
    if (neighbors > 1.5 && neighbors < 3.5) {
      nextState = 1.0; // Cell lives
    }
  } else {
    if (neighbors > 2.5 && neighbors < 3.5) {
      nextState = 1.0; // Cell is born
    }
  }

  // Draw the pixel to the screen
  gl_FragColor = vec4(vec3(nextState), 1.0);
}
