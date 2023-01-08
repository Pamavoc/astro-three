import { MeshStandardMaterial, RawShaderMaterial, Color, DoubleSide} from 'three'

import useDebug from "@/composables/useDebug";

import skyFrag from '@/assets/glsl/sky/sky.frag';
import skyVert from '@/assets/glsl/sky/sky.vert';


export default class Materials {
  defaultMaterial: MeshStandardMaterial;
  skyMaterial: RawShaderMaterial;
  islandBaked: MeshStandardMaterial;

  texturesBake: Array<String>;
  webgl: any;

  constructor(args) {
    this.webgl = args.webgl;

    this.texturesBake = ["bake.jpg"];

    this.create();
    this.changeDefault("black");
  }

  async createBakedMaterials() {
    const promises = this.texturesBake.map((path) =>
      this.webgl.loader.loadTexture(path)
    );
    const textures = await Promise.all(promises);
    textures.forEach((texture) => {
      texture.flipY = false;
    });

    console.log(textures);

    this.islandBaked = new MeshStandardMaterial({
      map: textures[0],
    });
  }

  create() {
    this.skyMaterial = new RawShaderMaterial({
      uniforms: {
        uBottomColor: { value: new Color(0xf9f9f5) },
        uTopColor: { value: new Color(0xd3d4f6) },
      },
      side: DoubleSide,
      fragmentShader: skyFrag,
      vertexShader: skyVert,
    });

    this.defaultMaterial = new MeshStandardMaterial({
      color: new Color(0x182b989a),
      emissive: new Color(0x0909090),
    });
  }

  tweak() {
    const debug = useDebug();

    const sky_page = debug.panel.addFolder({
      title: "skyMaterial",
      expanded: true,
    });

    const sky_params = {
      uBottomColor: this.skyMaterial.uniforms.uBottomColor.value,
      uTopColor: this.skyMaterial.uniforms.uTopColor.value,
    };

    const color_options = {
      view: "color",
      color: {
        alpha: true,
        type: "float",
      },
    };

    sky_page
      .addInput(sky_params, "uBottomColor", color_options)
      .on("change", () => {
        this.skyMaterial.uniforms.uBottomColor.value = sky_params.uBottomColor;
      });
    sky_page
      .addInput(sky_params, "uTopColor", color_options)
      .on("change", () => {
        this.skyMaterial.uniforms.uTopColor.value = sky_params.uTopColor;
      });
  }

  update(time: number) {
    // this.waterMaterial.uniforms.uTime.value = time;
  }

  changeDefault(newColor: string) {
    newColor ??= "default";

    const colors = {
      default: {
        color: 0x69665c,
        emissive: 0x8c826b,
      },
      black: {
        color: 0x080808,
        emissive: 0x1e1e1e,
      },
      yellow: {
        color: 0xa2a2a2,
        emissive: 0x997218,
      },
      green: {
        color: 0xb5b5b5,
        emissive: 0x307540,
      },
      brown: {
        color: 0x756b60,
        emissive: 0x4f3822,
      },
    };

    this.defaultMaterial.color.setHex(colors[newColor].color);
    this.defaultMaterial.emissive.setHex(colors[newColor].emissive);
  }
}
