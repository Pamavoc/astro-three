import { SMAAEffect, NoiseEffect, BlendFunction, EffectComposer, EffectPass, RenderPass, OutlineEffect } from "postprocessing";
import useDebug from "@/composables/useDebug";

export default class PostProcess {
    composer: EffectComposer
    scene: any
    renderer: any
    webgl: any
    camera: any
    params: any
    effect: any
    outline: OutlineEffect

    constructor({ scene }) {

        this.scene = scene;
        this.renderer = scene.renderer;
        this.webgl = scene.webgl;
        this.camera = scene.camera;
        this.composer = new EffectComposer(this.renderer)    
        
        this.params = {
            blendFunction: BlendFunction.ADD,
            blendFunctionNoise: BlendFunction.OVERLAY, // substract // MULTIPLY // Overlay
			mipmapBlur: true,
			luminanceThreshold: 0.5,
			luminanceSmoothing: 0.1,
			intensity: 2.62
        },
        
        this.init()
     
    }

    init() {
          
        this.composer.addPass(new RenderPass(this.scene.instance, this.camera));

        // this.outline = new OutlineEffect(this.scene.instance, this.camera, {
        //     blendFunction: BlendFunction.SCREEN,
        //     edgeStrength: 10.5,
		// 	pulseSpeed: 0.0,
		// 	visibleEdgeColor: 0xFFFFFF,
		// 	hiddenEdgeColor:0xFFFFFF,
		// 	height: 720,
		// 	blur: false,
		// 	xRay: true
        // })

        // this.outline.selection.set()

        const noise = new NoiseEffect({ blendFunction: this.params.blendFunctionNoise })
        const smaa = new SMAAEffect()

        this.composer.addPass(new EffectPass(this.camera, smaa, noise));
        // this.composer.addPass(new EffectPass(this.camera, this.outline));
    }

    tweak() {
		const debug = useDebug()

		const default_page = debug.panel.addFolder({
			title: 'bloom',
			expanded: false,
		});

		default_page.addInput(this.params, 'intensity', { min: 0, max: 10 }).on('change', (ev) => {
            this.effect.intensity = ev.value;
        });

        default_page.addInput(this.params, 'luminanceThreshold', { min: 0, max: 10 }).on('change', (ev) => {
            this.effect.luminanceThreshold = ev.value;
        });

        default_page.addInput(this.params, 'luminanceSmoothing', { min: 0, max: 10 }).on('change', (ev) => {
            this.effect.luminanceSmoothing = ev.value;
        });

        default_page.addInput(this.params, 'mipmapBlur').on('change', (ev) => {
            this.effect.mipmapBlur = ev.value;
        });	
	}


    render() {
        this.composer.render();
    }

    resize(width, height) {
        this.composer.setSize(width, height);
    }
}