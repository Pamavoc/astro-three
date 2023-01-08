// toute la logique et gestion des evenements pour le jeu
import WebGL from "@/classes/webgl/WebGL";

export default class Experience {
   
    webGL: WebGL
    emitter: any
    webgl: any
    started: boolean

    constructor({ emitter }) {
        

        this.webgl = new WebGL({ emitter, experience: this })    

        this.started = false
        this.emitter = emitter
        this.events()
       
    }

    events() {

        this.emitter.on('WebGLrouteEvent', (e) => {
            console.log(e)

            if(e.action === "hide") {

                // faut check la route from, puis check les objets

            } else {

            }
            
        })
      

        this.emitter.on('WebGLcanvasEvent', (e: String) => {

            console.log(e)
            if(e === 'hide_grid') {
                this.webgl.scene.back.hideGrid()
            }

            if(e === 'show_grid') {
                this.webgl.scene.back.showGrid()
            }

    
        })
    
        this.emitter.on('loaded', () => {
        
            this.intro()
           // this.webgl.renderer.canvas.classList.add('active')
            this.webgl.raycast.setObjectsScene('home')
            const clickEvent = new Event('click')
            window.dispatchEvent(clickEvent)

        })

    }

    intro() {
        this.webgl.animations.createStartAnim(this.webgl.camera)
        const { project, sheet } = this.webgl.animations.play('Introduction')
        project.ready.then(() => sheet.sequence.play({ iterationCount: 1 }))
    }
}
