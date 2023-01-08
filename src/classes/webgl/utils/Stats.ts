export default class Stats {
    webgl: any
    rendererInfos: any
    webglInfos: any
    statsEl:any

	constructor(webgl) {
	
        this.webgl = webgl
        this.webgl.renderer.instance.info;

		this.rendererInfos = this.webgl.renderer.instance.info;
		this.rendererInfos.autoReset = false;


        this.stats()
	}


	async stats() {
		const stats = (await import('stats.js')).default;
		this.statsEl = new stats();
		this.statsEl.showPanel(0);
        document.body.appendChild(this.statsEl.dom);
		this.webglInfos = document.createElement('div');
		this.webglInfos.classList.add('webgl-infos', 'txt_uppercase');
        document.querySelector('.ui').appendChild(this.webglInfos);
		
	}

	update() {
       
        if (this.webglInfos) {
          this.statsEl.update();
          this.webglInfos.textContent = `
            Calls : ${this.rendererInfos.render.calls}, 
            Triangles : ${this.rendererInfos.render.triangles}, 
            Geometries : ${this.rendererInfos.memory.geometries}, 
            Textures : ${this.rendererInfos.memory.textures},
            Shaders Programs : ${this.rendererInfos.programs?.length}`;
            this.rendererInfos.reset();
        }
		
	}
}