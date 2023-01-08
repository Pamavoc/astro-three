import { Clock } from 'three';
import { ObjectType } from '@/interfaces/ObjectType';
import Raycaster from '@/classes/webgl/base/Raycaster';
import Camera from '@/classes/webgl/base/Camera';
import CameraOrtho from '@/classes/webgl/base/CameraOrtho';
import Renderer from '@/classes/webgl/base/Renderer';
import Loader from '@/classes/webgl/utils/Loader';
import BaseScene from '@/classes/webgl/scene/Scene';
import Materials from '@/classes/webgl/base/Materials';
import Stats from '@/classes/webgl/utils/Stats';
import useAnimations from '@/composables/useAnimations';
import Experience from '@/classes/Experience';


export default class WebGL {
  cameraManager: Camera
  scene: BaseScene;
  camera: Camera;

  renderer: Renderer;
  clock: Clock;
  loader: Loader;
  animations: any
  materials: Materials

  width: number;
  height: number;
  debug: boolean;
  params: ObjectType;
  stats: Stats

  raycast: Raycaster;
  emitter: any;

  objectNames: Array<String>

  experience: Experience
  audio_started: boolean;


  constructor({ emitter, experience }: any) {

    // EXPERIENCE
    this.experience = experience
    
    // ARGS
    this.emitter = emitter;

    // VARS
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // BASE THREE
    this.clock = new Clock();
    this.loader = new Loader({ webgl: this });

    this.camera = new Camera(35, this.width / this.height, 0.5, 1000); // perspective camera
    // this.camera = new CameraOrtho(this.width / - 2, this.width / 2, this.height / 2, this.height / - 2, 0.5, 1000); // ortho camera
    this.renderer = new Renderer(this.width, this.height);

      // MATERIALS
    this.materials = new Materials({ webgl: this })

    this.scene = new BaseScene(this);

    // MANAGERS
    this.animations = useAnimations()

    // RAYCASTER
    this.raycast = new Raycaster(
      this.scene,
      this.camera.instance,
      this.renderer,
      this.emitter,
    );


    this.setEvents();


    if (/debug/.test(window.location.href)) {
      this.debug = true
      this.camera.tweak()
      this.scene.postProcess.tweak()
      this.materials.tweak()
      this.stats = new Stats(this)
    }

  }


  setEvents = () => {
    this.addEvents();
    //this.experienceEvents();
    this.onResize();
  };




  addEvents = () => {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.raycast.onMouseMove);
    window.addEventListener('mousedown', this.onDrag);
    window.addEventListener('mouseup', this.onUndrag);
    window.addEventListener('click', this.raycast.onClick);

  };

  removeEvents = () => {
    window.removeEventListener('mousemove', this.raycast.onMouseMove);
    window.removeEventListener('click', this.raycast.onClick);
  };

  onDrag = () => {
    this.renderer.canvas.classList.add('dragging')
  }
  onUndrag = () => {
    this.renderer.canvas.classList.remove('dragging')
  }
  onResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera.instance.aspect = this.width / this.height;
    this.camera.instance.updateProjectionMatrix();

    if(this.scene.postProcess) {
      this.scene.postProcess.resize(this.width, this.height)
    }
    
    this.renderer.instance.setSize(this.width, this.height);
    this.renderer.instance.setPixelRatio(
      Math.min(window.devicePixelRatio, 1, 2)
    );
  };

  update() {
    // Raycaster
    if(this.experience.started === true) {
        this.raycast.raycastHover()
    }

    if(this.debug) {
      this.stats.update()
    }

    // Scene
    this.scene.update();
  }
}
