import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
export default defineConfig({
  srcDir: './site', publicDir: './.stage-assets', outDir: './dist',
  output: 'static', trailingSlash: 'always',
  site: 'https://mitchjmiller.com', integrations: [react()],
});
