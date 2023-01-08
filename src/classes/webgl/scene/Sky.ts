import { SphereGeometry, Mesh} from 'three';

export default class Sky {

  webgl: any
  scene: any

  constructor(args) {
    this.webgl = args.webgl
    this.scene = args.scene
    this.createSky();

  }

  createSky() {
    const geometry = new SphereGeometry(60, 32, 16, 0, 2*Math.PI, 0, 0.5 * Math.PI);
    const mesh = new Mesh(geometry, this.webgl.materials.skyMaterial);
    mesh.position.y = -1;
    this.scene.instance.add(mesh);
  }
}
