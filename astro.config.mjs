import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import {fileURLToPath} from 'node:url';
export default defineConfig({
  srcDir: './site', publicDir: './.stage-assets', outDir: './dist',
  output: 'static', trailingSlash: 'always',
  site: 'https://mitchjmiller.com', integrations: [react()],
  vite: {cacheDir: './.vite-cache', plugins: [tailwindcss()], resolve: {alias: {'@': fileURLToPath(new URL('./baseline/src', import.meta.url)), '@assets': fileURLToPath(new URL('./baseline/src/assets', import.meta.url))}}},
});
