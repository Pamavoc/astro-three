precision highp float;

uniform vec3 uBottomColor;
uniform vec3 uTopColor;

varying vec3 vPosition;

void main()
{
  vec3 gradientColor = mix(uBottomColor, uTopColor, vPosition.y / 5. + 0.3);
  gl_FragColor = vec4(gradientColor, 1.0);
}
