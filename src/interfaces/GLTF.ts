import * as THREE from 'three/build/three.module'

export interface GLTF {
    animations: THREE.AnimationClip[];
    scene: THREE.Group;
    scenes: THREE.Group[];
    cameras: THREE.Camera[];
    asset: {
        copyright?: string | undefined;
        generator?: string | undefined;
        version?: string | undefined;
        minVersion?: string | undefined;
        extensions?: any;
        extras?: any;
    };
    userData: any;
}
