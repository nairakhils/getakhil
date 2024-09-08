import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import UnoCSS from "@unocss/astro";
import icon from "astro-icon";

import solidJs from "@astrojs/solid-js";
import { remarkReadingTime } from "/src/lib/ remark-reading-time.mjs";

import svelte from "@astrojs/svelte";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  // Update the site URL for Vercel
  site: "https://getakhil.vercel.app",

  integrations: [
    sitemap(),
    robotsTxt({
      sitemap: [
      ],
    }),
    solidJs(),
    UnoCSS({ injectReset: true }),
    icon(),
    svelte(),
  ],

  markdown: {
    remarkPlugins: [remarkReadingTime],
  },

  // Optional; use "static" if needed
  output: "server",

  vite: {
    assetsInclude: "**/*.riv",
  },

  adapter: vercel({
    imagesConfig: {
      sizes: [320, 640, 1280],
    },
  }),
});