import { PlaneGeometry, MeshBasicMaterial, Color, Texture, Mesh } from 'three';

export default class HeroImage {
  webgl: any;
  scene: any;
  mesh: any;


  constructor(args) {
    this.webgl = args.webgl;
    this.scene = args.scene;
    
    this.createImage();
  }


  async createImage() {
    const geometry = new PlaneGeometry( 6.5, 7.5 );
    let material = new MeshBasicMaterial({ color: new Color(0xffffff)})
   
    const imgSrc = document.querySelector('.hero_img picture img').getAttribute('src');
    let image = new Image();
    image.src = imgSrc;

    const texture = new Texture( image  );
    texture.flipY = true;
    texture.needsUpdate = true;

    material.map = texture;
    material.depthTest = false;

    this.mesh = new Mesh(geometry, material);
    this.mesh.rotation.x -= 0.1;
    this.mesh.position.z = 1;
    this.mesh.position.y -= 0.8 ;

    this.mesh.material.polygonOffset = true;
    this.mesh.material.polygonOffsetUnits = 1;
    this.mesh.material.polygonOffsetFactor = 1;

    this.scene.instance.add(this.mesh);

   
  }
}
