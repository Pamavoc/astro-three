import { Scene, Clock, Color, } from 'three';
import { ObjectType } from '@/interfaces/ObjectType';
import Controls from '@/classes/webgl/base/Controls';
import PostProcess from '@/classes/webgl/base/PostProcessing';
import Lights from '@/classes/webgl/scene/Lights';
import Atmosphere from '@/classes/webgl/scene/Atmosphere';
import Island from '@/classes/webgl/scene/Island';
import Sky from '@/classes/webgl/scene/Sky';
import Background from '@/classes/webgl/scene/Background';
import HeroImage from '@/classes/webgl/scene/HeroImage';
import Projects from '@/classes/webgl/scene/Projects';
import useScroll from '@/composables/useScroll';

export default class BaseScene extends Scene{

  instance: Scene;
  webgl: any;
  params: ObjectType;
  postProcess: PostProcess;
  clock: Clock;
  back: Background
  image: HeroImage
  renderer: any;
  composer: any;

  camera: any;
  controls: any;

  lights: Lights;
  atmosphere: Atmosphere;
  island: Island
  sky: Sky
  projects: Projects
  emitter: any
 

  constructor(webgl) {

    super()

    this.params = {
      background: 0x080808,
      ambient_light: 0x020202,
      directional_light: 0xffffff,
      mat_color: 0xffffff,
    }

    this.renderer = webgl.renderer.instance;
    this.camera = webgl.camera.instance;
    this.webgl = webgl;

    this.clock = new Clock();
    this.instance = new Scene();
    this.instance.background = new Color(this.params.background)

    this.lights = new Lights(this)
    // this.atmosphere = new Atomosphere(this)
    this.island = new Island({ webgl: webgl, scene: this})
    this.back = new Background({ webgl: webgl, scene: this})
    // this.sky = new Sky({ webgl: webgl, scene: this})
    this.projects = new Projects({ webgl: webgl, scene: this})
    this.postProcess = new PostProcess({ scene: this })
    this.controls = new Controls(this.camera, this.renderer);

    this.emitter = webgl.emitter

    const { lenis } = useScroll()

    if(window.location.pathname === '/' && !this.image) {
    
     // this.image = new HeroImage({ webgl: webgl, scene: this})
    }



    lenis.on('scroll', ({ scroll, limit }) => {

      if(window.location.pathname === '/' && this.image) {
       // this.image.mesh.position.y = scroll * 0.005;
      }
		 
      // this.back.gridHelper.position.y = scroll * 0.008;

		})
	
  }


  preRender() {

    const elapsedTime = this.clock.getElapsedTime();

    if(this.webgl.loader.modelsAnimations.length > 1) {

      this.webgl.loader.modelsAnimations.forEach(animation => {
        animation.mixer.update( elapsedTime );
      });
    }
    
    // console.log(this.camera.position);
    if (this.webgl.raycast.isObjectClicked === false) {
      this.controls.update(elapsedTime);
    }

    this.webgl.materials.update(elapsedTime);
  }

  render() {
    this.renderer.render(this.instance, this.camera);
  }

  postRenderer() {
    this.postProcess.render();
  }

  update() {
    this.preRender();
    this.render();
    this.postRenderer();
  }
}