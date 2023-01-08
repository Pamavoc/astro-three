
import { AnimationClip } from 'three'
import gsap from 'gsap'
import mitt from 'mitt'
import { ObjectType } from '@/interfaces/ObjectType'


export default class Animations {

  vector3D: ObjectType
  cameraParams: ObjectType
  introParams: ObjectType
  targetPos: ObjectType

  canvas: HTMLCanvasElement
  ui: HTMLElement 
  uiParams: any
  btnParams: any
  anims: Array<any>
  cameraPos: ObjectType
  cameraRot: ObjectType
  tlObject: GSAPTimeline
  emitter:any
  cameraOrientation: any

  constructor() {

    this.anims = []
    this.canvas = document.querySelector(".container-canvas canvas")
  
    this.emitter = mitt()
  }

 

  startExperienceAnim() {

    const tl = gsap.timeline({
      onComplete: () => { 
       
      }
    })
    
    tl.to(['.button-container'], { opacity: 0, y: 60, duration: 0.4, ease: "power4.inOut"}, 0)
    tl.to('.container-canvas', { opacity: 1, ease: "power4.inOut"}, 4)
    
  }

 

  playModelAnimation(animation, action_name) {
    const clip = AnimationClip.findByName( animation.actions, action_name );
    const action = animation.mixer.clipAction( clip );
    action.play();
  }
}
