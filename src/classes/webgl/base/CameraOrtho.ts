import { OrthographicCamera } from 'three';
import useDebug from '@/composables/useDebug';


export default class CameraOrtho extends OrthographicCamera {
  // instance: PerspectiveCamera;
  instance: OrthographicCamera

  constructor(left: number, right: number, top: number, bottom: number, near: number, far: number) {
      super()
    // this.instance = new PerspectiveCamera(fov, width, near, far);
    // this.instance.position.x = 0
    // this.instance.position.y =  1
    // this.instance.position.z = 15

   
    // this.instance = new THREE.OrthographicCamera( left, right, top, bottom, near, far);
    // this.instance.position.x = 0
    // this.instance.position.y =  1
    // this.instance.position.z = 15
  }

  resize(cam) {
    cam.aspect = window.innerWidth / window.innerHeight;
    cam.updateProjectionMatrix();
  }
  
}
