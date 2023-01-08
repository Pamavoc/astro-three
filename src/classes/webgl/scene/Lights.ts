import { AmbientLight, DirectionalLight } from 'three';


export default class Lights {

  scene: any
  params: any
  lights: any


  constructor(scene) {

    this.scene = scene

    this.params = {
      background: 0x080808,
      ambient_light: 0x020202,
      directional_light: 0xffffff,
      mat_color: 0xffffff,
    }


    this.createLights()

  }



  createLights() {

    this.lights = {
      ambient: null,
      directional: null
    }

    this.lights.ambient = new AmbientLight(this.params.ambient_light, 0.48);
    this.lights.directional = new DirectionalLight(this.params.directional_light, 0.83);

    this.lights.directional.position.set(5, 4, 20);
    this.scene.instance.add(this.lights.ambient);
    this.scene.instance.add(this.lights.directional);

  }
}
