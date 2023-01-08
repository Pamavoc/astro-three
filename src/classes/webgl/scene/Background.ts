import { GridHelper, LineBasicMaterial, Color } from 'three'
import { gsap } from 'gsap';

export default class Background {

  webgl: any
  scene: any
  gridHelper: GridHelper
  gridOG: LineBasicMaterial
  gridHelperNormal: LineBasicMaterial

  constructor(args) {
    this.webgl = args.webgl
    this.scene = args.scene
    this.gridHelper;
    this.createBackground();

  }

  hideGrid() {
    this.gridHelper.material = this.gridHelperNormal
    gsap.fromTo(this.gridHelper.material, { opacity: this.gridHelper.material.opacity }, { duration: 0.3, opacity: 0 })
    // gsap.to(this.gridHelper.material, { opacity: 0 })
  }

  showGrid() {
    const tl = gsap.timeline({ onComplete: () => {
       this.gridHelper.material = this.gridHelperNormal
    }})
    tl.fromTo(this.gridHelper.material, { opacity: this.gridHelper.material.opacity }, { duration: 0.3, opacity: 0.4 })
  }

  createBackground() {

   
    const size = 20;
    const divisions = 20;
    const color = new Color(0xBB5A5A);
    
    this.gridHelper = new GridHelper( size, divisions );
    this.gridOG = this.gridHelper.material

    this.gridHelperNormal = new LineBasicMaterial({ color: color });
    this.gridHelperNormal.transparent = true
    this.gridHelperNormal.opacity = 0.5,
    this.gridHelperNormal.depthWrite = false

    // this.gridHelper.material.opacity = 0.5;
    // this.gridHelper.material.transparent = true;
    // gridHelper.material.depthWrite = false;
    this.gridHelper.material.color = color
    this.gridHelper.rotation.x = - Math.PI / 1.9;
    this.gridHelper.position.z = 0;

    this.scene.instance.add( this.gridHelper );
    
  }
}
