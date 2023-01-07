<template>
    <div class="canvas-container">
        <canvas></canvas>
    </div>
</template>
<script setup lang="ts">

import { PerspectiveCamera, Scene, Mesh, WebGLRenderer, BoxGeometry, MeshNormalMaterial } from "three";
import { onMounted } from 'vue'


onMounted(()=> {
    const camera = new PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
camera.position.z = 1;

const scene = new Scene();

const geometry = new BoxGeometry( 0.2, 0.2, 0.2 );
const material = new MeshNormalMaterial();

const mesh = new Mesh( geometry, material );
scene.add( mesh );

const renderer = new WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animation );

 
document.querySelector('.canvas-container').appendChild(renderer.domElement)

// animation

// animation

function animation( time ) {

	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;

	renderer.render( scene, camera );

}
})


</script>
<style lang="">
    
</style>