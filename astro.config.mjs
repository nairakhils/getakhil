import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
//import vercel from "@astrojs/vercel";  // Use Vercel adapter
import robotsTxt from "astro-robots-txt";
import UnoCSS from "@unocss/astro";
import icon from "astro-icon";

import solidJs from "@astrojs/solid-js";
import { remarkReadingTime } from "/src/lib/ remark-reading-time.mjs";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://getakhil.vercel.app",  // Update the site URL for Vercel
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
  output: "server",  // Optional; use "static" if needed
  //adapter: vercel(),  // Use the Vercel adapter
  vite: {
    assetsInclude: "**/*.riv",
  },
});