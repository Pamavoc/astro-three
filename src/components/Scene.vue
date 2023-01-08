<template>
    <div class="container-canvas">
        <canvas id="canvas"></canvas>
    </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import useRAF from "@/composables/useRAF";
import mitt from 'mitt'
onMounted(async () => {

    await import('@/classes/Experience').then((m) => 
       {
        const emitter = mitt()
        const raf = useRAF();
        const experience = new m.default({ emitter: emitter });
        raf.subscribe('WebGL', () => {
            experience.webgl.update();
        });
       }
    );
})

onUnmounted(async ()=> {
    const raf = useRAF();
    raf.unsubscribe('WebGL');
})

</script>
<style lang="">
    
</style>