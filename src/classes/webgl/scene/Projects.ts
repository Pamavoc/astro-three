import{ MeshBasicMaterial, Color, Mesh, PlaneGeometry} from 'three';
import { gsap } from 'gsap';

export default class Projects {
    images: any
    imagesStore: any
    webgl: any
    scene: any

     constructor(args) {
        this.webgl = args.webgl;
        this.scene = args.scene;
        // this.images = document.querySelectorAll(".webgl-el.img");

        this.createsRandomImages()

    }

    createsRandomImages() {

        
        const material = new MeshBasicMaterial({ 
            color: new Color(0x202020), 
            transparent: true,
            depthTest: false,
            opacity: 0,
        })

        this.webgl.emitter.on('appearProjects', () => {
            gsap.to(material, {opacity: 1})
        })

        this.webgl.emitter.on('disappearProjects', () => {
            gsap.to(material, {opacity: 0})
        })

        for (let i = 0; i < 10; i++) {
         
                const geometry = new PlaneGeometry(3, 3.5)
                const plane = new Mesh(geometry, material)
                const scale = Math.random();
                plane.scale.set(scale, scale, scale)
                plane.position.x = Math.random() * 10 - 5;
                plane.position.y = Math.random() * 8 - 5;
                plane.position.z = 2
                this.scene.instance.add(plane)

            
        }

    }

    setImagesPositions() {
        this.imagesStore.forEach((img, i) => {
          const bounds = img.el.getBoundingClientRect();
          // if (i == 0) console.log(left - this.sizes.width / 2 + width / 2);
          img.mesh.position.x =
            bounds.left - this.webgl.width / 2 + bounds.width / 2;
          img.mesh.position.y =
            -bounds.top + this.webgl.height / 2 - bounds.height / 2;
    
          img.bounds = bounds;
        });
      }

    setImages() {
        this.imagesStore = [...this.images].map((el, i) => {
          const bounds = el.getBoundingClientRect();
    
          const geometry = new PlaneGeometry(1, 1);
          const material = new MeshBasicMaterial();
    
          const mesh = new Mesh(geometry, material);
          mesh.scale.set(bounds.width, bounds.height, 1);
          mesh.position.x = bounds.left - this.webgl.width / 2 + bounds.width / 2;
          mesh.position.y = -bounds.top + this.webgl.height / 2 - bounds.height / 2;
    
          this.scene.instance.add(mesh);
    
          return {
            el,
            mesh,
            hadRayOn: false,
            bounds,
          };
        });
      }

}