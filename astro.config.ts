import { defineConfig } from 'astro/config';
import glsl from 'vite-plugin-glsl';
import compressor from "astro-compressor";

// https://astro.build/config
import vue from "@astrojs/vue";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import prefetch from "@astrojs/prefetch";

// https://astro.build/config
// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
import compress from "astro-compress";

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), sitemap(), prefetch(), mdx(), compress(), compressor()],
  vite: {
    plugins: [glsl()]
  }
});