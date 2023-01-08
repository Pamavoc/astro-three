<template>
    <div class="container-canvas">
        <canvas id="canvas"></canvas>
    </div>
</template>
<script setup lang="ts" type="text/partytown">
import { onMounted, onUnmounted } from 'vue'
// import Experience from "@/classes/Experience";
import useRAF from "@/composables/useRAF";
import mitt from 'mitt'

// const emitter = mitt()
onMounted(async () => {
    const module = await import('@/classes/Experience').then((m) => 
    
       {
        const emitter = mitt()
        const raf = useRAF();
        const experience = new m.default({ emitter: emitter });
        raf.subscribe('WebGL', () => {
            experience.webgl.update();
        });
       }
    );
    
  

    // const experience = new Experience({ emitter: emitter });
    //    raf.subscribe('WebGL', () => {
    //      experience.webgl.update();
    //   });
 
    //document.querySelector('.canvas-container').appendChild(renderer.domElement)
})

onUnmounted(async ()=> {
    // const raf = useRAF();
    // raf.unsubscribe('WebGL');
})

</script>
<style lang="">
    
</style>