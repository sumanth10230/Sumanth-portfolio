precision highp float;

varying vec2 vTexCoord;
uniform sampler2D tex;
uniform vec2 normalRes;

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y; 

  float center = texture2D(tex, uv).r;

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

  if (center > 0.5) {
    if (neighbors > 1.5 && neighbors < 3.5) {
      nextState = 1.0; 
    }
  } else {
    if (neighbors > 2.5 && neighbors < 3.5) {
      nextState = 1.0; 
    }
  }

  // THIS IS THE MAGIC LINE: It inverts the output so 0 is white and 1 is black
  gl_FragColor = vec4(vec3(1.0 - nextState), 1.0);
}
