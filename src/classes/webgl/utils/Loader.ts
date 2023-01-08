import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import {  TextureLoader, AnimationMixer} from 'three';


export default class Loader {
  loader: GLTFLoader
  textureLoader: TextureLoader
  modelsAnimations: Array<any>
  webgl: any

  constructor(args: any) {
    this.modelsAnimations = []

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    this.loader = new GLTFLoader();
    this.loader.setDRACOLoader(dracoLoader);

    this.textureLoader = new TextureLoader()

    this.webgl = args.webgl

  }

  load(url) {
    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        gltf => {
          gltf.scene.scale.set(0.25, 0.25, 0.25); 
          gltf.scene.traverse(child => {

            console.log(child.name)

            if (child.isMesh) {
              child.geometry.computeVertexNormals();

              // bouée
              if (/ray/ig.test(child.name)) { 
                this.webgl.raycast.objectNames.push(child.name)


              } else {
                child.material = this.webgl.materials.defaultMaterial
              }


            }



          });



          resolve(gltf.scene);

          if(gltf.animations.length > 1) {
            const animation = {
              name: url,
              mixer: new AnimationMixer( gltf.scene ),
              actions: gltf.animations
            }

            this.modelsAnimations.push(animation)
          }

          gltf.animations; // Array<THREE.AnimationClip>
          gltf.scene; // THREE.Group
          gltf.scenes; // Array<THREE.Group>
          gltf.cameras; // Array<THREE.Camera>
          gltf.asset; // Object
        },
        // called while loading is progressing
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        // called when loading has errors
        function (error) {
          console.log('An error happened');
          reject(error);
        }
      );
    });
  }



  loadTexture(url) {
    return new Promise((resolve, reject) => {
      this.textureLoader.load(
        url,
        texture => {

          // console.log(texture);
          resolve(texture);
        },

        // called while loading is progressing
        function (xhr) {
          // console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        // called when loading has errors
        function (error) {
          console.error('An error happened');
          reject(error);
        }
      );
    });
  }
}
