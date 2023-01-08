import { Fog } from 'three'

export default class Atmosphere {

  scene: any
  params: any
  fog: any


  constructor(scene) {

    this.scene = scene

    this.params = {
      background: 0x080808,
      ambient_light: 0x020202,
      directional_light: 0xffffff,
      mat_color: 0xffffff,
    }   

    this.createFog()
    this.changeFog('light_blue')
  }

  
  createFog() {
    const color = this.params.background;  // white
    const near = 30;
    const far = 70;
    this.scene.instance.fog = new Fog(color, near, far);

    const fog_params = {
      color
    }
  }

  changeFog(newColor: string){

    const colors = {
      default: this.params.background,
      grey1: 0xa5a5a5,
      grey2: 0x727272,
      grey3: 0x525252,
      light_blue: 0x95aebf, 
      black: 0x080808,
      green: 0x1ECA9A
    }

    this.scene.instance.fog.color.setHex(colors[newColor])
    this.scene.instance.background.setHex(colors[newColor])
  }
}
