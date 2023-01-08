import { defineConfig } from 'astro/config';
import glsl from 'vite-plugin-glsl';

// https://astro.build/config
import vue from "@astrojs/vue";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import prefetch from "@astrojs/prefetch";

// https://astro.build/config
import partytown from "@astrojs/partytown";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), sitemap(), prefetch(), partytown({ config: { debug: false, forward: ["dataLayer.push"]  }}), mdx()],
  vite: {
    plugins: [
      glsl()
    ]
  }
});