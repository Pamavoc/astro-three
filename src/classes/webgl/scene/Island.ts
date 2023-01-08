import { MeshBasicMaterial } from 'three';


export default class Island {

    scene: any
    webgl: any
    params: any
    lights: any
    models_path: any
    models: any


    constructor(args) {

        this.scene = args.scene;
        this.webgl = args.webgl;

        this.models_path = [
            'island.glb'
        ];

        //this.load()
        // this.loadIndividual('island-bake.glb')
    }

    async load() {

        const promises = this.models_path.map(path => this.webgl.loader.load(path));
        const models = await Promise.all(promises);
        this.models = models;


        models.forEach(model => {
            // model.children.find(child => child.name === 'Sphere').material = this.webgl.materials.islandBaked;
           
            this.scene.instance.add(model);

        });

        this.webgl.emitter.emit('loaded')
    }



    loadIndividual = async (new_map) => {
        this.webgl.loader.load(`/${new_map}`).then((result) => {
            console.log("new map added")

            this.webgl.loader.loadTexture('bake-nb.jpg').then((texture) => {
                texture.flipY = false;


                result.children.forEach(child => {

                    if(child.name == 'ray-bouée') {
                        child.material = new MeshBasicMaterial({
                                transparent: true,
                                 opacity:0,
                                 map: texture,
                        });

                        child.material.needsUpdate = true;

                        console.log(child)
                        
                    } else if(child.name == 'afp-front') {
                        child.material = new MeshBasicMaterial({
                            transparent: true,
                             opacity:0,
                             map: texture,
                        });

                        child.material.needsUpdate = true;
                    }
                    
                    else {
                        child.material = new MeshBasicMaterial({
                            map: texture,
                        });
    
                    }   
                
                });

                // result.children[0].material = new THREE.MeshStandardMaterial({
                //         map: texture
                // });

                this.scene.instance.add(result)
                this.webgl.emitter.emit('loaded')
            })


        })

    }


    remove = async () => {
        const old_map = this.scene.instance.children.find(child => child.name === "Scene")
        this.scene.instance.remove(old_map)
        console.log('old map removed')
        return 'old map removed'

    }


}
