export interface ISource {
    name: string;
    type: 'gltfModel' | 'texture' | 'basis'; 
    path: string;
}