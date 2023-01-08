import { PerspectiveCamera } from 'three';
import useDebug from '@/composables/useDebug';


export default class Camera extends PerspectiveCamera {
  // instance: PerspectiveCamera;
  instance: PerspectiveCamera
  
  constructor(fov: number, width: number, near: number, far: number, height?: number) {
    super()
    this.instance = new PerspectiveCamera(fov, width, near, far);
    this.instance.position.x = 0
    this.instance.position.y =  1
    this.instance.position.z = 15

    //this.instance = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0, 10000 );
  }

  resize(cam) {
    cam.aspect = window.innerWidth / window.innerHeight;
    cam.updateProjectionMatrix();
  }
  
  tweak() {
    const debug = useDebug();

    const camera_page = debug.panel.addFolder({
      title: 'Camera',
      expanded: false,
    });

    // camera_page.addInput(this.instance, 'position').on("change", (e) => {
    //   console.log(e)
    //   //this.instance.position.set(ex);
    // });

    camera_page.addInput(this.instance, 'position')
    camera_page.addInput(this.instance, 'rotation')
    camera_page.addInput(this.instance, 'zoom')
    camera_page.addInput(this.instance, 'fov')
  
  }


}
