// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Static output: `npm run build` emits plain HTML/CSS/JS into ./dist,
// which the nginx container serves. No Node runtime in production.
export default defineConfig({
  site: 'https://zeegly.tech',
  output: 'static',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
