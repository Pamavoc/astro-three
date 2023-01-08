<template>
    <div class="cursor" ref="cursor"></div>
</template>
<script setup lang="ts">
import { gsap } from "gsap"
import { onMounted } from "vue"

onMounted(()=> {

        const cursor = document.querySelector(".cursor");
        const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const mouse = { x: pos.x, y: pos.y };
        const speed = 0.2;

        const xSet = gsap.quickSetter(cursor, "x", "px");
        const ySet = gsap.quickSetter(cursor, "y", "px");

        document.addEventListener("mousemove", e => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        document.addEventListener("mouseenter", e => {
            gsap.to(cursor, { duration: 0.5, scale: 1 });
        });

        document.addEventListener("mouseleave", e => {
            gsap.to(cursor, { duration: 0.5, scale: 0 });
        });

        gsap.ticker.add(() => {

            // adjust speed for higher refresh monitors
            const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

            pos.x += (mouse.x - pos.x - 25) * dt;
            pos.y += (mouse.y - pos.y - 25) * dt;
            xSet(pos.x);
            ySet(pos.y);
        });
})


</script>
<style lang="scss" scoped>
.cursor {
    width: 50px;
    height: 50px;
    position: fixed;
    top: 0;
     left: 0;
     background: blue;
    mix-blend-mode: difference;
    border-radius: 50%;
    pointer-events: none;
}
</style>