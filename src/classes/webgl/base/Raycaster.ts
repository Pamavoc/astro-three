import { PerspectiveCamera, Scene, WebGLRenderer, Raycaster, Vector2, Vector3, Object3D, Mesh } from "three"
import useAnimations from '@/composables/useAnimations'

export default class Raycast extends Raycaster {

    scene: Scene
    camera: PerspectiveCamera
    renderer: WebGLRenderer
    raycaster: Raycaster
    mouse: Vector2
    objects: Array<any>
    currentIntersect: any
    emitter: any
    animations: any
    isObjectClicked: boolean
    objectNames: Array<String>
    outline: any
    selections: Array<any>
    bouee: Object3D | Mesh


    constructor(scene, camera: PerspectiveCamera, renderer, emitter: any) {

        super()
        this.scene = scene
        this.renderer = renderer
        this.camera = camera
        this.emitter = emitter
        this.animations = useAnimations()
        this.isObjectClicked = false
        //.selection.set(this.raycast.objects);

        this.bouee = null

        this.outline = this.scene.postProcess.outline

        this.mouse = new Vector2()
        this.raycaster = new Raycaster()

        this.currentIntersect = null
        //"const rayOrigin = new THREE.Vector3(- 3, 0, 0)
        // const rayDirection = new THREE.Vector3(10, 0, 0)
        // rayDirection.normalize()

        this.objectNames = []
        this.objects = []

    


    }



    onMouseMove = (event) => {
        this.mouse.x = event.clientX / this.renderer.instance.domElement.clientWidth * 2 - 1
        this.mouse.y = - (event.clientY / this.renderer.instance.domElement.clientHeight) * 2 + 1
    }

    onClick = () => {
        this.raycaster.setFromCamera(this.mouse, this.camera)
        const intersects = this.raycaster.intersectObjects(this.objects, true)

        if (this.currentIntersect !== null && this.isObjectClicked === false) {
        

           if(this.currentIntersect.object) {
                
        
                this.isObjectClicked = true
                this.emitter.emit('object-clicked', true);
                // on désactive le raycaster au click
                this.isObjectClicked = true;
                this.outline.selection.set([this.currentIntersect.object]);

                //console.log(this.currentIntersect.object.name)
                switch (this.currentIntersect.object.name) {


                case "ray-billet":
                    this.hit(1, this.currentIntersect)
                    break

                case "ray-écran":
                    this.hit(2, this.currentIntersect)
                    break

                case "ray-téléscope":
                    this.hit(3, this.currentIntersect)
                    break

                case "ray-arrosoir":
                    this.hit(5, this.currentIntersect)
                    break

                case "ray-manette":
                    this.hit(6, this.currentIntersect)
                    break

                case "ray-poids":
                    this.hit(7, this.currentIntersect)
                    break

                case "ray-echec":
                    this.hit(8, this.currentIntersect)
                    break
    
                
                case "ray-rouleau":
                    this.hit(9, this.currentIntersect)
                    break


                case "ray-chevalet":
                    this.hit(10, this.currentIntersect)
                    break

                case "ray-casque":
                    this.hit(11, this.currentIntersect)
                    break
        
                case "ray-bouée":
                    
                    this.emitter.emit('ending')
                    break
                }

              


           }

        }
    }

    hit(id, currentIntersect) {
        // let coords = this.toScreenPosition(currentIntersect.object)
        this.emitter.emit('found-object', { id: id })

        this.animations.createZoomToObject(this.camera, currentIntersect)

        // il faut desactiver dans le raycaster l'objet en question : good
        this.deactiveObject(currentIntersect.object)

    }

    outro() {
        this.objects = [this.bouee]
        this.raycaster.setFromCamera(this.mouse, this.camera)
        const intersects = this.raycaster.intersectObjects(this.objects, true)
    }

    deactiveObject(object) {
       const objectLeft = this.objects.filter(el => el.name !== object.name)
    
       this.objects = objectLeft
       this.raycaster.setFromCamera(this.mouse, this.camera)
       const intersects = this.raycaster.intersectObjects(this.objects, true)
    }

    setObjectsScene = (scene: string) => {
        console.log(this.objectNames)
        if(scene === "home") {

            // on recup tous les objets
            for (let i = 0; i <  this.objectNames.length; i++) {

                const el = this.scene.instance.getObjectByProperty('name', this.objectNames[i]);

                if(this.objectNames[i] === "ray-bouée") {

                    this.bouee = el
                } else {    
                    this.objects.push(el)
                }
            }

        }
    }


    toScreenPosition(obj)
        {
            const vector = new Vector3();
            const canvas = this.renderer.domElement; // `renderer` is a THREE.WebGLRenderer

            obj.updateMatrixWorld();  // `obj´ is a THREE.Object3D
            vector.setFromMatrixPosition(obj.matrixWorld);

            vector.project(this.camera); // `camera` is a THREE.PerspectiveCamera

            const x = Math.round((0.5 + vector.x / 2) * (canvas.width / window.devicePixelRatio));
            const y = Math.round((0.5 - vector.y / 2) * (canvas.height / window.devicePixelRatio));


            return { x, y }

    };

    raycastHover = () => {
        this.raycaster.setFromCamera(this.mouse, this.camera)
        const intersects = this.raycaster.intersectObjects(this.objects, true)
      

        if (intersects.length && this.isObjectClicked === false) {
            if (!this.currentIntersect) {
                //console.log('mouse enter')
                this.renderer.canvas.classList.remove('dragging')
                this.renderer.canvas.classList.add('pointer')
            }

            this.currentIntersect = intersects[0]
            this.outline.selection.set([this.currentIntersect.object]);
        }
        else if(intersects.length == 0 && this.isObjectClicked === false) {
            if (this.currentIntersect) {
                //console.log('mouse leave')
                this.renderer.canvas.classList.add('dragging')
                this.renderer.canvas.classList.remove('pointer')
            }
            this.outline.selection.set([]);
            this.currentIntersect = null
        }


    }
}
