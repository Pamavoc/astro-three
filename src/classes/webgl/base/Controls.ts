import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PerspectiveCamera, Renderer } from 'three';

//import CameraControls from 'camera-controls';

export default class Controls {
  //instance: CameraControls;

  instance: OrbitControls;
  constructor(camera: PerspectiveCamera, renderer: Renderer) {


    this.instance = new OrbitControls(camera, renderer.domElement);
    // this.instance.autoRotate = true
    this.instance.enableDamping = true;
    this.instance.dampingFactor = 0.05;
    this.instance.draggingDampingFactor = 0.01;
    // this.instance.maxZoom = 5;

     this.instance.enableZoom = false;
    this.instance.enablePan = true;
     this.instance.panSpeed = 0.01;
     this.instance.rotateSpeed = 0.3;
     this.instance.minPolarAngle = 0.02;
     this.instance.maxPolarAngle = Math.PI/2 - 0.08; 
   
    // this.instance.enableKeys = false;
    // this.instance.screenSpacePanning = false;
    // this.instance.enableRotate = true;
 
    // this.instance.minAzimuthAngle = 0;
    // this.instance.maxAzimuthAngle = Math.PI;
   
    // this.instance.enablePan = true;
    // this.instance.panSpeed = 0.02;
    // this.instance.target.set(0, 0, 0);

    // this.instance.minPolarAngle = 0.5;
    // this.instance.maxPolarAngle = 1.27; 
    // this.instance.update();


    

    //this.events(renderer, CameraControls);
  }


  update(delta) {

    // console.log("AZI : " + this.instance.getAzimuthalAngle());
    // console.log("POLAR : " + this.instance.getPolarAngle());
    this.instance.update(delta);
    
  }
}
