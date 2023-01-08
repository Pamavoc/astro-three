<template>
    <div class="container-canvas">
        <canvas id="canvas"></canvas>
    </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Experience from "@/classes/Experience";
import useRAF from "@/composables/useRAF";
import mitt from 'mitt'

const emitter = mitt()
onMounted(async () => {
    const raf = useRAF();

    const experience = new Experience({ emitter: emitter });
       raf.subscribe('WebGL', () => {
         experience.webgl.update();
      });
 
    //document.querySelector('.canvas-container').appendChild(renderer.domElement)
})

onUnmounted(()=> {
    const raf = useRAF();
    raf.unsubscribe('WebGL');
})

</script>
<style lang="">
    
</style>