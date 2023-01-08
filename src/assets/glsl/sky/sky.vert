precision highp float;

uniform float uTime;

uniform mat4 modelViewMatrix; // optional
uniform mat4 projectionMatrix; // optional

attribute vec3 position;
attribute vec2 uv;

varying vec3 vPosition;

void main()	{

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vPosition = position;
}
