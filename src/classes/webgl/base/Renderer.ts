import { WebGLRenderer, Scene, sRGBEncoding } from 'three';

export default class Renderer {
  scene: Scene;
  instance: WebGLRenderer;
  canvas: HTMLCanvasElement;
  canvasContainer: HTMLElement;

  constructor(width, height) {
    this.canvas = document.querySelector('#canvas');
    this.canvasContainer = document.querySelector('.container-canvas');

    this.instance = new WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
      //outputEncoding: sRGBEncoding,
      stencil: false,
      depth: false
    });
    this.instance.setSize(width, height);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 1, 2));

  }
}
