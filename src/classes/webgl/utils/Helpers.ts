import { AxesHelper, PointLightHelper, HemisphereLightHelper, SpotLightHelper, DirectionalLightHelper} from 'three';

import useDebug from "@/composables/useDebug";

export default class Materials {
	
	helpers: any
	webgl: any
	scene: any


	constructor(args) {

		this.helpers = []
		this.scene = args.webgl.scene
		this.webgl = args.webgl
		
		this.create()
	}

	create() {
		const axes = new AxesHelper( 5 );
		this.helpers.push(axes)
	}

	createLight(light, type, size) {

		let helper;
		if(type == 'point') {

			helper = new PointLightHelper( light, size);

		} else if(type == 'hemisphere') {

			helper = new HemisphereLightHelper( light, size);

		} else if(type == 'spot') {
		
			helper = new SpotLightHelper(light)

		} else if(type == 'directional') {

			helper = new DirectionalLightHelper( light, size);
		}

		this.scene.instance.add(helper)
	}

	update(time: number) {

	
	}
}